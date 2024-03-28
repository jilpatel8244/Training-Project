const connection = require("../config/database");

exports.city_state_loader = (req, res) => {
    if (req.query.state_id == undefined) {
        connection.query("select * from states", (error, result) => {
            if (error) {
                console.log(error);
            }
            else{
                res.send(result);
            }
        })
    }
    else{
        console.log(req.query.state_id);
        connection.query("select * from cities where state_id = ?", [req.query.state_id], (error, result) => {
            if (error) {
                console.log(error);
            }
            else{
                res.send(result);
            }
        })
    }
}

exports.getAllCandidateInfo = (req, res) => {
    connection.query("select * from basic_details", (error, result) => {
        if (error) throw error;

        console.log(result);
        res.send(result);
    })
}

exports.getDataOfSpecificUserHandler = async(req, res) => {
    
    try {
        let obj = await getData(req, res);
        console.log(obj);
        res.send(obj);

    } catch (error) {
        console.log(error);
    }
}


function getData(req, res) {
    let obj = {};

    return new Promise((resolve, reject) => {
        connection.query("select *, DATE_FORMAT(dob, '%Y-%m-%d') as dob from basic_details where id = ?", [req.query.id], (error, result) => {
            if(error){
                return reject(error);
            }

            obj.basic_details = result[0];

        });

        connection.query("select * from education_details where candidate_id = ?", [req.query.id], (error, result) => {
            if(error){
                return reject(error);
            }

            obj.education_details = result;
        });

        connection.query("select *, DATE_FORMAT(work_from, '%Y-%m-%d') as work_from, DATE_FORMAT(work_to, '%Y-%m-%d') as work_to from work_exp where candidate_id = ?", [req.query.id], (error, result) => {
            if(error){
                return reject(error);
            }

            obj.work_exp = result;
            
        });

        connection.query("select * from language_known where candidate_id = ?", [req.query.id], (error, result) => {
            if(error){
                return reject(error);
            }

            obj.language_known = result;
            
        });

        connection.query("select * from technologies_known where candidate_id = ?", [req.query.id], (error, result) => {
            if(error){
                return reject(error);
            }

            obj.technologies_known = result;
            
        });
        
        connection.query("select * from reference_contact where candidate_id = ?", [req.query.id], (error, result) => {
            if(error){
                return reject(error);
            }
            
            obj.reference_contact = result;
            
        });


        connection.query("select * from preferences where candidate_id = ?", [req.query.id], (error, result) => {
            if(error){
                return reject(error);
            }
            
            obj.preferences = result[0];
            
            return resolve(obj);
        });

    })
        
}

exports.insertData = async (req, res) => {
    console.log("inside insert handler");
    console.log(req.body);
    // res.send(req.body);
    
    let new_candidate_inserted_id = await insertBasicDetails(req, res);
    console.log(new_candidate_inserted_id);
    
    await insertEducationDetails(req, res, new_candidate_inserted_id);

    await workExperience(req, res, new_candidate_inserted_id);

    await referenceDetailsEntry(req, res, new_candidate_inserted_id);

    await preferenceDetails(req, res, new_candidate_inserted_id);

    await languageKnown(req, res, new_candidate_inserted_id);

    await technologiesKnown(req, res, new_candidate_inserted_id);

    // res.render("pages/dispalyGrid");
}

insertBasicDetails = (req, res) => {

    let basic_details = [
        req.body.first_name,
        req.body.last_name,
        req.body.designation,
        req.body.gender,
        req.body.address,
        req.body.relationship_status,
        req.body.city,
        req.body.state,
        req.body.phone_number,
        req.body.zipcode,
        req.body.dob,
        req.body.email,
    ];

    return new Promise((resolve, reject) => {
        let sql = `insert into basic_details (first_name, last_name, designation, gender, address, relationship_status, city, state, phone, zip_code, dob, email) values (?,?,?,?,?,?,?,?,?,?,?,?);`
        connection.query(sql, basic_details, (error, results)=>{
            if(error){
              return reject(error);
            }
      
            return resolve(results.insertId);

        });
    });
}

