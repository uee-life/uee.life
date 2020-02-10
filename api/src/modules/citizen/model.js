const axios = require("axios")
const cheerio = require('cheerio')
const jwt = require('jsonwebtoken')

const { manager } = require('../manager')
const { executeSQL } = require('../mariadb')

const { getUser } = require('../user/model')

/*
*   GET /citizen/<handle>
*/
async function getCitizen(handle) {
    citizen = {}
    citizen.info = await loadCitizen(handle)
    if(citizen.info) {
        citizen.ships = []
        citizen.home = await loadCitizenLocation(handle)
    } else {
        citizen.info = await fetchCitizen(handle)
        citizen.ships = []
        citizen.home = {
            system: null,
            location: null,
            base: null
        }
    }

    return citizen
};


async function loadCitizen(handle) {
    let data = {}
    let citizen = null

    const sql = "select id, created FROM citizen WHERE handle=?"
    let rows = await executeSQL(sql, [handle])

    if(rows.length > 0) {
        // user found
        data = rows[0]

        sql = "select * from citizen_sync where a.handle=?"
        rows = await executeSQL(sql, [handle])
    
        if(rows.length > 0) {
            citizen = rows[0]
        } else if (data.verified){
            // no sync data for some reason, but is verified. Sync data and try again.
            citizen = await syncCitizen(handle)
        }
    
        citizen.id = data.id
        citizen.created = data.created
        citizen.verified = true
    }

    return citizen
}

async function loadCitizenLocation(handle) {
    let home = {
        system: null,
        location: null,
        base: null
    }
    sql_system = "SELECT b.id, b.name FROM systems b LEFT JOIN citizen a ON a.home_system = b.id WHERE a.handle=?"
    sql_location = "SELECT b.id, b.name FROM locations b LEFT JOIN citizen a ON a.home_location = b.id WHERE a.handle=?"
    sql_base = "SELECT b.id, b.name FROM pois b LEFT JOIN citizen a ON a.home_base = b.id WHERE a.handle=?"
    const rows = await executeSQL(sql_system, [handle])
    if(rows.length > 0) {
        home.system = rows[0]
        const lrows = await executeSQL(sql_location, [handle])
        if(lrows.length > 0) {
            home.location = lrows[0]
            const brows = await executeSQL(sql_base, [handle])
            if(brows.length > 0) {
                home.base = brows[0]
            }
        }
    }
    return home
}

async function fetchCitizen(handle) {
    try {
        const baseURI = 'https://robertsspaceindustries.com'
        const resp = await axios.get(baseURI + '/citizens/' + handle)
        const $ = cheerio.load(resp.data)
        info = {}
        info.handle = handle
        info.record = $('span:contains("UEE Citizen Record")', '#public-profile').next().text()
        info.name = $('div.profile.left-col', '#public-profile').find('div.info').find('p.entry').find('strong.value').html()
        info.bio = $('span:contains("Bio")', '#public-profile').next().text()
        info.enlisted = $("span:contains('Enlisted')", '#public-profile').next().text()
        info.portrait = baseURI + $('div.thumb', '#public-profile').children()[0].attribs.src
        info.org = $('span:contains("Spectrum Identification (SID)")', '#public-profile').next().text()
        info.orgRank = $('span:contains("Organization rank")', '#public-profile').next().text()
        info.website = $('span:contains("Website")', '#public-profile').next().attr('href') || ''
        info.verified = 0
        return info
    } catch (error) {
        console.error(error)
        return null
    }
}

async function getInfo(handle) {
    citizen = await getCitizen(handle)
    return citizen.info
}

async function getShips(handle) {
    citizen = await getCitizen(handle)
    return citizen.ships
}

async function getLocation(handle) {
    citizen = await getCitizen(handle)
    return citizen.home
}

async function saveLocation(handle, loc) {
    console.log("saving location...")
    console.log(loc)
    const sql = "UPDATE citizen SET home_system = ?, home_location = ?, home_base = ? WHERE handle=?"
    const system = loc.system ? loc.system.id : null
    const location = loc.location ? loc.location.id : null
    const base = loc.base ? loc.base.id : null
    const res = executeSQL(sql, [system, location, base, handle])
    console.log(res)
}

async function setLocation(token, handle, location) {
    console.log("setting Location!")
    const user = await getUser(token)

    if(handle == user.citizen.info.handle) {
        await saveLocation(handle, location)
        user.home = location
        return {
            success: true,
            error: "",
            user: user   // user with verified flag set
        }
    } else {
        return {
            success: false,
            error: "Cannot edit another citizen's location!",
            user: user
        }
    }
}

async function syncCitizen(handle) {
    // get citizen data from RSI
    const citizen = await fetchCitizen(handle)
    // update citizen data
    if(citizen) {
        sql = "REPLACE INTO citizen_sync (handle, record, name, bio, enlisted, portrait, org, orgrank, website) VALUES (?,?,?,?,?,?,?,?,?)"
        data = [
            citizen.handle,
            citizen.record,
            citizen.name,
            citizen.bio,
            citizen.enlisted,
            citizen.portrait,
            citizen.org,
            citizen.orgRank,
            citizen.website
        ]
        await executeSQL(sql, data)
        return citizen
    } else {
        return null
    }
}

async function startSync(token) {
    const userID = jwt.decode(token.slice(7)).sub
    const user = await manager.getUser({id: userID}).catch((err) => {
        console.error(err)
        return {}
    })
    if(user.app_metadata.handle_verified) {
        if(citizen = await syncCitizen(user.app_metadata.handle)) {
            return {success: true, citizen: citizen}
        } else {
            return {success: false, error: "Sync failed. Flint probably broke something :("}
        }
    } else {
        return {success: false, error: "Your account is not yet verified! Please verify and try again."}
    }
}

async function purgeCitizen(handle) {
    sql = "DELETE FROM citizen_sync WHERE handle=?"
    await executeSQL(sql, [handle])
}

async function removeCitizen(handle) {
    await executeSQL("DELETE FROM citizen WHERE handle=?", [handle])
}

async function createCitizen(handle) {

    console.log("Creating citizen: " + handle)
    // try to load citizen from DB
    sql = "SELECT * FROM citizen WHERE handle=?"
    const rows = await executeSQL(sql, [handle])

    if(rows.length === 0) {
        // if no record, add new record
        sql = "INSERT INTO citizen (handle) values (?)"
        await executeSQL(sql, [handle])
        if(verified) {
            await syncCitizen(handle)
        } else {
            purgeCitizen(handle)
        }
    }
}

module.exports = {
    getCitizen,
    fetchCitizen,
    getInfo,
    getShips,
    getLocation,
    setLocation,
    createCitizen,
    removeCitizen,
    syncCitizen,
    startSync
};