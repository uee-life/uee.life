const { cache, checkJwt } = require('../helper')
const router = require('express').Router()

const {
    addLocation,
    getLocationSpec,
    getLocation,
    updateLocation,
    getLocationData,
    updateLocationData,
    getLocations,
    getPOIs
} = require('./model');

router.post('/locations', checkJwt, async (req, res) => {
    res.send(await addLocation(req.user, req.body))
})

router.get('/locations/spec', cache(60), async (req, res) => {
    res.send(await getLocationSpec())
})

router.get('/locations/:code', cache(60), async (req, res) => {
    res.send(await getLocation(req.params.code))
})

router.put('/locations/:code', checkJwt, async (req, res) => {
    res.send(await updateLocation(req.params.code, req.body))
})

router.get('/locations/:code/data', cache(60), async (req, res) => {
    res.send(await getLocationData(req.params.code))
})

router.put('/locations/:code/data', checkJwt, async (req, res) => {
    res.send(await updateLocationData(req.params.code, req.body))
})

router.get('/locations/:code/locations', cache(60), async (req, res) => {
    res.send(await getLocations(req.params.code))
})

router.get('/locations/:code/pois', cache(60), async (req, res) => {
    res.send(await getPOIs("", req.params.planet))
})

module.exports = router