insertEducationDetails = (req, res, new_candidate_inserted_id) =>{
  
    return new Promise((resolve, reject)=>{
  
        var sql = "insert into education_details (candidate_id, education_type, board_name_or_univercity_name, passing_year, passing_percentage) values (?, ?, ?, ?, ?)";
        if(req.body.board_name_or_univercity_name.length != 0){
            req.body.board_name_or_univercity_name.forEach((element, index) => {
                if (element != "") {
                    connection.query(sql, [new_candidate_inserted_id , req.body.education_type[index], element, req.body.passing_year[index], req.body.passing_percentage[index]], (error, results)=>{
                        if(error){
                            console.log(error);
                            return reject(error)  ;
                        } 
                    });
                }
            })
        }
    
        return resolve();
    });
};

workExperience = (req, res, new_candidate_inserted_id) =>{
    var sql = "insert into work_exp (candidate_id, company_name, work_designation, work_from, work_to) values (?, ?, ?, ?, ?);";
      
    return new Promise((resolve, reject)=>{
        if(req.body.company_name.length != 0){
            req.body.company_name.forEach((singleCompanyName, index) => {
                if (req.body.isDeletedWorkExp[index] != "true" && singleCompanyName != "") {
                    connection.query(sql, [new_candidate_inserted_id , singleCompanyName, req.body.company_designation[index] , req.body.company_from[index] , req.body.company_to[index] ], (error, results)=>{
                        if(error){
                            return reject(error);
                        }
                    });
                }
            });
        }
        return resolve();
    });
};
  
referenceDetailsEntry = (req, res, new_candidate_inserted_id) =>{
    var sql = "insert into reference_contact (candidate_id, ref_name, ref_contact, ref_relation) values (?, ?, ?, ?);";
  
    return new Promise((resolve, reject)=>{
        if(req.body.referance_name.length != 0){
            req.body.referance_name.forEach((singleReferanceName, index) => {
                if (req.body.isDeletedReference[index] != "true" && singleReferanceName != "") {
                    connection.query(sql, [new_candidate_inserted_id , singleReferanceName, req.body.referance_phone[index] , req.body.referance_relation[index]], (error, results)=>{
                        if(error){
                            return reject(error);
                        }
                    });
                }
            });
        }
      return resolve();
    });
};

preferenceDetails = (req, res, new_candidate_inserted_id) =>{
    var sql = "insert into preferences (candidate_id, prefered_location, notice_period, department, expected_ctc, current_ctc) values (?, ?, ?, ?, ?, ?);";
      
    return new Promise((resolve, reject)=>{
        connection.query(sql, [new_candidate_inserted_id, req.body.preferd_location, req.body.notice_period || null, req.body.department, req.body.expectedCTC || null, req.body.currentCTC || null], (error, results)=>{
            if(error){
                return reject(error);
            }
    
            return resolve(results);
        });
    });
};

languageKnown = (req, res, new_candidate_inserted_id) =>{
    var sql = "insert into language_known (candidate_id, l_name, l_read, l_write, l_speak) values (?, ?, ?, ?, ?);";
      
    return new Promise((resolve, reject)=>{
      // console.log("language" in req.body);
      if ("language" in req.body) {
        if (typeof req.body.language == "string") {
            let expertise =  "req.body.expertise_" + req.body.language;
            expertise = eval(`${expertise}`);
            connection.query(sql, [new_candidate_inserted_id , req.body.language, (expertise.includes("read")) ? "yes" : "no", (expertise.includes("write")) ? "yes" : "no", (expertise.includes("speak")) ? "yes" : "no"], (error, results)=>{
                if(error){
                    return reject(error);
                }
            });
        }
        else{
            for (let iterator of req.body.language) {
                let data = "req.body.expertise_" + iterator;
                data = (`${eval(data)}`);
                connection.query(sql, [new_candidate_inserted_id , iterator, (data.includes("read")) ? "yes" : "no", (data.includes("write")) ? "yes" : "no", (data.includes("speak")) ? "yes" : "no"], (error, results)=>{
                    if(error){
                        return reject(error);
                    }
                });
            }
        }
      }
      return resolve();
    });
};
  
technologiesKnown = (req, res, new_candidate_inserted_id) =>{
    var sql = "insert into technologies_known (candidate_id, t_name, t_expretise) values (?, ?, ?);";
      
    return new Promise((resolve, reject)=>{
      if("technologies" in req.body){
        if (typeof req.body.technologies == "string") {
            let data = "req.body.technologies_expertise_" + req.body.technologies;
            data = `${eval(data)}`;
            connection.query(sql, [new_candidate_inserted_id , req.body.technologies, data], (error, results)=>{
              if(error){
                return reject(error);
              }
            });
        }
        else{
            for (let iterator of req.body.technologies) {
                let data = "req.body.technologies_expertise_" + iterator;
                data = `${eval(data)}`;
                connection.query(sql, [new_candidate_inserted_id , iterator, data], (error, results)=>{
                if(error){
                    return reject(error);
                }
                });
            }
        }
      }
      return resolve();
    });
};



