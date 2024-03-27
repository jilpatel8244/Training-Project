const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../middleware/auth.middleware');

router.get('/projects/dynamicGrid', authenticateUser, (req, res) => {
    res.render('pages/task1.DynamicGrid.ejs');
})

module.exports = router;