const axios = require("axios")
const cheerio = require('cheerio')
const jwt = require('jsonwebtoken')

const {manager} = require('./manager')
const {executeSQL} = require('./mariadb')

async function loadCitizen(handle) {
    sql = "select a.id, a.created, a.verified, b.* from citizen_sync b left join citizen a on a.handle=b.handle where a.handle=?"
    const rows = await executeSQL(sql, [handle])
    if(rows.length > 0) {
        return rows[0]
    } else {
        return null
    }
}

async function loadCitizenLocation(handle) {
    sql = "select a.handle, c.name as system, d.name as location, e.name as base from citizen a left join systems c on a.home_system = c.id left join locations d on a.home_location = d.id left join pois e on a.home_base = e.id where a.handle=?"
    const rows = await executeSQL(sql, [handle])
    if(rows.length > 0) {
        return rows[0]
    } else {
        return null
    }
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
        info.website = $('span:contains("Website")', '#public-profile').next().attr('href')
        return info
    } catch (error) {
        console.error(error)
        return null
    }
}


async function loadShips(handle) {
    return [
        /*{
            id: 1,
            manufacturer: "Anvil",
            make: "Hornet",
            model: "F7a",
            name: "Bulldog",
            size: "Light",
            crew: 8
        },
        {
            id: 2,
            manufacturer: "Aegis",
            make: "Avenger",
            model: "Titan",
            name: "Penguin",
        },
        {
            id: 3,
            manufacturer: "RSI",
            make: "Constellation",
            model: "Phoenix",
            name: "Shark",
        }*/
    ]
}

async function getCitizen(handle) {
    citizen = {}
    citizen.info = await loadCitizen(handle)
    if(citizen.info) {
        citizen.ships = await loadShips(handle)
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

async function getCitizenInfo(handle) {
    citizen = await getCitizen(handle)
    return citizen.info
}

async function getCitizenShips(handle) {
    citizen = await getCitizen(handle)
    return citizen.ships
}

async function getCitizenLocation(handle) {
    location = await getCitizenLocation(handle)
    return location
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

module.exports = {
    getCitizen,
    getCitizenInfo,
    getCitizenShips,
    getCitizenLocation,
    syncCitizen,
    startSync
};