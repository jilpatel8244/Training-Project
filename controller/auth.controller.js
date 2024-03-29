const {generateRandomString} = require("../helper/generateRandomAlphaNumericString");
const {checkUserExists, makeUser, activationCodeCheckWhenRegister, updateData, updateActivationCode, activationCodeCheck, getUserData} = require('../services/auth_queries.services');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const CustomError = require("../helper/CustomError");
require('dotenv').config();

async function register_handler(req, res, next) {
    try {
        // check user already exists or not
        let userExists = await checkUserExists(req, res);

        if (!userExists){
            // make activation code
            let activation_code = generateRandomString(12);

            // get user local timezone
            let user_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            req.body.activation_code = activation_code;
            req.body.user_timezone = user_timezone;

            // make user 
            let userInsertedId = await makeUser(req, res); 

            // send activation_code and insertedId
            res.json({
                success: true,
                activation_code: activation_code,
                userInsertedId: userInsertedId
            })

        } else {
            res.json({
                success: false,
                message: "user already exists"
            })
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

async function check_timeout_and_then_render_password_page(req, res, next) {
    try {
        // check valid activation code and activation status 
        let result = await activationCodeCheckWhenRegister(req, res);

        if (result.length != 0) {
            // check timeout 

            let diff = Math.abs(new Date() - new Date(result[0].created_at));
            let minutes = Math.floor((diff/1000)/60);

            if (minutes <= 60) {
                // render create pass...confirm pass page
                res.render("pages/password_page", {
                    userInsertedId: req.query.userInsertedId
                })

            } else{
                // render time-out page
                res.render('pages/timeout_page', {
                    id: result[0].id
                });
            }
        } else {
            // res.json({
            //     success: false,
            //     message: "404 page not found"
            // })
            const error = new CustomError(`page not found`, 404);
            next(error);
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

async function activate_user(req, res) {
    try {
        // salt the password
        let salt = generateRandomString(4);
        let salted_password = req.body.create_password + salt;

        // hash the password
        let hashed_password = md5(salted_password); 

        req.body.hashed_password = hashed_password;
        req.body.salt = salt;

        // update password, salt field and activation status
        let all_is_ok = await updateData(req, res);
        if (all_is_ok) {
            res.json({
                success: true,
                message: "go to login"
            })
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

async function verifyEmail(req, res) {
    try {
        let result = await getUserData(req, res);
    
        if(result.length == 0){
            res.json({
                success: false,
                message: "invalid data"
            })
        } else {
            let activation_code = generateRandomString(12);
            req.body.activation_code = activation_code;
    
            await updateActivationCode(req, res);
            res.json({
                success: true,
                id: result[0].id,
                activation_code: activation_code
            })
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }

}

async function loginHandler(req, res) {
    try {
        let userData = await getUserData(req, res);
        if(userData.length == 0){
            res.json({
                success: false,
                message: "email or password not match"
            })
        } else {
            let password = req.body.password;
    
            let salted_password = password + userData[0].salt;
            let hased_password = md5(salted_password); 
    
            if (hased_password == userData[0].hash_password) {
                let payload = {
                    email: req.body.email
                }
                let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "50m" });
    
                let options = {
                    httpOnly: true,
                }
    
                res.cookie("token", token, options).json({
                    success: true,
                    message: "go to home page"
                });
    
            } else {
                res.json({
                    success: false,
                    message: "email or password not match"
                });
            }
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

async function forgetPasswordHandler(req, res, next){
    try {
        // check valid activation code and activation status 
        let result = await activationCodeCheck(req, res);
        if (result.length != 0) {
            // check timeout 
    
            let diff = Math.abs(new Date() - new Date(result[0].created_at));
            let minutes = Math.floor((diff/1000)/60);
    
            if (minutes <= 60) {
                // render create pass...confirm pass page
                res.render("pages/password_page", {
                    userInsertedId: req.query.userInsertedId
                })
    
            } else{
                res.render('pages/timeout_page', {
                    id: result[0].id
                });
            }
        } else {
            // res.json({
            //     success: false,
            //     message: "404 page not found"
            // })
            const error = new CustomError(`page not found`, 404);
            next(error);
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

async function generateNewLink(req, res) {
    try {
        let activation_code = generateRandomString(12);
        req.body.activation_code = activation_code;
        await updateLinkAndEmail(req, res);
    
        res.json({
            success: true,
            id: req.body.id
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }

}

module.exports = {register_handler, generateRandomString, check_timeout_and_then_render_password_page, activate_user, verifyEmail, loginHandler, forgetPasswordHandler, generateNewLink};