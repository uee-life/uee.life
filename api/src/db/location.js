
const {pool} = require('./mariadb')


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
    if(rows.length > 0) {
        system = rows[0]
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
    planet = {};
    conn = await pool.getConnection();
    planet = await conn.query("SELECT * FROM locations WHERE system = ? and name = ? and type='planet'", [system, planet]).then(rows => {
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
    return planet;
}

module.exports = {
    getSystem,
    getPlanets,
    getPlanet
}