const express = require('express');
const router = express.Router();
const { getResultBasedOnQuery, checkQuery } = require('../../controller/task11.SearchOnQuery.controller');


router.get("/getQueryForm", (req, res) => {
    res.render("pages/task11.searchingOnQuery/task11.queryForm.ejs");
});

router.use("/getQueryResult", checkQuery);

router.get("/getQueryResult", getResultBasedOnQuery);

router.post("/getQueryResult", (req, res) => {
    res.redirect("/app/v1/getQueryResult");
});

module.exports = router;