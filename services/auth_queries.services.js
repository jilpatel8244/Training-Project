const connection = require("../config/database");
const CustomError = require("../helper/CustomError");

function checkUserExists(req, res){
    try {
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
    } catch (error) {
        const err = new CustomError(error.message, 500);
    }
    
}

function makeUser(req, res){
    try {
        return new Promise((resolve, reject) => {
            let sql = `insert into students (first_name, last_name, dob, email, gender, phone_number, activation_code, user_timezone) values (?, ?, ?, ?, ?, ?, ?, ?);`
            connection.query( sql, [req.body.first_name, req.body.last_name, req.body.dob, req.body.email, req.body.gender, req.body.phone_number, req.body.activation_code, req.body.user_timezone], (error, result) => {
                if (error) return reject(error);
                
                return resolve(result.insertId);
            })
        })
    } catch (error) {
        const err = new CustomError(error.message, 500);
    }
}

function activationCodeCheckWhenRegister(req, res){
    try {
        return new Promise((resolve, reject) => {
            let sql = `select * from students where activation_code="${req.query.activation_code}"`;
            connection.query(sql, (error, result) => {
                if (error) return reject(error);
                
                return resolve(result)
            })
        })
    } catch (error) {
        const err = new CustomError(error.message, 500);
    }
}

function updateData(req, res){
    try {
        return new Promise((resolve, reject) => {
            let sql = `update students set hash_password = '${req.body.hashed_password}', salt = '${req.body.salt}', activation_status = '1' where id = ${req.body.userInsertedId}`;
            connection.query(sql, (error, result) => {
                if (error) {
                    return reject(error);
                }
                
                return resolve(true);
            })
        })
    } catch (error) {
        const err = new CustomError(error.message, 500);
    }
}

function updateActivationCode(req, res) {
    try {
        return new Promise((resolve, reject) => {
            let sql = `update students set activation_code = '${req.body.activation_code}' where email = '${req.body.email}'` 
            connection.query(sql, (error, result) => {
                if (error) return reject(error);
                
                return resolve();
            })
        })
    } catch (error) {
        const err = new CustomError(error.message, 500);
    }
}

function activationCodeCheck(req, res){
    try {
        return new Promise((resolve, reject) => {
            let sql = `select * from students where activation_code = '${req.query.activation_code}' and activation_status = true`;
            connection.query(sql, (error, result) => {
                if (error) return reject(error);
                
                return resolve(result)
            })
        })
    } catch (error) {
        const err = new CustomError(error.message, 500);
    }
}

function getUserData(req, res){
    try {
        return new Promise((resolve, reject) => {
            let sql = `select * from students where email = '${req.body.email}'`
            connection.query(sql, (error, result) => {
                if (error) return reject(error);
                
                return resolve(result);
            })
        })
    } catch (error) {
        const err = new CustomError(error.message, 500);
    }
}

function updateLinkAndEmail(req, res){
    try {
        return new Promise((resolve, reject) => {
            let sql = `update students set email = '${req.body.email}', activation_code = '${req.body.activation_code}' where id = '${req.body.id}'`;
            connection.query(sql, (error, result) => {
                if (error) return reject(error);
    
                return resolve();
            })
        })
    } catch (error) {
        const err = new CustomError(error.message, 500);
    }
} 

module.exports = {checkUserExists, makeUser, activationCodeCheckWhenRegister, updateData, getUserData, updateActivationCode, activationCodeCheck, updateLinkAndEmail};