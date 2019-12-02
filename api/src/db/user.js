const axios = require("axios")
const uuid = require('uuid/v4')
const jwt = require('jsonwebtoken')

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
    userID = jwt.decode(token.slice(7)).sub

    var params = {
        id: userID
    }
    const user = await management.getUser(params).then((res) => {
        return res
    }).catch((err) => {
        console.error(err)
    });

    user.verificationCode = await getVerificationCode(user)

    //TODO: filter to just wanted user fields.
    return user
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
        if(rows.length > 0) { // rows + meta info
            code = rows[0].vcode
        } else {
            code = uuid()
            await setVerificationCode(user, code);
        }
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
    return code;
}

async function verifyHandle(token, code) {
    const user = await getUser(token)
    const validCode = await getVerificationCode(user)
    console.log("valid code: " + validCode)
    console.log("test code: " + code)
    if(code == `[ueelife:${validCode}]`) {
        var params = {
            id: user.user_id
        }
        var metadata = {
            handle_verified: true
        }
        const res = await management.updateAppMetadata(params, metadata).then(function(user) {
            return user
        }).catch(function(err) {
            console.error(err)
            return null
        })
        return {
            success: true,
            user: res
        }
    } else {
        return {
            success: false,
            user: user
        }
    }
}

module.exports = {
    getUser,
    verifyHandle,
    updateHandle
}