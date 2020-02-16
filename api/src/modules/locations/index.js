const { cache, checkJwt } = require('../helper')
const router = require('express').Router()

const {
    getLocationSpec,
    getLocation,
    getLocationData,
    getLocations,
    getPOIs
} = require('./model');

router.get('/locations/spec', cache(60), async (req, res) => {
    res.send(await getLocationSpec())
})
router.get('/locations/:code', cache(60), async (req, res) => {
    res.send(await getLocation(req.params.code))
})

router.get('/locations/:code/data', cache(60), async (req, res) => {
    res.send(await getLocationData(req.params.code))
})

router.get('/locations/:code/locations', cache(60), async (req, res) => {
    res.send(await getLocations(req.params.code))
})

router.get('/locations/:code/pois', cache(60), async (req, res) => {
    res.send(await getPOIs("", req.params.planet))
})

module.exports = router