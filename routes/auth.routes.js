const express = require('express');
const router = express.Router();
const {register_handler, check_timeout_and_then_render_password_page, activate_user, verifyEmail, loginHandler, forgetPasswordHandler, generateNewLink} = require('../controller/auth.controller');
const {authenticateUser} = require('../middleware/auth.middleware');


// information route -> that gives information of all the routes and project
router.get('/', (req, res) => {
    let info = {
        route: 'route path',
        register: '/app/v1/register',
        login: '/app/v1/login',
        homepage: '/app/v1/homepage'
    };
    res.send(info);
});



// register route
router.get('/register', (req, res) => {
    res.render("pages/registration_page");
});
router.post('/register', register_handler);



// check activation code and if !timeout then render create-pass confirm-pass page  otherwise render timeout page 
router.get('/activateUser', check_timeout_and_then_render_password_page);
// hash the pass and then update it in database
router.post('/activateUser', activate_user);



// login route
router.get('/login', (req, res) => {
    res.render('pages/login_page.ejs');
});

router.post('/login', loginHandler);



// for forget password 
router.get('/verifyEmail', (req, res) => {
    res.render('pages/verify_email');
});

router.post('/verifyEmail', verifyEmail);

router.get('/forgetPassword', forgetPasswordHandler);



// for timeout 
router.post('/generateNewLink', generateNewLink);

router.get('/create_confirm_render', (req, res) => {
    res.render('pages/password_page', {
        userInsertedId: req.query.userInsertedId
    });
})



// protected route
router.get('/homepage', authenticateUser, (req, res) => {
    res.render("pages/home_page");
});



// logout
router.get('/logout', (req, res) => {
    res.clearCookie('token').render('pages/login_page');
})

module.exports = router;