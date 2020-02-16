const {executeSQL} = require('../mariadb')


async function getLocationSpec() {
    const spec = {
        types: await executeSQL('SELECT * from location_types'),
        subtypes: await executeSQL('SELECT * from location_subtypes'),
        affiliations: await executeSQL('SELECT * from affiliation')
    }
    return spec
}

async function getLocation(code) {
    res = {};
    rows = await executeSQL("SELECT * FROM location_view WHERE code = ?", [code]);
    if(rows.length > 0) {
        res = rows[0]
    }
    return res
}

async function getLocationData(code) {
    res = {}
    rows = await executeSQL('SELECT * FROM location_data where code = ?', [code])
    if(rows.length > 0) {
        res = rows[0]
    }
    return res
}

async function getLocations(code) {
    locations = []
    rows = await executeSQL('SELECT a.*, b.code from locs a left join locs b on a.parent_id = b.id where b.code = ?', [code])
    if(rows.length > 0) {
        locations = rows
    }
    return locations
}

async function getPOIs(code) {
    sql = "SELECT * FROM poi_view where parent_id=(select id from location_view where name=?)"
    rows = await executeSQL(sql, [code])
    return rows
}

module.exports = {
    getLocationSpec,
    getLocation,
    getLocationData,
    getLocations,
    getPOIs
}