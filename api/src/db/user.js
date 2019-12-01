const axios = require("axios")
const uuid = require('uuid/v4')

const pool = require('./mariadb')

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
    data.verificationCode = getVerificationCode(data)
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

async function setVerificationCode(user, code) {
    let conn;
    try {
        conn = await pool.getConnection();

        const res = await conn.query("INSERT INTO verification (email, vcode) value (?, ?)", [user.email, code]);
        console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
  
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
}

async function getVerificationCode(user) {
    let conn;
    code = "";
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT vcode from verification where email = ?", [user.email]);
        console.log(rows); //[ {val: 1}, meta: ... ]
        if(rows.length > 1) { // rows + meta info
            code = rows[0].code
            return code;
        } else {
            code = uuid()
            await setVerificationCode(user, code);
            return code;
        }
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
}

async function verifyHandle(token, code) {
    const user = await getUser(token)
    const validCode = getVerificationCode(user)

    if(code == `[ueelife:${validCode}]`) {
        var params = {
            id: user.sub
        }
        var metadata = {
            handle_verified: true
        }
        const res = await management.updateAppMetadata(params, metadata).then(function(user) {
            return user
        }).catch(function(err) {
            console.error(err)
            return user
        })
        return res
    } else {
        return user
    }
}

module.exports = {
    getUser,
    verifyHandle,
    updateHandle
}