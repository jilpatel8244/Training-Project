function basic_details_page_validation(){

    const requiredFields = ['first_name', 'last_name', 'designation', 'email', 'phone_number', 'dob', 'address', 'state', 'city', 'zipcode'];

    const radioFieldsNames = ['gender'];

    const numberFields = ['phone_number', 'zipcode'];

    const strFields = ['first_name', 'last_name', 'designation'];

    let allFields = [...requiredFields, ...numberFields, ...radioFieldsNames,...strFields];

    for (const element of allFields) {
        let error_span = document.getElementById(`${element}_error`);

        if (requiredFields.includes(element) && !document.getElementById(element).value.trim()) {
            error_span.innerHTML = "please enter the value"

            document.getElementById(element).addEventListener("focusout", function () {
                error_span.innerHTML = "";
            })

            return false;
        }
        if (numberFields.includes(element)) {
            let value = document.getElementById(element).value;

            if (element == "phone_number" && (!value.match(/^[0-9]+$/) || value.length != 10)) {
                error_span.innerHTML = "please enter valid phone number";
                document.getElementById(element).addEventListener("focusout", function () {
                    error_span.innerHTML = "";
                })
                return false;
            }
            else if (element == "zipcode" && (!value.match(/^[0-9]+$/) || value.length != 6)) {
                error_span.innerHTML = "please enter valid ZIP CODE";
                document.getElementById(element).addEventListener("focusout", function () {
                    error_span.innerHTML = "";
                })
                return false;
            }
        }
        if (element == "email" && !document.getElementById(element).value.match(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/)) {

            error_span.innerHTML = "please enter valid email";
            
            document.getElementById(element).addEventListener("focusout", function () {
                error_span.innerHTML = "";
            })
            return false;

        }

        if (strFields.includes(element) && !document.getElementById(element).value.match(/^[A-Za-z]+$/)) {
            error_span.innerHTML = "please enter valid string";
            
            document.getElementById(element).addEventListener("focusout", function () {
                error_span.innerHTML = "";
            })
            return false;
        }

        if (radioFieldsNames.includes(element)) {
            let gender = Array.from(document.getElementsByName(element)); 
            if (!gender[0].checked && !gender[1].checked) {
                let radio_span = document.getElementById(`${element}_error`);
                radio_span.innerHTML = "plese select gender";

                
                return false;
            }
        }

    }

    return true;
}

function education_details_page_validation(){
    let ssc_line_complte_fillup, hsc_line_complte_fillup, bachelor_line_complte_fillup, master_line_complte_fillup;
    ssc_line_complte_fillup = education_check_line("ssc");
    hsc_line_complte_fillup = education_check_line("hsc");
    bachelor_line_complte_fillup = education_check_line_1("bachelor");
    master_line_complte_fillup = education_check_line_1("master");

    if(ssc_line_complte_fillup == false || hsc_line_complte_fillup == false || bachelor_line_complte_fillup == false || master_line_complte_fillup == false){
        return false;
    } else{
        return true;  
    }
}

// imptovements : i will combine education_check_line and education_check_line_1 sooner

function education_check_line(sscOrhsc){
    let line;
    
    if (sscOrhsc == "ssc") {
        line = Array.from(document.querySelectorAll(`.scc_line input`));
    }
    else{
        line = Array.from(document.querySelectorAll(`.hsc_line input`));
    }
    line.shift();
    
    let filterddata = line.filter((data) => {
        return !data.value
    })


    if (filterddata.length != 0 && filterddata.length != line.length) {

        filterddata.forEach((ele) => {
            if(!ele.value){
                document.getElementById(`${ele.id}_error`).innerHTML = "plese enter the value";
            }
        })

        console.log("pleses fill all the fields");
        return false;
    }
    else{
        return true;
    }
}

function education_check_line_1(bachelorOrmaster) {
    let line;

    if (bachelorOrmaster == "bachelor") {
        line = Array.from(document.querySelectorAll(`.bachelor_line input`));
    } else{
        line = Array.from(document.querySelectorAll(`.master_line input`));
    }

    let filterddata = line.filter((data) => {
        return !data.value
    })

    if (filterddata.length != 0 && filterddata.length != line.length) {
        
        filterddata.forEach((ele) => {
            if(!ele.value){
                document.getElementById(`${ele.id}_error`).innerHTML = "plese enter the value";
            }
        })

        console.log("pleses fill all the fields");
        return false;
    }
    else{
        return true;
    }
}

function error_span_text_removal(id){
    let ele = document.getElementById(id);
    if(ele.value != ""){
        document.getElementById(`${id}_error`).innerHTML = "";
    }
}

function work_exp_page_validation(){
    let work_experience_line_complte_fillup = work_experience_reference_check_line("work_experience");

    if(work_experience_line_complte_fillup == false){
        return false;
    } else{
        return true;  
    }
}

function reference_page_validation(){
    let reference_contact_line_complte_fillup = work_experience_reference_check_line("reference_contact");

    if(reference_contact_line_complte_fillup == false){
        return false;
    } else{
        return true;  
    }
}

function work_experience_reference_check_line(reference_or_workexperience){
    let allDivs = Array.from(document.querySelectorAll(`.${reference_or_workexperience} div`));

    for (let singleDiv = 0; singleDiv < allDivs.length; singleDiv++) {
        allDivs[singleDiv] = Array.from(allDivs[singleDiv].getElementsByTagName('input'));
        allDivs[singleDiv].pop();
        allDivs[singleDiv].pop();
        
        let filterdData = allDivs[singleDiv].filter((element) => {
            return !element.value;
        })

        console.log(allDivs[singleDiv]);
        console.log(filterdData);

        if ((filterdData.length != 0) && (allDivs[singleDiv].length != filterdData.length)) {

            filterdData.forEach((ele) => {
                if(!ele.value){
                    document.getElementById(`${ele.id}_error`).innerHTML = "plese enter the value";
                }
            });
            console.log("pleses fill all the fields");
            return false;
        }
    }
    return true;
}