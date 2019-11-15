const axios = require("axios")
const cheerio = require('cheerio')

async function fetchCitizen(handle) {
    try {
        const resp = await axios.get('https://robertsspaceindustries.com/citizens/' + handle)
        const $ = cheerio.load(resp.data)
        info = {}
        info.handle = handle
        info.record = $('span:contains("UEE Citizen Record")', '#public-profile').next().text()
        info.name = $('div.profile.left-col', '#public-profile').find('div.info').find('p.entry').find('strong.value').html()
        info.bio = $('span:contains("Bio")', '#public-profile').next().text()
        info.enlisted = $("span:contains('Enlisted')", '#public-profile').next().text()
        info.portrait = $('div.thumb', '#public-profile').children()[0].attribs.src
        info.org = $('span:contains("Spectrum Identification (SID)")', '#public-profile').next().text()
        info.orgRank = $('span:contains("Organization rank")', '#public-profile').next().text()

        return info
    } catch (error) {
        console.error(error)
        return {}
    }
}

function loadData(handle) {
    return {
        home: {
            system: "Stanton",
            planet: "Hurston",
            city: "Lorville"
        },
        ships: [
            {
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
            }
        ]
    }
}

async function getCitizen(handle) {

    res = loadData(handle)

    info = await fetchCitizen(handle)

    res.info = info

    return res
};

module.exports = {
    getCitizen,
};