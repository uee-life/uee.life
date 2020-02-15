const {executeSQL} = require('../mariadb')

async function getPOISpec() {
    const spec = {
        types: await executeSQL('SELECT * from poi_types'),
        subtypes: await executeSQL('SELECT * from poi_subtypes'),
        affiliations: await executeSQL('SELECT * from affiliation')
    }
    return spec
}

module.exports = {
    getPOISpec
}