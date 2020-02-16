const { cache, checkJwt } = require('../helper')
const router = require('express').Router()

const {
    getSystems,
    getSystem, 
    getLocations, 
    getPOIs
} = require('./model');

router.get('/systems', cache(600), async (req, res) => {
    res.send(await getSystems())
})

router.get('/systems/:code', cache(60), async (req, res) => {
    res.send(await getSystem(req.params.code));
});

router.get('/systems/:code/locations', cache(60), async (req, res) => {
    res.send(await getLocations(req.params.code));
})

router.get('/systems/:code/pois', cache(60), async (req, res) => {
    res.send(await getPOIs(req.params.code));
})