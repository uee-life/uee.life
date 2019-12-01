const axios = require("axios")

async function getHandle(token) {
    data = {}
    const api_uri = 'https://ueelife-test.auth0.com/userinfo'
    console.log(token)
    axios({
        url: api_uri,
        method: 'GET',
        headers: {
            'Authorization': `${token}`
        }
    }).then(function (res) {
        console.log(res);
    }).catch(function (err) {
        console.error(err);
    })
}


module.exports = {
    getHandle
}