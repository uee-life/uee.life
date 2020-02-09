const { cache, checkJwt } = require('../helper')
const router = require('express').Router()

const {
    getOrganization, 
    getOrgFounders, 
    getOrgMembers
} = require('./model');

router.get('/organization/:id', cache(60), async (req, res) => {
    res.send(await getOrganization(req.params.id));
});

router.get('/organization/:id/founders', cache(60), async (req, res) => {
    res.send(await getOrgFounders(req.params.id));
});

router.get('/organization/:id/members/:page', async (req, res) => {
    res.send(await getOrgMembers(req.params.id, req.params.page, true));
})

router.get('/organization/:id/affiliates/:page', async (req, res) => {
    res.send(await getOrgMembers(req.params.id, req.params.page, false));
})

module.exports = router
