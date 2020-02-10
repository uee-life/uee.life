const uuid = require('uuid/v4')
const { executeSQL } = require('../mariadb')

const { getCitizen, createCitizen } = require('../citizen')

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

async function getCode(handle) {
    code = await getCitizen(handle).then((citizen) => {
        return citizen.info.bio.match(/\[ueelife\:[A-Za-z0-9\-]+\]/i)
    }).catch(function (err) {
        console.error(err)
        return ""
    })
    return code
}

async function setVerified(user) {
    var params = {
        id: user.user_id
    }
    var metadata = {
        handle_verified: true
    }
    const usr = await management.updateAppMetadata(params, metadata).then(function(res) {
        console.log(res)
        return res
    }).catch(function(err) {
        console.error(err)
        return null
    })

    if(usr) {

    }
    return usr
}

async function verifyCitizen(token, handle) {
    const user = await getUser(token)
    const validCode = await getVerificationCode(user)
    const code = await getCode(handle)

    if(code == `[ueelife:${validCode}]`) {
        const res = setVerified(user)
        setVerificationCode(user, uuid());
        createCitizen(user.app_metadata.handle)
        return {
            success: true,
            msg: "Successfully verified citizen!",
            user: res   // user with verified flag set
        }
    } else {
        return {
            success: false,
            msg: "Code missing or doesn't match. Did you copy the code to your bio?",
            user: user
        }
    }
}

module.exports = {
    getVerificationCode,
    verifyCitizen
}