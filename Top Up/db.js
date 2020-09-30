const mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zwallet'
});

conn.connect(err => {
    if (err) throw err;
    console.log('Database is successfully connected!');
});
module.exports = conn;