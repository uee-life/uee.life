const { cache, checkJwt } = require('../helper')
const router = require('express').Router()

const {
    getUser,
    verify,
    sync
} = require('./model').default;

// Protected
router.get("/user", checkJwt, async (req, res) => {
    console.log('/user called')
    console.log(req.user)
    console.log('************')
    res.send(await getUser(req.user).catch(err => {
        console.error(err)
        return err
    }))
})

// Protected
router.put('/user', checkJwt, async (req, res) => {
    res.send(await updateHandle(req.user, req.body.handle))
})


// Protected
router.get("/user/verify", checkJwt, async (req, res) => {
    res.send(await verify(req.user));
})

// Protected
router.get("/user/sync", checkJwt, async (req, res) => {
    res.send(await sync(req.user))
})

module.exports = router