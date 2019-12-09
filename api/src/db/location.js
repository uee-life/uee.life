
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
    rows = getData(sql, [planet])
    return rows
}

async function getPOIs(system, location="") {
    if(location) {
        sql = "SELECT * FROM pois where parent_id=(select id from locations where name=?)"
        console.log(sql)
        rows = getData(sql, [location])
        console.log(rows)
    } else {
        sql = "SELECT * FROM pois where system=?"
        console.log(sql)
        console.log(system)
        console.log(location)
        rows = getData(sql, [system])
    }
    return rows
}

module.exports = {
    getSystem,
    getPlanets,
    getPlanet,
    getSatellites,
    getPOIs
}