const axios = require("axios")
const cheerio = require('cheerio')

async function fetchNews(data) {
    try {
        const baseURI = "https://robertsspaceindustries.com"
        const resp = await axios.post(baseURI + '/api/hub/getCommlinkItems', data)
        const $ = cheerio.load(resp.data.data)
        news = []

        $('a').each(function (n, el) {
            art = {}
            art.title = $(el).find('div.title').text()
            art.link = baseURI + $(el).attr('href')
            art.id = art.link.split('/')[3].split('-')[0]
            art.image = $(el).find('div.background').attr('style').split("'")[1]
            if(!art.image.startsWith('http')) {
                art.image = baseURI + art.image
            }
            art.posted = $(el).find('div.time_ago').find('span.value').text()
            news.push(art)
        })

        return news
    } catch (error) {
        console.error(error)
        return null
    }
}

async function getNews(data) {
    return await fetchNews(data)
}

module.exports = {
    getNews,
};