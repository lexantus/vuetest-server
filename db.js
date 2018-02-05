const secret = require('./secret')
const mysql = require('mysql')

let pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: secret.password,
  database: 'vuetest',
  //socketPath: '/var/run/mysqld/mysqld.sock',  // общаемся с mysql через сокеты
  connectionLimit: 100
})

exports.query = function (sql, props) {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      connection.query(sql, props, function (err, res) {
        if (err) reject(err)
        else resolve(res)
      })
      connection.release()
    })
  })
}