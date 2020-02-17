const { cache, checkJwt, checkPermission } = require('../helper')
const router = require('express').Router()

const {
    getPOISpec,
    getAllPOIs,
    addPOI,
    getPOI,
    updatePOI,
    getPOIData,
    updatePOIData
} = require('./model');

router.get('/pois', cache(60), async (req, res) => {
    res.send(await getAllPOIs())
})

router.post('/pois', checkJwt, async (req, res) => {
    res.send(await addPOI(req.user, req.body))
})

router.get('/pois/spec', cache(60), async (req, res) => {
    res.send(await getPOISpec())
})

router.get('/pois/:id', cache(60), async (req, res) => {
    res.send(await getPOI(req.params.id));
})

router.put('/pois/:id', checkJwt, async (req, res) => {
    res.send(await updatePOI(req.user, req.params.id, req.body))
})

router.get('/pois/:id/data', cache(60), async (req, res) => {
    res.send(await getPOIData(req.params.id))
})

router.put('/pois/:id/data', checkJwt, async (req, res) => {
    res.send(await updatePOIData(req.user, req.params.id, req.body))
})