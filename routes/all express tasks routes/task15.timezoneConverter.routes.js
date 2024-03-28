const express = require('express');
const router = express.Router();


router.get('/projects/task15/getTimeZone', (req, res) => {
    res.render("pages/task15.timezoneConverter/task15.mainPage.ejs");
});



module.exports = router;