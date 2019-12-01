const mariadb = require('mariadb');
const {db_host, db_user, db_pass, db_db} = require('../config/db_config')

const pool = mariadb.createPool({
     host: db_host, 
     user: db_user, 
     password: db_pass,
     database: db_db,
     connectionLimit: 5
});

async function asyncFunction() {
  let conn;
  try {
	conn = await pool.getConnection();
	const rows = await conn.query("SELECT 1 as val");
	console.log(rows); //[ {val: 1}, meta: ... ]
	const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
	console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}

module.exports = pool