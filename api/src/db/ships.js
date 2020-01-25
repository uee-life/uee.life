const axios = require("axios")

async function syncShips() {
    let result = await axios({
        url: 'https://calculator-api-259617.appspot.com/mongoDocuments/ships',
        method: 'GET'
    }).then((res) => {
        return res
    }).catch((err) => {
        console.error(err)
    })
    return {success: "Success!", result: result}
}

module.exports = {
    syncShips
};