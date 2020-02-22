const { cache, checkJwt } = require('../helper')
const router = require('express').Router()

const {
    getUser
} = require('./model');

router.get("/user", checkJwt, async (req, res) => {
    console.log('/user called')
    console.log(req.user)
    console.log('************')
    res.send(await getUser(req.headers.authorization).catch(err => {
        console.error(err)
        return err
    }));
});

// Protected
router.get("/user/verify", checkJwt, async (req, res) => {
    res.send(await verifyCitizen(req.headers.authorization));
});

// Protected
router.get("/user/sync", checkJwt, async (req, res) => {
    res.send(await startSync(req.headers.authorization))
});

module.exports = router