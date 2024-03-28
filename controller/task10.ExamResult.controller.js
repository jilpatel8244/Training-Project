const connection = require('../config/database');
require('dotenv').config();
var NO_OF_RECORDS_PER_PAGE = Number(process.env.NO_OF_RECORDS_PER_PAGE);
var CURRENT_PAGE = Number(process.env.CURRENT_PAGE);


exports.getResult = (req, res) => {


    CURRENT_PAGE = Number(req.query.page_no) || 1;
    var pageEnd = Math.ceil(200 / NO_OF_RECORDS_PER_PAGE);
    let offset_value = (CURRENT_PAGE * NO_OF_RECORDS_PER_PAGE) - NO_OF_RECORDS_PER_PAGE;



    let sql = `select s.s_id, s.first_name, s.last_name, 
                sum(case when e.type_id = 1 then e.practical_obtain_marks else 0 end) as prelim_practical_marks, 
                sum(case when e.type_id = 1 then e.theory_obtain_marks else 0 end) as prelim_theory_marks, 
                sum(case when e.type_id = 2 then e.practical_obtain_marks else 0 end) as terminal_practical_marks, 
                sum(case when e.type_id = 2 then  e.theory_obtain_marks else 0 end) as terminal_theory_marks,
                sum(case when e.type_id = 3 then e.practical_obtain_marks else 0 end) as final_practical_marks, 
                sum(case when e.type_id = 3 then  e.theory_obtain_marks else 0 end) as final_theory_marks
                from exam_result as e, student_master_for_task9_attendance_report as s where s.s_id = e.s_id group by s_id limit ? offset ?;`

    connection.query(sql, [NO_OF_RECORDS_PER_PAGE, offset_value], function (err, result) {
        if (err) throw err;

        res.render("pages/task10.ExamResult.ejs",{
            data: result,
            current_page: CURRENT_PAGE,
            pageEnd: pageEnd
        })
    });

}

exports.getMoreInfo = (req, res) => {

    let s_id = req.query.s_id;

    let sql = `select subjects.sub_id, subjects.name, s.first_name, s.last_name, 
        max(case when e.type_id = 1 then e.practical_total_marks else 0 end) as prelim_practical_total_marks, 
        sum(case when e.type_id = 1 then e.practical_obtain_marks else 0 end) as prelim_practical_marks, 
        max(case when e.type_id = 1 then e.theory_total_marks else 0 end) as prelim_theory_total_marks, 
        sum(case when e.type_id = 1 then e.theory_obtain_marks else 0 end) as prelim_theory_marks, 
        
        max(case when e.type_id = 2 then e.practical_total_marks else 0 end) as terminal_practical_total_marks,  
        sum(case when e.type_id = 2 then e.practical_obtain_marks else 0 end) as terminal_practical_marks, 
        max(case when e.type_id = 2 then e.theory_total_marks else 0 end) as terminal_theory_total_marks, 
        sum(case when e.type_id = 2 then  e.theory_obtain_marks else 0 end) as terminal_theory_marks,
        
        max(case when e.type_id = 3 then e.practical_total_marks else 0 end) as final_practical_total_marks, 
        sum(case when e.type_id = 3 then e.practical_obtain_marks else 0 end) as final_practical_marks, 
        max(case when e.type_id = 3 then e.theory_total_marks else 0 end) as final_theory_total_marks, 
        sum(case when e.type_id = 3 then  e.theory_obtain_marks else 0 end) as final_theory_marks
        
        from exam_result as e, student_master_for_task9_attendance_report as s, subjects where s.s_id = e.s_id && e.sub_id = subjects.sub_id && s.s_id = ${s_id} group by subjects.sub_id;`;

    connection.query(sql, function (err, result){
        if (err) throw err;

        res.render("pages/task10.MoreDetails.ejs",{
            data: result,
        })
    })
}