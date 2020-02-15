const { cache, checkJwt, checkPermission } = require('../helper')
const router = require('express').Router()

const {
    getPOISpec,
    getPOI,
    getPOIData
} = require('./model');

router.get('/pois/spec', cache(60), async (req, res) => {
    res.send(await getPOISpec())
})