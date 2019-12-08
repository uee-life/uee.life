
const pool = require('./mariadb')


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
    });
    return planets;
}

module.exports = {
    getSystem,
    getPlanets
}