
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

async function getPlanet(system, planet) {
    let conn;
    res = {};
    conn = await pool.getConnection();
    res = await conn.query("SELECT * FROM locations WHERE system = ? and name = ? and type='planet'", [system, planet]).then(rows => {
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

async function getSattelites(planet) {
    sql = "SELECT b.* FROM locations a left join locations b on b.parent_id = a.id WHERE a.name = ? and b.type='satellite'"
    rows = getData(sql, [planet])
    return rows
}

module.exports = {
    getSystem,
    getPlanets,
    getPlanet,
    getSattelites
}