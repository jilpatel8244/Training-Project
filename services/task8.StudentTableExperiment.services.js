const connection = require("../config/database");

exports.studentList = (req, res) => {
    try {
        return new Promise((resolve, reject) => {
            connection.query(`select * from student_master`, function (err, result) {
                if (err) return reject(err);
    
                resolve();
                res.render("pages/task8.StudentTableExperiment.ejs", {
                    data: result
                });
            });
        })
    } catch (error) {
        const err = new CustomError(error.message, 500);
        next(err);
    }
}

exports.getAllStudentsBasedOnOrderBy = (req, res, field_value, NO_OF_RECORDS_PER_PAGE, offset_value, CURRENT_PAGE, pageEnd) => {
    try {
        return new Promise((resolve, reject) => {
            connection.query(`select * from student_master order by ${field_value} limit ? offset ?`, [NO_OF_RECORDS_PER_PAGE, offset_value], function (err, result) {
                if (err) return reject(err);
    
                resolve();
                res.render("pages/task8.StudentTableExperiment.ejs", {
                    data: result,
                    current_page: CURRENT_PAGE,
                    pageEnd: pageEnd
                });
            });
        })
    } catch (error) {
        const err = new CustomError(error.message, 500);
        next(err);
    }
}