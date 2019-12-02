const axios = require("axios")
const cheerio = require('cheerio')

const {verifyHandle} = require('./user')
const {pool} = require('./mariadb')

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

async function getCitizen(handle) {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query("SELECT name, bio FROM `Character` where handle=?", [handle]);
  
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
    return rows[0]
}

function getCode(bio) {
    result = bio.match(/\[ueelife\:[A-Za-z0-9\-]+\]/i);
    console.log("found: " + result)
    return result
}

async function verifyCitizen(token, handle) {
    result = await getCitizen(handle).then((citizen) => {
        code = getCode(citizen.info.bio)
        res = await verifyHandle(token, code)
        console.log(res)
        return res
    }).catch(function (err) {
        console.error(err)
    })
    console.log(result)
    return result
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

async function fetchLocation(handle) {
    return {
        system: "Unknown",
        planet: "Unknown",
        city: "Unknown"
    }
}

async function getCitizen(handle) {
    res = {}
    info = await fetchCitizen(handle)

    if(info == null) {
        return {error: "Character not found"}
    }

    res.info = info
    res.ships = await fetchShips(handle)
    res.location = await fetchLocation(handle)

    return res
};

async function getCitizenInfo(handle) {
    //data = db_getCitizen(handle)
    return await fetchCitizen(handle)
}

async function getCitizenShips(handle) {
    return await fetchShips(handle)
}

async function getCitizenLocation(handle) {
    return await fetchLocation(handle)
}

module.exports = {
    getCitizen,
    getCitizenInfo,
    getCitizenShips,
    getCitizenLocation,
    verifyCitizen
};