const {executeSQL} = require('../mariadb')


async function getSystems() {
    return await executeSQL("SELECT a.id, a.name, b.affiliation FROM locs a LEFT JOIN affiliation b ON a.affiliation = b.id where a.code='stanton'")
}

async function getSystem(sys) {
    system = {}
    const rows = await executeSQL("SELECT * from system_view where code = ?", [sys])
    if(rows.length > 0) { // rows + meta info
        system = rows[0]
    }
    return system;
}

async function getLocations(code) {
    return await executeSQL('SELECT a.*, b.code from locs a left join locs b on a.parent_id = b.id where b.code = ?', [code])
}

async function getPOIs(code) {
    return await executeSQL("SELECT a.* FROM poi_view a left join locs b on a.system_id = b.id where b.code=?", [code])
}

module.exports = {
    getSystems,
    getSystem, 
    getLocations, 
    getPOIs
}