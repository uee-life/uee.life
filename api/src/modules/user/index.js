const { cache, checkJwt } = require('../helper')
const router = require('express').Router()

const {
    getUser, 
    verifyCitizen,
    setLocation
} = require('./model');

router.get("/user", checkJwt, async (req, res) => {
    res.send(await getUser(req.headers.authorization).catch(err => {
        console.error(err)
        return err
    }));
});

/*
*   Protected APIs
*/

//TODO: These shouldn't be here...
router.get("/citizen/:handle/verify", checkJwt, async (req, res) => {
    res.send(await verifyCitizen(req.headers.authorization, req.params.handle));
});

router.post("/citizen/:handle/location", checkJwt, async (req, res) => {
    res.send(await setLocation(req.headers.authorization, req.params.handle, req.body))
})

module.exports = router