require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {
    let token = req.cookies.token || req.body.token;

    if(token){
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.body = decode;
            next();
        } catch (error) {
            res.render('pages/login_page');
        }
    } else {
        res.render('pages/login_page');
    }
}