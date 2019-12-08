
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

module.exports = {
    getSystem
}