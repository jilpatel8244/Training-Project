const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRouter = require('./routes/auth.routes');
const jsTasksRouter = require('./routes/javascriptTasks.routes');
const cssTasksRouter = require('./routes/cssTasks.routes');
const task8StudentTableExp = require('./routes/all express tasks routes/task8.studentTableExperiment.routes');
const task9AttendanceReport = require('./routes/all express tasks routes/task9.AttendanceReport.routes');
const task10ExamResult = require('./routes/all express tasks routes/task10.ExamResult.routes');
const task12MultipleInputSearch = require('./routes/all express tasks routes/task12.multipleSearch.routes');
const task13DelimeterSearch = require('./routes/all express tasks routes/task13.delimeterSearch.routes');
const task14JsonPlaceholderAPI = require('./routes/all express tasks routes/task14.jsonPlaceholderApi.routes');
const task15TimezoneConverter = require('./routes/all express tasks routes/task15.timezoneConverter.routes');
const task16JobAppForm = require('./routes/all express tasks routes/task16.jobAppForm.routes');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use('/app/v1', authRouter);
app.use('/app/v1', jsTasksRouter);
app.use('/app/v1', cssTasksRouter);
app.use('/app/v1', task8StudentTableExp);
app.use('/app/v1', task9AttendanceReport);
app.use('/app/v1', task10ExamResult);
app.use('/app/v1', task12MultipleInputSearch);
app.use('/app/v1', task13DelimeterSearch);
app.use('/app/v1', task14JsonPlaceholderAPI);
app.use('/app/v1', task15TimezoneConverter);
app.use('/app/v1', task16JobAppForm);



app.listen(process.env.PORT || 3000, (req, res) => {
    console.log("app is running on port 3000");
});