const express = require('express');
const router = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use("/app/v1", router);

app.listen(process.env.PORT || 3000, (req, res) => {
    console.log("app is running on port 3000");
})