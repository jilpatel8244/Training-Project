const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../../middleware/auth.middleware');



router.get("/projects/task14/getAllPosts", authenticateUser, (req, res)=> {
    res.render("pages/task14.jsonPlaceholderAPI/task14.allPosts.ejs");
})

router.get("/getSinglePostDetails", authenticateUser, (req, res)=> {
    res.render("pages/task14.jsonPlaceholderAPI/task14.singlePost.ejs", {id : req.query.id});
})

module.exports = router;