const { cache, checkJwt, checkPermission } = require('../helper')
const router = require('express').Router()

const {
    getPOISpec,
    getPOI,
    getPOIData
} = require('./model');

router.get('/pois', cache(60), async (req, res) => {
    // TODO
})

router.post('/pois', cache(60), async (req, res) => {
    // TODO
})

router.get('/pois/spec', cache(60), async (req, res) => {
    res.send(await getPOISpec())
})

router.get('/pois/:id', cache(60), async (req, res) => {
    res.send(await getPOI(req.params.id));
})

router.put('/pois/:id', cache(60), async (req, res) => {
    // TODO
})

router.get('/pois/:id/data', cache(60), async (req, res) => {
    res.send(await getPOIData(req.params.id))
})

router.put('/pois/:id/data', cache(60), async (req, res) => {
    // TODO
})