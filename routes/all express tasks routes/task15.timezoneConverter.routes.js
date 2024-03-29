const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../../middleware/auth.middleware');


router.get('/projects/task15/getTimeZone', authenticateUser, (req, res) => {
    res.render("pages/task15.timezoneConverter/task15.mainPage.ejs");
});


module.exports = router;