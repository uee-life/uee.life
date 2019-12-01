const axios = require("axios")
const { domain, clientId, clientSecret, scope, audience } = require("../config/auth_config.js");

var ManagementClient = require('auth0').ManagementClient;

var management = new ManagementClient({
    domain: domain,
    clientId: clientId,
    clientSecret: clientSecret,
    scope: scope,
    audience: audience,
    tokenProvider: {
        enableCache: true,
        cacheTTLInSeconds: 10
    }
});

async function getUser(token) {
    data = {}
    const api_uri = 'https://ueelife-test.auth0.com/userinfo'
    data = await axios({
        url: api_uri,
        method: 'GET',
        headers: {
            'Authorization': `${token}`
        }
    }).then(function (res) {
        return res.data
    }).catch(function (err) {
        console.error(err);
    })
    return data
}

async function getHandle(token) {
    user = await getUser(token)
    data = {
        handle: user['https://uee.life/user_metadata'].handle,
        verified: user['https://uee.life/app_metadata'].handle_verified
    }
    return data
}

async function updateHandle(token, handle) {
    console.log(user)
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

async function verifyHandle(token) {
    var user = await getUser(token)
    var params = {
        id: user.sub
    }
    var metadata = {
        handle_verified: true
    }
    const res = await management.updateAppMetadata(params, metadata).then(function(user) {
        //console.log(user)
        return user
    }).catch(function(err) {
        console.error(err)
        return null
    })
    console.log(res)
    return res
}

module.exports = {
    getUser,
    verifyHandle,
    updateHandle
}