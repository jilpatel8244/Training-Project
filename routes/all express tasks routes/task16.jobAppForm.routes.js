const express = require('express');
const router = express.Router();
const {city_state_loader, getAllCandidateInfo, getDataOfSpecificUserHandler, insertData, updateHandler} = require('../../controller/task16.jobAppForm.controller');

router.get('/jobAppForm', (req, res) => {
    res.render('pages/task16.jobAppForm/task16.jobAppForm.ejs', {id: req.query.id || null});
});

router.post('/insertData', insertData);

router.get('/getAllStatesAndCities', city_state_loader);

router.get('/displayFilledCandidates', (req, res) => {
    res.render('pages/task16.jobAppForm/task16.displayGrid.ejs');
})

router.get('/getAllCandidateInfo', getAllCandidateInfo);

router.get('/getDataOfSpecificUser', getDataOfSpecificUserHandler)

router.post('/updateData', updateHandler);


module.exports = router;