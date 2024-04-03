function fetchAllData() {
    const searchParams = new URLSearchParams(window.location.search);
    // console.log(searchParams.get('id'));
    
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/app/v1/getDataOfSpecificUser/?id=${searchParams.get('id')}`, true);

    xhr.onload = async function() {
        if (this.status == 200) {
            let obtainedData = JSON.parse(this.responseText);

            // basic details
            for (const iterator in obtainedData.basic_details) {
                let element = document.getElementById(iterator);
                if(element != null && iterator != 'state' && iterator != 'city'){
                    element.value = obtainedData.basic_details[iterator];
                }
            }

            document.getElementById("phone_number").value = obtainedData.basic_details['phone'];
            document.getElementById("zipcode").value = obtainedData.basic_details['zip_code'];
            document.getElementById(obtainedData.basic_details['gender']).checked = true;

            // for work-experience
            obtainedData.work_exp.forEach((element, index) => {
                if (index != obtainedData.work_exp.length-1) {
                    add_work_experience();
                }

                document.getElementById(`company${index+1}_name`).value = element['company_name'];
                document.getElementById(`company${index+1}_designation`).value = element['work_designation'];
                document.getElementById(`company${index+1}_from`).value = element['work_from'];
                document.getElementById(`company${index+1}_to`).value = element['work_to'];
                document.getElementById(`company${index+1}_id`).value = element['id'];
            });

            // for reference
            obtainedData.reference_contact.forEach((element, index) => {
                if (index != obtainedData.reference_contact.length-1) {
                    add_reference();
                }

                document.getElementById(`referance_name_${index+1}`).value = element['ref_name'];
                document.getElementById(`referance_phone_${index+1}`).value = element['ref_contact'];
                document.getElementById(`referance_relation_${index+1}`).value = element['ref_relation'];
                document.getElementById(`referance_id_${index+1}`).value = element['id'];
            });

            // for preference
            document.getElementById('department').value = obtainedData.preferences['department'];
            document.getElementById('preferd_location').value = obtainedData.preferences['prefered_location'];
            document.getElementById('notice_period').value = obtainedData.preferences['notice_period'];
            document.getElementById('expectedCTC').value = obtainedData.preferences['expected_ctc'];
            document.getElementById('currentCTC').value = obtainedData.preferences['current_ctc'];

            // for education_details
            obtainedData.education_details.forEach((element, index) => {
                let board = document.getElementsByName('board_name_or_univercity_name[]');
                let pass_year = document.getElementsByName('passing_year[]');
                let percentage = document.getElementsByName('passing_percentage[]');
                let edu_type = document.getElementsByName('education_type[]');

                board[index].value = element.board_name_or_univercity_name;
                pass_year[index].value = element.passing_year;
                percentage[index].value = element.passing_percentage;
                edu_type[index].value = element.education_type;
            });


            //language known

            obtainedData.language_known.forEach((element, index) => {
                let ele = document.getElementsByName("language");
                if(element.l_name == ele[index].value){
                    ele[index].checked = true;

                    document.getElementById(`expertise_read_${ele[index].value}`).disabled = false;
                    document.getElementById(`expertise_write_${ele[index].value}`).disabled = false;
                    document.getElementById(`expertise_speak_${ele[index].value}`).disabled = false;

                    if(element.l_read == "yes"){
                        document.getElementById(`expertise_read_${ele[index].value}`).checked = true;
                    }
                    if(element.l_write == "yes"){
                        document.getElementById(`expertise_write_${ele[index].value}`).checked = true;
                    }
                    if(element.l_speak == "yes"){
                        document.getElementById(`expertise_speak_${ele[index].value}`).checked = true;
                    }
                }
            });


            // technologies known

            obtainedData.technologies_known.forEach((element, index) => {
                let ele = document.getElementsByName("technologies");
                if(element.t_name == ele[index].value){
                    ele[index].checked = true;

                    document.getElementById(`technologies_expertise_${ele[index].value}_b`).disabled = false;
                    document.getElementById(`technologies_expertise_${ele[index].value}_m`).disabled = false;
                    document.getElementById(`technologies_expertise_${ele[index].value}_e`).disabled = false;

                    if(element.t_expretise == "Beginer"){
                        document.getElementById(`technologies_expertise_${ele[index].value}_b`).checked = true;
                    }
                    if(element.t_expretise == "Mideator"){
                        document.getElementById(`technologies_expertise_${ele[index].value}_m`).checked = true;
                    }
                    if(element.t_expretise == "Expert"){
                        document.getElementById(`technologies_expertise_${ele[index].value}_e`).checked = true;
                    }
                }
            })


            // for states and cities


            let state = document.getElementById("state");
            state.value = obtainedData.basic_details['state'];
            showState(obtainedData.basic_details['state']);

        }
    }

    xhr.send();
}

fetchAllData();
