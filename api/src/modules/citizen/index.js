const { cache, checkJwt } = require('../helper')
const router = require('express').Router()

const {
    getCitizen, 
    getInfo, 
    getLocation,
    getShips,
    setLocation,
    verifyCitizen,
    startSync
} = require('./model');


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
    res.send(await setLocation(req.headers.authorization, req.params.handle, req.body))
})

// Protected
router.get("/citizens/:handle/verify", checkJwt, async (req, res) => {
    res.send(await verifyCitizen(req.headers.authorization, req.params.handle));
});

// Protected
router.get("/citizens/:handle/sync", checkJwt, async (req, res) => {
    res.send(await startSync(req.headers.authorization))
});

module.exports = router