const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../../middleware/auth.middleware')

const {city_state_loader, getAllCandidateInfo, getDataOfSpecificUserHandler, insertData, updateHandler} = require('../../controller/task16.jobAppForm.controller');

router.get('/jobAppForm',authenticateUser, (req, res) => {
    res.render('pages/task16.jobAppForm/task16.jobAppForm.ejs', {id: req.query.id || null});
});

router.post('/insertData',authenticateUser, insertData);

router.get('/getAllStatesAndCities', city_state_loader);

router.get('/displayFilledCandidates',authenticateUser, (req, res) => {
    res.render('pages/task16.jobAppForm/task16.displayGrid.ejs');
})

router.get('/getAllCandidateInfo',authenticateUser, getAllCandidateInfo);

router.get('/getDataOfSpecificUser',authenticateUser, getDataOfSpecificUserHandler)

router.post('/updateData',authenticateUser, updateHandler);


module.exports = router;