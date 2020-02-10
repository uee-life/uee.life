const { cache, checkJwt } = require('../helper')
const router = require('express').Router()

const {
    getUser
} = require('./model');

router.get("/user", checkJwt, async (req, res) => {
    res.send(await getUser(req.headers.authorization).catch(err => {
        console.error(err)
        return err
    }));
});

module.exports = router