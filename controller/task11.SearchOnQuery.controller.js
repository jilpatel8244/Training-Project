const connection = require('../config/database');
require('dotenv').config();
var count;
var pageEnd;
var offset_value;
var NO_OF_RECORDS_PER_PAGE = Number(process.env.NO_OF_RECORDS_PER_PAGE);
var CURRENT_PAGE = Number(process.env.CURRENT_PAGE);
var sql;
var orderBy_field;
var orderBy_type = 'asc';


exports.checkQuery = (req, res, next) => {
    sql = req.body.sql || sql;

    if (sql == undefined) {
        res.redirect("/app/v1/getQueryForm");
    }
    
    sql = sql.toLowerCase();
    if (sql.includes("insert") || sql.includes("delete") || sql.includes("update") || sql.includes("drop") || sql.includes("alter")) {
        res.render("pages/task11.searchingOnQuery/task11.falseInput.ejs");
    }
    
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.render("pages/task11.searchingOnQuery/task11.errorPage.ejs", { err: err, message: "database error", success: "false" });
        } else {
            count = result.length;
            // IF we are using post request : use req.body instead
            CURRENT_PAGE = Number(req.query.page_no) || 1;
            pageEnd = Math.ceil(count / NO_OF_RECORDS_PER_PAGE);
            offset_value = (CURRENT_PAGE * NO_OF_RECORDS_PER_PAGE) - NO_OF_RECORDS_PER_PAGE;

            next();
        }
    });
}


exports.getResultBasedOnQuery = (req, res) => {

    orderBy_field = req.query.orderBy_field || undefined;
    if (req.query.orderBy_type == 'asc') {
        orderBy_type = 'desc'
    } else {
        orderBy_type = 'asc'
    }


    if (orderBy_field == undefined || orderBy_type == undefined) {
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
                orderBy_type: orderBy_type
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
                orderBy_type: orderBy_type
            });
        })
    }


}