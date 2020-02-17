const {executeSQL} = require('../mariadb')

async function getPOISpec() {
    const spec = {
        types: await executeSQL('SELECT * from poi_types'),
        subtypes: await executeSQL('SELECT * from poi_subtypes'),
        affiliations: await executeSQL('SELECT * from affiliation')
    }
    return spec
}

async function getAllPOIs() {
    return await executeSQL('SELECT * FROM poi_view')
}

async function getPOI(id) {
    return await executeSQL('SELECT * FROM pois WHERE id=?', [id])
}

async function addPOI(user, data) {
    // check user stuff

    // add new POI

    // add POI Data

    return { success: true }
}

async function updatePOI(user, id, data) {
    // check user stuff

    // update POI

    return { success: true }
}

async function getPOIData(id) {
    return await executeSQL('SELECT * FROM poi_data WHERE poi=?', [id])
}

async function updatePOIData(user, id, data) {
    // check user stuff

    // update data

    return { success: true }
}

module.exports = {
    getPOISpec,
    getAllPOIs,
    getPOI,
    addPOI,
    updatePOI,
    getPOIData,
    updatePOIData
}