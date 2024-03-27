const connection = require("../config/database");

function checkUserExists(req, res){
    return new Promise((resolve, reject) => {
        let sql = `select * from students where email = '${req.body.email}';`
        connection.query( sql, (error, result) => {
            if (error) return reject(error);
            
            if (result.length == 0) {
                return resolve(false);
            } else {
                return resolve(true);
            }
        })
    })
}

function makeUser(req, res){
    return new Promise((resolve, reject) => {
        let sql = `insert into students (first_name, last_name, dob, email, gender, phone_number, activation_code, user_timezone) values (?, ?, ?, ?, ?, ?, ?, ?);`
        connection.query( sql, [req.body.first_name, req.body.last_name, req.body.dob, req.body.email, req.body.gender, req.body.phone_number, req.body.activation_code, req.body.user_timezone], (error, result) => {
            if (error) return reject(error);
            
            return resolve(result.insertId);
        })
    })
}

function activationCodeCheckWhenRegister(req, res){
    return new Promise((resolve, reject) => {
        let sql = `select * from students where activation_code="${req.query.activation_code}"`;
        connection.query(sql, (error, result) => {
            if (error) return reject(error);
            
            return resolve(result)
        })
    })
}

function updateData(req, res){
    return new Promise((resolve, reject) => {
        let sql = `update students set hash_password = '${req.body.hashed_password}', salt = '${req.body.salt}', activation_status = '1' where id = ${req.body.userInsertedId}`;
        connection.query(sql, (error, result) => {
            if (error) {
                return reject(error);
            }
            
            return resolve(true);
        })
    })
}

function updateActivationCode(req, res) {
    return new Promise((resolve, reject) => {
        let sql = `update students set activation_code = '${req.body.activation_code}' where email = '${req.body.email}'` 
        connection.query(sql, (error, result) => {
            if (error) return reject(error);
            
            return resolve();
        })
    })
}

function activationCodeCheck(req, res){
    return new Promise((resolve, reject) => {
        let sql = `select * from students where activation_code = '${req.query.activation_code}' and activation_status = true`;
        connection.query(sql, (error, result) => {
            if (error) return reject(error);
            
            return resolve(result)
        })
    })
}

function getUserData(req, res){
    return new Promise((resolve, reject) => {
        let sql = `select * from students where email = '${req.body.email}'`
        connection.query(sql, (error, result) => {
            if (error) return reject(error);
            
            return resolve(result);
        })
    })
}

function updateLinkAndEmail(req, res){
    return new Promise((resolve, reject) => {
        let sql = `update students set email = '${req.body.email}', activation_code = '${req.body.activation_code}' where id = '${req.body.id}'`;
        connection.query(sql, (error, result) => {
            if (error) return reject(error);

            return resolve();
        })
    })
} 

module.exports = {checkUserExists, makeUser, activationCodeCheckWhenRegister, updateData, getUserData, updateActivationCode, activationCodeCheck, updateLinkAndEmail};