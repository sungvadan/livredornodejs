const mysql = require('mysql');

let db = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : 'root',
    database : 'livredor'
});

db.connect();

module.exports = db