exports.updateHandler = async(req, res) => {
    console.log(req.body);

    try {
        await basicDetailUpdation(req, res);
        await educationDetailInsertion(req, res);
        await workExperienceUpdate(req, res);
        await languageKnownUpdate(req, res);
        await technologiesKnownUpdate(req, res);
        await referenceDetailsEntryUpdate(req, res);
        await preferenceDetailsUpdate(req, res);



        res.send("updated successfully");
    } catch (error) {
        console.log(error);
    }
}

function basicDetailUpdation(req, res) {
    let basic_details = [
        req.body.first_name,
        req.body.last_name,
        req.body.designation,
        req.body.gender,
        req.body.address,
        req.body.relationship_status,
        req.body.city,
        req.body.state,
        req.body.phone_number,
        req.body.zipcode,
        req.body.dob,
        req.body.email,
      ]
      
      var sql = `update basic_details set first_name = ?, last_name = ?, designation = ?, gender = ?, address = ?, relationship_status = ?, city = ?, state = ?, phone = ?, zip_code = ?, dob = ?, email = ? where id = ${req.body.id_of_the_person_we_need_update}`;
        
      return new Promise((resolve, reject)=>{
        connection.query(sql, basic_details, (error, results)=>{
          if(error){
            return reject(error);
          }
    
          return resolve();
        });
      });
}

function educationDetailInsertion(req, res) {

    return new Promise((resolve, reject)=>{
        let sql = `delete from education_details where candidate_id = ${req.body.id_of_the_person_we_need_update}`
        connection.query(sql, (error, results)=>{
            if(error){
                return reject(error);
            }
            
            var sql = `insert into education_details (candidate_id, education_type, board_name_or_univercity_name, passing_year, passing_percentage) values (?, ?, ?, ?, ?)`;

            req.body.board_name_or_univercity_name.forEach((element, index) => {
                if (element != "") {
                    connection.query(sql, [req.body.id_of_the_person_we_need_update , req.body.education_type[index], element, req.body.passing_year[index], req.body.passing_percentage[index]], (error, results)=>{
                        if(error){
                            console.log(error);
                            return reject(error);
                        } 
                    });
                }
            })

            return resolve();
        });
    });
}

function workExperienceUpdate(req, res) {

    return new Promise((resolve, reject)=>{

        req.body.isDeletedWorkExp.forEach((element, index) => {
            if (element == "false") {
                if (req.body.idWorkExp[index] != "null") {
                    console.log("update here");
                    let sql = `update work_exp set candidate_id = ?, company_name = ?, work_designation = ?, work_from = ?, work_to = ? where id = ${req.body.idWorkExp[index]};`;

                    connection.query(sql, [req.body.id_of_the_person_we_need_update , req.body.company_name[index], req.body.company_designation[index] , req.body.company_from[index] , req.body.company_to[index] ], (error, results)=>{
                        if(error){
                            return reject(error);
                        }
                    });
                }
                else{
                    console.log("insert here");
                    let sql = "insert into work_exp (candidate_id, company_name, work_designation, work_from, work_to) values (?, ?, ?, ?, ?);";

                    connection.query(sql, [req.body.id_of_the_person_we_need_update , req.body.company_name[index], req.body.company_designation[index] , req.body.company_from[index] , req.body.company_to[index] ], (error, results)=>{
                        if(error){
                          return reject(error);
                        }
                    });
                }
            }
            else{
                console.log("delete here");
                let sql = `delete from work_exp where id = ${req.body.idWorkExp[index]};`

                connection.query(sql, (error, results)=>{
                    if(error){
                      return reject(error);
                    }
                });
            }
        });

        return resolve();
    });
}

