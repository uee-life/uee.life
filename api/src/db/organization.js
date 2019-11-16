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