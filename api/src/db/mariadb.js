const mariadb = require('mariadb');
const {db_host, db_user, db_pass, db_db} = require('../config/db_config')

const pool = mariadb.createPool({
     host: db_host, 
     user: db_user, 
     password: db_pass,
     database: db_db,
     connectionLimit: 5
});

async function executeSQL(sql, params) {
  let conn;
  result = [];
  conn = await pool.getConnection();
  result = await conn.query(sql, params).then(rows => {
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
  return result;
}

module.exports = {
  executeSQL
}