const { cache, checkJwt } = require('../helper')
const router = require('express').Router()

const { 
    syncShips,
    getShips,
    getCitizenShips,
    saveShip
} = require('./model')

router.get('/ships/sync', async (req, res) => {
    res.send(await syncShips())
})

router.get('/ships', async (req, res) => {
    res.send(await getShips())
})

router.get('/citizen/:handle/ships', async (req, res) => {
    res.send(await getCitizenShips(req.params.handle));
});

/*
*   Protected APIs
*/

router.post('/ships/add', checkJwt, async (req, res) => {
    res.send(await saveShip(req.body))
})

module.exports = router