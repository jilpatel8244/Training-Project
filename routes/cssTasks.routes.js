const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../middleware/auth.middleware');

router.get('/projects/ehya', authenticateUser, (req, res) => {
    res.render('pages/task5.ehya.ejs');
})

module.exports = router;