const axios = require("axios")
const cheerio = require('cheerio')

async function searchOrgs(searchData) {
    try {
        const { data } = await axios.post('https://robertsspaceindustries.com/api/orgs/getOrgs', searchData);
        return data
    } catch (error) {
        console.error(error)
        return {error: 'unable to search orgs'}
    }
}

module.exports = {
    searchOrgs
};