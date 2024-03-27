const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../middleware/auth.middleware');

router.get('/projects/ehya', authenticateUser, (req, res) => {
    res.render('pages/task5.ehya.ejs');
})

router.get('/projects/awanHoster', authenticateUser, (req, res) => {
    res.render('pages/task6.awanHoster.ejs');
})

module.exports = router;