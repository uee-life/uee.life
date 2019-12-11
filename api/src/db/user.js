const uuid = require('uuid/v4')
const jwt = require('jsonwebtoken')

const {executeSQL} = require('./mariadb')
const {checkCitizen} = require('./citizen')

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

    await checkCitizen(user.app_metadata.handle, user.app_metadata.handle_verified)

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
    // delete old code
    await executeSQL("DELETE FROM verification WHERE email = ?", [user.email]);

    // add new code
    const res = await executeSQL("INSERT INTO verification (email, vcode) value (?, ?)", [user.email, code]);
    console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
}

async function getVerificationCode(user) {
    code = "";
    const rows = await executeSQL("SELECT vcode from verification where email = ?", [user.email]);
    if(rows.length > 0) { // rows + meta info
        code = rows[0].vcode
    } else {
        code = uuid();
        await setVerificationCode(user, code);
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
        setVerificationCode(user, uuid());
        return {
            success: true,
            error: "",
            user: res
        }
    } else {
        return {
            success: false,
            error: "Code missing or doesn't match. Did you copy the code to your bio?",
            user: user
        }
    }
}

module.exports = {
    getUser,
    verifyHandle,
    updateHandle
}