function referenceDetailsEntryUpdate(req, res) {
    return new Promise((resolve, reject)=>{

        req.body.isDeletedReference.forEach((element, index) => {
            if (element == "false") {
                if (req.body.idReference[index] != "null") {
                    console.log("update here");
                    let sql = `update reference_contact set candidate_id = ?, ref_name = ?, ref_contact = ?, ref_relation = ? where id = ${req.body.idReference[index]};`;

                    connection.query(sql, [req.body.id_of_the_person_we_need_update , req.body.referance_name[index], req.body.referance_phone[index] , req.body.referance_relation[index] ], (error, results)=>{
                        if(error){
                            return reject(error);
                        }
                    });
                }
                else{
                    console.log("insert here");
                    let sql = "insert into reference_contact (candidate_id, ref_name, ref_contact, ref_relation) values (?, ?, ?, ?);";

                    connection.query(sql, [ req.body.id_of_the_person_we_need_update, req.body.referance_name[index], req.body.referance_phone[index] , req.body.referance_relation[index]], (error, results)=>{
                        if(error){
                          return reject(error);
                        }
                    });
                }
            }
            else{
                console.log("delete here");
                let sql = `delete from reference_contact where id = ${req.body.idReference[index]};`

                connection.query(sql, (error, results)=>{
                    if(error){
                      return reject(error);
                    }
                });
            }
        });

        return resolve();
    });
}

languageKnownUpdate = (req, res) =>{
    
    return new Promise((resolve, reject)=>{
        
        let sql = `delete from language_known where candidate_id = ${req.body.id_of_the_person_we_need_update}`;
        console.log(sql);
        connection.query(sql, (error, results)=>{
            if(error){
                return reject(error);
            }

            let sql = "insert into language_known (candidate_id, l_name, l_read, l_write, l_speak) values (?, ?, ?, ?, ?);";
            if ("language" in req.body) {
                if (typeof req.body.language == "string") {
                    let expertise =  "req.body.expertise_" + req.body.language;
                    expertise = eval(`${expertise}`);
                    connection.query(sql, [req.body.id_of_the_person_we_need_update , req.body.language, (expertise.includes("read")) ? "yes" : "no", (expertise.includes("write")) ? "yes" : "no", (expertise.includes("speak")) ? "yes" : "no"], (error, results)=>{
                        if(error){
                            return reject(error);
                        }
                    });
                }
                else{
                    for (let iterator of req.body.language) {
                        let data = "req.body.expertise_" + iterator;
                        data = (`${eval(data)}`);
                        connection.query(sql, [req.body.id_of_the_person_we_need_update , iterator, (data.includes("read")) ? "yes" : "no", (data.includes("write")) ? "yes" : "no", (data.includes("speak")) ? "yes" : "no"], (error, results)=>{
                            if(error){
                                return reject(error);
                            }
                        });
                    }
                }
            }
            return resolve();
        });
    });
};

technologiesKnownUpdate = (req, res) =>{

    return new Promise((resolve, reject)=>{
        let sql = `delete from technologies_known where candidate_id = ${req.body.id_of_the_person_we_need_update}`;
        connection.query(sql, (error, results)=>{
            if(error){
                return reject(error);
            }
            
            let sql = "insert into technologies_known (candidate_id, t_name, t_expretise) values (?, ?, ?);";
            if("technologies" in req.body){
                if (typeof req.body.technologies == "string") {
                let data = "req.body.technologies_expertise_" + req.body.technologies;
                    data = `${eval(data)}`;
                    connection.query(sql, [req.body.id_of_the_person_we_need_update , req.body.technologies, data], (error, results)=>{
                        if(error){
                            return reject(error);
                        }
                    });
                }
                else{
                    for (let iterator of req.body.technologies) {
                        let data = "req.body.technologies_expertise_" + iterator;
                        data = `${eval(data)}`;
                        connection.query(sql, [req.body.id_of_the_person_we_need_update , iterator, data], (error, results)=>{
                            if(error){
                                return reject(error);
                            }
                        });
                    }
                }
            }

            return resolve();
        });
    });
};

function preferenceDetailsUpdate(req, res){
    
    return new Promise((resolve, reject)=>{
        let sql = `update preferences set candidate_id = ?, prefered_location = ?, notice_period = ?, department = ?, expected_ctc = ?, current_ctc = ? where candidate_id = ${req.body.id_of_the_person_we_need_update}`

        connection.query(sql, [req.body.id_of_the_person_we_need_update, req.body.preferd_location, req.body.notice_period || null, req.body.department, req.body.expectedCTC || null, req.body.currentCTC || null], (error, results)=>{
            if(error){
                return reject(error);
            }
    
        });
        return resolve();
    });
};