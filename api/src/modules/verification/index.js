const uuid = require('uuid/v4')
const { executeSQL } = require('../mariadb')

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
    return usr
}

module.exports = {
    getVerificationCode,
    setVerified
}