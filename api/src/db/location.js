
const {pool, getData} = require('./mariadb')


async function getSystem(sys) {
    let conn;
    system = {};
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * from system_view where name = ?", [sys]);
        if(rows.length > 0) { // rows + meta info
            system = rows[0]
        }
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
    return system;
}

async function getPlanets(system) {
    let conn;
    planets = [];
    conn = await pool.getConnection();
    planets = await conn.query("SELECT * FROM location_view WHERE system = ? and type='planet'", [system]).then(rows => {
        if(rows.length > 0) {
            return rows
        } else {
            return []
        }
    }).catch(error => {
        console.error(error)
        return []
    }).finally(() => {
        if (conn) conn.end();
    });
    return planets;
}

async function getPlanet(planet) {
    let conn;
    res = {};
    conn = await pool.getConnection();
    res = await conn.query("SELECT * FROM location_view WHERE name = ? and type='planet'", [planet]).then(rows => {
        if(rows.length > 0) {
            return rows[0]
        } else {
            return {}
        }
    }).catch(error => {
        console.error(error)
        return {}
    }).finally(() => {
        if (conn) conn.end();
    });
    return res;
}

async function getSatellites(planet) {
    sql = "SELECT b.* FROM location_view a left join location_view b on b.parent_id = a.id WHERE a.name = ? and b.type='satellite'"
    rows = await getData(sql, [planet])
    return rows
}

async function getSatellite(moon) {
    sql = "SELECT a.*, b.name as planet FROM location_view a left join location_view b on a.parent_id = b.id where a.name=? and a.type='satellite'"
    rows = await getData(sql, [moon])
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
        rows = await getData(sql, [location])
    } else {
        sql = "SELECT * FROM poi_view where system=?"
        rows = await getData(sql, [system])
    }
    return rows
}

async function getPOI(name) {
    sql = "SELECT * FROM poi_view WHERE code like ?"
    term = `%.${name}`
    rows = await getData(sql, [term])
    if(rows) {
        return rows[0]
    } else {
        return {}
    }
}

module.exports = {
    getSystem,
    getPlanets,
    getPlanet,
    getSatellites,
    getSatellite,
    getPOIs,
    getPOI
}