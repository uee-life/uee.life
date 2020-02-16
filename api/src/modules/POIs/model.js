const {executeSQL} = require('../mariadb')

async function getPOISpec() {
    const spec = {
        types: await executeSQL('SELECT * from poi_types'),
        subtypes: await executeSQL('SELECT * from poi_subtypes'),
        affiliations: await executeSQL('SELECT * from affiliation')
    }
    return spec
}

async function getPOI(id) {
    return await executeSQL('SELECT * FROM pois WHERE id=?', [id])
}

async function getPOIData(id) {
    return await executeSQL('SELECT * FROM poi_data WHERE poi=?', [id])
}

module.exports = {
    getPOISpec,
    getPOI,
    getPOIData
}