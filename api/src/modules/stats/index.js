const { cache, checkJwt } = require('../helper')
const router = require('express').Router()

const {
    getStats
} = require('./model');

router.get('/stats', cache(600), async (req, res) => {
    res.send(await getStats());
})

module.exports = router