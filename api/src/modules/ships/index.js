const { cache, checkJwt } = require('../helper')
const router = require('express').Router()

const { 
    syncShips,
    getShips,
    saveShip
} = require('./model')

router.get('/ships/sync', async (req, res) => {
    res.send(await syncShips())
})

router.get('/ships', async (req, res) => {
    res.send(await getShips())
})

/*
*   Protected APIs
*/

router.post('/ships', checkJwt, async (req, res) => {
    res.send(await saveShip(req.body))
})

module.exports = router