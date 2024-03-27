const mysql = require('mysql');

var connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "password",
    database : "SMS"
});

connection.connect(function (err) {
    if (err) {
        throw err;
    }
    else{
        console.log("connected successfully");
    }
});


module.exports = connection;