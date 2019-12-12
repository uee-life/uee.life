const axios = require("axios")
const cheerio = require('cheerio')
const jwt = require('jsonwebtoken')

const {manager} = require('./manager')
const {executeSQL} = require('./mariadb')

async function loadCitizen(handle) {
    sql = "select a.id, a.created, b.*, c.name as system, d.name as planet, e.name as home from citizen a left join citizen_sync b on a.handle=b.handle left join systems c on a.home_system = c.id left join locations d on a.home_location = d.id left join pois e on a.home_base = e.id where a.handle=?"
    const rows = await executeSQL(sql, [handle])
    console.log(rows)
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
        info.system = null
        info.planet = null
        info.home = null
        return info
    } catch (error) {
        console.error(error)
        return null
    }
}


async function fetchShips(handle) {
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
        citizen.ships = await fetchShips(handle)
    } else {
        citizen.info = await fetchCitizen(handle)
        citizen.ships = []
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
    citizen = await getCitizen(handle)
    return {
        system: citizen.system,
        planet: citizen.planet,
        home: citizen.home
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
        return true
    } else {
        return false
    }
}

async function startSync(token) {
    const userID = jwt.decode(token.slice(7)).sub
    const user = await manager.getUser({id: userID}).catch((err) => {
        console.error(err)
        return {}
    })
    if(await syncCitizen(user.app_metadata.handle)) {
        return {result: "success"}
    } else {
        return {result: "failed"}
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