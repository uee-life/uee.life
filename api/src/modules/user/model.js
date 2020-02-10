const jwt = require('jsonwebtoken')

const { getVerificationCode } = require('../verification')
const { manager } = require('../manager')


async function getUser(token) {
    userID = jwt.decode(token.slice(7)).sub

    var params = {
        id: userID
    }
    const user = await manager.getUser(params).then((res) => {
        return res
    }).catch((err) => {
        console.error(err)
    });

    user.verificationCode = await getVerificationCode(user)

    //TODO: filter to just wanted user fields.
    return user
}

async function updateHandle(token, handle) {
    user = getUser(token)
    var params = {
        id: user.sub
    }
    var metadata = {
        handle: handle,
        handle_verified: false
    }
    management.updateAppMetadata(params, metadata).then(function(user) {
        return user
    }).catch(function(err) {
        console.error(err)
    });
}

module.exports = {
    getUser,
    updateHandle
}