const { cache, checkJwt } = require('../helper')
const router = require('express').Router()

const { getNews } = require('./model');

router.get('/news', cache(60), async (req, res) => {
    let data = {"channel": "","series":"","type":"","text":"","sort":"publish_new","page":1};
    for (const prop in req.query) {
        if(prop in data) {
            data[prop] = req.query[prop]
        }
    }
    res.send(await getNews(data));
});

module.exports = router