const { 
    getVerificationCode,
    setVerified
} = require('../verification')

const { manager } = require('../manager')

const { 
    fetchCitizen, 
    createCitizen 
} = require('../citizen/model.js')


async function getUser(usr) {

    var params = {
        id: usr.sub
    }
    const user = await manager.getUser(params).then((res) => {
        return res
    }).catch((err) => {
        console.error(err)
        return null
    });

    user.verificationCode = await getVerificationCode(user)

    //TODO: filter to just wanted user fields.
    return user
}

async function updateHandle(usr, handle) {
    user = getUser(usr)
    var params = {
        id: user.sub
    }
    var metadata = {
        handle: handle,
        handle_verified: false
    }
    management.updateAppMetadata(params, metadata).then(function(user) {
        removeCitizen(user.app_metadata.handle)
        return user
    }).catch(function(err) {
        console.error(err)
    });
}

async function removeCitizen(handle) {
    await executeSQL("DELETE FROM citizen_sync WHERE handle=?", [handle])
    await executeSQL("DELETE FROM citizen WHERE handle=?", [handle])
}

// Sync code

async function sync(usr) {
    const user = await getUser(usr)
    console.log(await getVerificationCode(user))
    if(user.app_metadata.handle_verified) {
        const result = await syncCitizen(user.app_metadata.handle).then((citizen) => {
            return {success: true, citizen: citizen}
        }).catch((err) => {
            return {success: false, error: `Sync failed. Flint probably broke something :( - ${err}`}
        })
        return result
    } else {
        return {success: false, error: 'Your account is not yet verified! Please verify and try again.'}
    }
}

async function syncCitizen(handle) {
    console.log('syncing...')
    // get citizen data from RSI
    const citizen = await fetchCitizen(handle)

    // update citizen data
    if(citizen) {
        sql = "REPLACE INTO citizen_sync (handle, record, name, bio, enlisted, portrait, org, orgrank, website) VALUES (?,?,?,?,?,?,?,?,?)"
        data = [
            citizen.handle,
            citizen.record,
            citizen.name,
            citizen.bio,
            citizen.enlisted,
            citizen.portrait,
            citizen.org,
            citizen.orgRank,
            citizen.website
        ]
        await executeSQL(sql, data)
        return citizen
    } else {
        return null
    }
}

// Verification

async function verify (usr) {
    const user = await getUser(usr)
    const validCode = await getVerificationCode(user)
    const code = await getBioCode(user.app_metadata.handle)

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

async function getBioCode(handle) {
    code = await fetchCitizen(handle).then((citizen) => {
        return citizen.bio.match(/\[ueelife\:[A-Za-z0-9\-]+\]/i)
    }).catch(function (err) {
        console.error(err)
        return ""
    })
    return code
}


module.exports = {
    getUser,
    updateHandle,
    sync,
    verify
}