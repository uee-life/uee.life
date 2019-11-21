const axios = require('axios')
const cheerio = require('cheerio')

async function fetchOrg(org) {
    try {
        const baseURI = "https://robertsspaceindustries.com"
        const resp = await axios.get(baseURI + '/orgs/' + org)
        const $ = cheerio.load(resp.data)
        info = {}
        info.name = $('h1', '#organization').text().split("/")[0].trim()
        info.banner = baseURI + $('div.banner', '#organization').find('img').attr('src')
        info.logo = baseURI + $('div.logo', '#organization').find('img').attr('src')
        info.count = $('div.logo', '#organization').find('span').text().split(" ")[0]
        info.bio = $('div.body').text()
        info.model = $('ul.tags', '#organization').find('li.model').text()
        info.roles = {}
        info.roles.primary = $('ul.focus', '#organization').find('li.primary').find('img').attr('alt')
        info.roles.secondary = $('ul.focus', '#organization').find('li.secondary').find('img').attr('alt')
        info.intro = $('div.join-us', '#organization').find('div.markitup-text').html()
        info.history = $('h2:contains("History")', '#organization').next().html()
        info.manifesto = $('h2:contains("Manifesto")', '#organization').next().html()
        info.charter = $('h2:contains("Charter")', '#organization').next().html()
        info.tag = org

        return info
    } catch (error) {
        console.error(error)
        return {error: "Org Not found!"}
    }
}





async function getOrganization(org) {
    return await fetchOrg(org)
}

module.exports = {
    getOrganization,
};