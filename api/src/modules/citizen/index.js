const { cache, checkJwt } = require('../helper')
const router = require('express').Router()

const {
    getCitizen, 
    getCitizenInfo, 
    getCitizenLocation, 
    startSync
} = require('./model');


router.get('/citizen/:handle', cache(600), async (req, res) => {
    res.send(await getCitizen(req.params.handle))
})

router.get('/citizen/:handle/info', cache(600), async (req, res) => {
    res.send(await getCitizenInfo(req.params.handle));
})

router.get('/citizen/:handle/ships', async (req, res) => {
    res.send(await getCitizenShips(req.params.handle));
});

router.get('/citizen/:handle/location', cache(600), async(req, res) => {
    res.send(await getCitizenLocation(req.params.handle))
})

/*
*   Protected apis
*/

router.post("/sync", checkJwt, async (req, res) => {
    res.send(await startSync(req.headers.authorization))
});

module.exports = router