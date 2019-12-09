
const {pool, getData} = require('./mariadb')


async function getSystem(code) {
    let conn;
    system = {};
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * from systems where code = ?", [code]);
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
    planets = await conn.query("SELECT * FROM locations WHERE system = ? and type='planet'", [system]).then(rows => {
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
    res = await conn.query("SELECT * FROM locations WHERE name = ? and type='planet'", [planet]).then(rows => {
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
    sql = "SELECT b.* FROM locations a left join locations b on b.parent_id = a.id WHERE a.name = ? and b.type='satellite'"
    rows = await getData(sql, [planet])
    return rows
}

async function getSatellite(moon) {
    sql = "SELECT a.*, b.name as planet FROM locations a left join locations b on a.parent_id = b.id where a.name=? and a.type='satellite'"
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
        sql = "SELECT * FROM pois where parent_id=(select id from locations where name=?)"
        rows = await getData(sql, [location])
    } else {
        sql = "SELECT * FROM pois where system=?"
        rows = await getData(sql, [system])
    }
    return rows
}

async function getPOI(name) {
    sql = "SELECT * FROM pois WHERE name=?"
    rows = getData(sql, [name])
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