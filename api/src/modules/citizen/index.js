const { cache, checkJwt } = require('../helper')
const router = require('express').Router()

const {
    getCitizen, 
    getInfo, 
    getLocation,
    getShips,
    setLocation,
    startSync
} = require('./model');

const {
    verifyCitizen
} = require('../verification')


// retrieve citizen basic info
router.get('/citizens/:handle', cache(600), async (req, res) => {
    res.send(await getCitizen(req.params.handle))
})

router.get('/citizens/:handle/info', cache(600), async (req, res) => {
    res.send(await getInfo(req.params.handle));
})

router.get('/citizens/:handle/ships', async (req, res) => {
    res.send(await getShips(req.params.handle));
});

router.get('/citizens/:handle/location', cache(600), async(req, res) => {
    res.send(await getLocation(req.params.handle))
})

// Protected
router.put("/citizens/:handle/location", checkJwt, async (req, res) => {
    res.send(await setLocation(req.user, req.params.handle, req.body))
})

module.exports = router