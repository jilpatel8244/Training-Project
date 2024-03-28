const express = require('express');
const router = express.Router();



router.get("/projects/task14/getAllPosts", (req, res)=> {
    res.render("pages/task14.jsonPlaceholderAPI/task14.allPosts.ejs");
})

router.get("/getSinglePostDetails", (req, res)=> {
    if (req.query.id <= 100 && req.query.id > 0) {
        res.render("pages/task14.jsonPlaceholderAPI/task14.singlePost.ejs", {id : req.query.id});
    } else{
        res.send("sorry mention id is not valid");
    }
})

module.exports = router;