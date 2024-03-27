const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../middleware/auth.middleware');

router.get('/projects/dynamicGrid', authenticateUser, (req, res) => {
    res.render('pages/task1.DynamicGrid.ejs');
})

router.get('/projects/kuKuKube', authenticateUser, (req, res) => {
    res.render('pages/task2.KuKuKube.ejs');
})

router.get('/projects/ticTacToe', authenticateUser, (req, res) => {
    res.render('pages/task3.TicTacToe.ejs');
})

module.exports = router;