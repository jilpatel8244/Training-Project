const connection = require('../config/database');
const CustomError = require('../helper/CustomError');
require('dotenv').config();

let sql;
let isValidInput = true;

function gridHandler(req, res, next) {
    try {
        sql = req.body.sql || "";

        // inorder to remove spaces from query
        sql = sql.replace(/\s/g, '');

        // check if string doesn't contain any specified character then change the isValidInput flag to false  
        if(sql != '' && (!sql.includes('_') && !sql.includes('^') && !sql.includes('$') && !sql.includes(':') && !sql.includes('!') && !sql.includes('{') && !sql.includes('}'))) {
            isValidInput = false;
        } else {
            isValidInput = true;
        }

        let first_name = [];
        let last_name = [];
        let email = [];
        let city = [];
        let s_id = [];
        let gender = [];


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

        // find first(pre) and last(post) index of each string specified in sql and store it in respective array
        for (let i = 0; i < sql.length; i++) {

            let pre = i+1;
            let post;
            let val;

            switch (sql[i]) {
                case '_':
                    post = postCalc(i)
                    val = sql.slice(pre, post);
                    first_name.push(val);
                    break;

                case '^':
                    post = postCalc(i)
                    val = sql.slice(pre, post);
                    last_name.push(val);
                    break;

                case '$':
                    post = postCalc(i)
                    val = sql.slice(pre, post);
                    email.push(val);
                    break;

                case ':':
                    post = postCalc(i)
                    val = sql.slice(pre, post);
                    city.push(val);
                    break;

                case '{':
                    post = postCalc(i)
                    val = sql.slice(pre, post);
                    s_id.push(val);
                    break;

                case '}':
                    post = postCalc(i)
                    val = sql.slice(pre, post);
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


        let first_name_str = finalString(first_name, "first_name");
        let last_name_str = finalString(last_name, "last_name");
        let email_str = finalString(email, "email");
        let city_str = finalString(city, "city");
        let s_id_str = finalString(s_id, "s_id");
        let gender_str = finalString(gender, "gender");

        let sql_query = `select * from student_master_for_task9_attendance_report where (${first_name_str}) and (${last_name_str}) and (${email_str}) and (${city_str}) and (${s_id_str}) and (${gender_str})`;
        connection.query(sql_query, (err, result) => {
            try {
                if (err) {
                    throw err
                }
                else {
                    res.render("pages/task13.studentData.ejs", {
                        data: result,
                        isValidInput: isValidInput,
                        sql: sql
                    });
                }
            } catch (error) {
                const err = new CustomError(error.message, 500);
                next(err);
            }
        })

    } catch (error) {
        const err = new CustomError("something went wrong in delimeter-search : \n" + error.message, 500);
        next(err);
    }
}

module.exports = gridHandler;