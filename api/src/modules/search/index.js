const { cache, checkJwt } = require('../helper')
const router = require('express').Router()

const { searchOrgs } = require('./model');

router.get('/search/org', cache(600), async (req, res) => {
    res.send(await searchOrgs(req.query));
});

module.exports = router