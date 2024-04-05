const connection = require('../config/database');
require('dotenv').config();
let count;
let pageEnd;
let offset_value;
let NO_OF_RECORDS_PER_PAGE = Number(process.env.NO_OF_RECORDS_PER_PAGE);
let CURRENT_PAGE = Number(process.env.CURRENT_PAGE);
let sql;
let orderBy_field;
let orderBy_type;


exports.checkQuery = (req, res, next) => {
    sql = req.body.sql || sql || "";
    
    if (sql.includes("insert") || sql.includes("delete") || sql.includes("update") || sql.includes("drop") || sql.includes("alter") || sql.includes("order") || sql.includes("limit")) {
        res.render("pages/task11.searchingOnQuery/task11.falseInput.ejs");
    }
    
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.render("pages/task11.searchingOnQuery/task11.errorPage.ejs", { err: err, message: "database error", success: "false" });
        } else {
            count = result.length;
            CURRENT_PAGE = Number(req.query.page_no) || 1;
            pageEnd = Math.ceil(count / NO_OF_RECORDS_PER_PAGE);

            // used when someone manipulate page number from query directly
            if (Number(req.query.page_no) > pageEnd) {
                CURRENT_PAGE = pageEnd;
            }
            else if(Number(req.query.page_no) < 1){
                CURRENT_PAGE = 1;
            }

            offset_value = (CURRENT_PAGE * NO_OF_RECORDS_PER_PAGE) - NO_OF_RECORDS_PER_PAGE;

            next();
        }
    });
}


exports.getResultBasedOnQuery = (req, res) => {

    orderBy_field = req.query.orderBy_field;
    orderBy_type = req.query.orderBy_type || 'asc';

    if (!orderBy_field) {
        connection.query(`${sql} limit ? offset ?`, [NO_OF_RECORDS_PER_PAGE, offset_value], function (err, result, fields) {
            if (err) {
                console.log(err);
                res.render("pages/task11.searchingOnQuery/task11.errorPage.ejs", { err: err, message: "database error", success: "false" });
            }

            res.render("pages/task11.searchingOnQuery/task11.displayGrid.ejs", {
                data: result,
                fields: fields,
                current_page: CURRENT_PAGE,
                pageEnd: pageEnd,
                orderBy_field: orderBy_field,
                orderBy_type: orderBy_type,
                sql: sql
            });
        })
    }
    else {
        connection.query(`${sql} order by ${orderBy_field} ${orderBy_type} limit ? offset ? `, [NO_OF_RECORDS_PER_PAGE, offset_value], function (err, result, fields) {
            if (err) {
                console.log(err);
                res.render("pages/task11.searchingOnQuery/task11.errorPage.ejs", { err: err, message: "database error", success: "false" });
            }


            res.render("pages/task11.searchingOnQuery/task11.displayGrid.ejs", {
                data: result,
                fields: fields,
                current_page: CURRENT_PAGE,
                pageEnd: pageEnd,
                orderBy_field: orderBy_field,
                orderBy_type: orderBy_type,
                sql: sql
            });
        })
    }


}