
const {executeSQL} = require('./mariadb')

async function getSystems() {
    return await executeSQL("SELECT a.id, a.name, b.affiliation FROM systems a LEFT JOIN affiliation b ON a.affiliation = b.id;")
}

async function getSystem(sys) {
    system = {};
    const rows = await executeSQL("SELECT * from system_view where name = ?", [sys]);
    if(rows.length > 0) { // rows + meta info
        system = rows[0]
    }
    return system;
}

async function getPlanets(system) {
    planets = [];
    rows = await executeSQL("SELECT * FROM location_view WHERE system = ? and type='planet'", [system]);
    if(rows.length > 0) {
        planets = rows
    } 
    return planets;
}

async function getPlanet(planet) {
    res = {};
    rows = await executeSQL("SELECT * FROM location_view WHERE name = ? and type='planet'", [planet]);
    if(rows.length > 0) {
        res = rows[0]
    }
    return res;
}

async function getSatellites(planet) {
    sql = "SELECT b.* FROM location_view a left join location_view b on b.parent_id = a.id WHERE a.name = ? and b.type='satellite'"
    rows = await executeSQL(sql, [planet])
    return rows
}

async function getSatellite(moon) {
    sql = "SELECT a.*, b.name as planet FROM location_view a left join location_view b on a.parent_id = b.id where a.name=? and a.type='satellite'"
    rows = await executeSQL(sql, [moon])
    console.log(rows)
    if(rows) {
        return rows[0]
    } else {
        return {}
    }
}

async function getPOIs(system, location="") {
    if(location) {
        sql = "SELECT * FROM poi_view where parent_id=(select id from location_view where name=?)"
        rows = await executeSQL(sql, [location])
    } else {
        sql = "SELECT * FROM poi_view where system=?"
        rows = await executeSQL(sql, [system])
    }
    return rows
}

async function getPOI(name) {
    sql = "SELECT * FROM poi_view WHERE code like ?"
    term = `%.${name}`
    rows = await executeSQL(sql, [term])
    if(rows) {
        return rows[0]
    } else {
        return {}
    }
}

module.exports = {
    getSystems,
    getSystem,
    getPlanets,
    getPlanet,
    getSatellites,
    getSatellite,
    getPOIs,
    getPOI
}