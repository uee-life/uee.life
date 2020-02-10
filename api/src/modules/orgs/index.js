const { cache, checkJwt } = require('../helper')
const router = require('express').Router()

const {
    getOrganization, 
    getOrgFounders, 
    getOrgMembers
} = require('./model');

router.get('/orgs/:id', cache(60), async (req, res) => {
    res.send(await getOrganization(req.params.id));
});

router.get('/orgs/:id/founders', cache(60), async (req, res) => {
    res.send(await getOrgFounders(req.params.id));
});

router.get('/orgs/:id/members', async (req, res) => {
    const page = req.query.page || 1
    res.send(await getOrgMembers(req.params.id, page, true));
})

router.get('/orgs/:id/affiliates', async (req, res) => {
    const page = req.query.page || 1
    res.send(await getOrgMembers(req.params.id, page, false));
})

module.exports = router
