const {executeSQL} = require('../mariadb')


async function addLocation(user, data) {
    // add location
}

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
    rows = await executeSQL("SELECT * FROM locs_view WHERE code = ?", [code]);
    if(rows.length > 0) {
        res = rows[0]
    }
    return res
}

async function updateLocation(code, data) {
    // update location
}

async function getLocationData(code) {
    res = {}
    rows = await executeSQL('SELECT * FROM location_data where code = ?', [code])
    if(rows.length > 0) {
        res = rows[0]
    }
    return res
}

async function updateLocationData(code, data) {
    // update location data
}

async function getLocations(code) {
    locations = []
    rows = await executeSQL('SELECT a.* from locs_view a left join locs_view b on a.parent_id = b.id where b.code = ?', [code])
    if(rows.length > 0) {
        locations = rows
    }
    return locations
}

async function getPOIs(code) {
    sql = "SELECT * FROM poi_view where parent_id=(select id from locs_view where code=?)"
    rows = await executeSQL(sql, [code])
    return rows
}

module.exports = {
    addLocation,
    getLocationSpec,
    getLocation,
    updateLocation,
    getLocationData,
    updateLocationData,
    getLocations,
    getPOIs
}