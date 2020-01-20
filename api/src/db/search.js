const axios = require("axios")
const cheerio = require('cheerio')

async function searchOrgs(query) {

    // update here to allow mulitple search objects/terms (i.e. searching by size)
    const searchData = {
        sort: "default",
        search: query.search,
        commitment: [],
        roleplay: [],
        size: [],
        model: [],
        activity: [],
        language: [],
        recruiting: [],
        pagesize: 12,
        page: 1
    }
    
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