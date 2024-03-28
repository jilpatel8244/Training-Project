const connection = require('../config/database');
require('dotenv').config();

var sql;
var message = true;

function gridHandler(req, res) {
    sql = req.body.sql || "";
    sql = sql.replace(/\s/g, '');

    if (sql == "") {
        message = true;
    }
    // else if(!sql.includes("_") || !sql.includes("^") || !sql.includes("$") || !sql.includes(":") || !sql.includes("{") || !sql.includes("}") || !sql.includes("!")){
    //     message = false;
    // }

    var first_name = [];
    var last_name = [];
    var email = [];
    var city = [];
    var s_id = [];
    var gender = [];


    function postCalc(i){
        let post;
        for (let j = i + 1; j < sql.length; j++) {
            if (sql[j] == '_' || sql[j] == '^' || sql[j] == '$' || sql[j] == ':' || sql[j] == '!' || sql[j] == '{' || sql[j] == '}' || j == sql.length) {
                post = j;
                break;
            }
        }
        return post;
    }

    for (let i = 0; i < sql.length; i++) {

        var pre = i;
        var post;

        switch (sql[i]) {
            case '_':
                post = postCalc(i)
                var val = sql.slice(pre + 1, post);
                first_name.push(val);
                break;

            case '^':
                post = postCalc(i)
                var val = sql.slice(pre + 1, post);
                last_name.push(val);
                break;

            case '$':
                post = postCalc(i)
                var val = sql.slice(pre + 1, post);
                email.push(val);
                break;

            case ':':
                post = postCalc(i)
                var val = sql.slice(pre + 1, post);
                city.push(val);
                break;

            case '{':
                post = postCalc(i)
                var val = sql.slice(pre + 1, post);
                s_id.push(val);
                break;

            case '}':
                post = postCalc(i)
                var val = sql.slice(pre + 1, post);
                gender.push(val);
                break;

            default:
                break;
        }

    }


    function finalString(arr, firld_name) {
        if (arr.length == 0) {
            let tempResult = `${firld_name} like '%' `;
            return tempResult;
        }

        let tempResult = `${firld_name} like '${arr[0]}%' `;

        if (arr.length > 1) {
            for (let i = 1; i < arr.length; i++) {
                tempResult = tempResult + `or ${firld_name} like '${arr[i]}%'`
            }
        }
        return tempResult;
    }


    var first_name_str = finalString(first_name, "first_name");
    var last_name_str = finalString(last_name, "last_name");
    var email_str = finalString(email, "email");
    var city_str = finalString(city, "city");
    var s_id_str = finalString(s_id, "s_id");
    var gender_str = finalString(gender, "gender");

    let q = `select * from student_master_for_task9_attendance_report where (${first_name_str}) and (${last_name_str}) and (${email_str}) and (${city_str}) and (${s_id_str}) and (${gender_str})`;
    connection.query(q, (err, result) => {
        if (err) {
            console.log(err);
            res.render("pages/task13.errorPage.ejs", { err: err, message: "database error", success: "false" });
        }
        else {
            res.render("pages/task13.studentData.ejs", {
                data: result,
                sql: sql,
                message: message
            });
        }
    })


}

module.exports = gridHandler;