const { cache, checkJwt } = require('../helper')
const router = require('express').Router()

const {
    getSystems,
    getSystem, 
    getPlanets, 
    getPlanet, 
    getSatellites, 
    getSatellite, 
    getPOIs, 
    getPOI
} = require('./model');

router.get('/systems', cache(600), async (req, res) => {
    res.send(await getSystems())
})

router.get('/systems/:code', cache(60), async (req, res) => {
    res.send(await getSystem(req.params.code));
});

router.get('/systems/:code/planets', cache(60), async (req, res) => {
    res.send(await getPlanets(req.params.code));
})

router.get('/systems/:code/pois', cache(60), async (req, res) => {
    res.send(await getPOIs(req.params.code));
})

router.get('/planets/:planet', cache(60), async (req, res) => {
    res.send(await getPlanet(req.params.planet));
})

router.get('/planets/:planet/satellites', cache(60), async (req, res) => {
    res.send(await getSatellites(req.params.planet));
})

router.get('/satellites/:name', cache(60), async (req, res) => {
    res.send(await getSatellite(req.params.name));
})

router.get('/planets/:planet/pois', cache(60), async (req, res) => {
    res.send(await getPOIs("", req.params.planet));
})

router.get('/pois/:name', cache(60), async (req, res) => {
    res.send(await getPOI(req.params.name));
})

module.exports = router
