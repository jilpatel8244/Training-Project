const connection = require("../config/database");

exports.getAllStudentsCount = (table_name) => {
    return new Promise((resolve, reject) => {
        connection.query(`select count(*) as count from ${table_name}`, function (err, result) {
            if (err) return reject(err);
          
            return resolve(result[0].count);
        });
    });
}