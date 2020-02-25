const axios = require('axios')
const cheerio = require('cheerio')

async function fetchCitizen(handle) {
    console.log('fetching citizen...')
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

module.exports = {
    fetchCitizen
}