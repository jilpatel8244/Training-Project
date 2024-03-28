function add_work_experience(){
    let work_exp = document.getElementsByClassName("work_experience")[0];
    let no_of_lines = work_exp.childElementCount;

    let new_div = document.createElement("div");

    new_div.innerHTML = `<label for="company${no_of_lines+1}_name">Company Name :</label>
    <input type="text" name="company_name[]" id="company${no_of_lines+1}_name" onfocusout="error_span_text_removal(id)">
    <span id="company${no_of_lines+1}_name_error" class="red"></span>

    <label for="company${no_of_lines+1}_designation">Designation :</label>
    <input type="text" name="company_designation[]" id="company${no_of_lines+1}_designation" onfocusout="error_span_text_removal(id)">
    <span id="company${no_of_lines+1}_designation_error" class="red"></span>

    <label for="company${no_of_lines+1}_from">From :</label>
    <input type="date" name="company_from[]" id="company${no_of_lines+1}_from" onfocusout="error_span_text_removal(id)">
    <span id="company${no_of_lines+1}_from_error" class="red"></span>

    <label for="company${no_of_lines+1}_to">To :</label>
    <input type="date" name="company_to[]" id="company${no_of_lines+1}_to" onfocusout="error_span_text_removal(id)"><br>
    <span id="company${no_of_lines+1}_to_error" class="red"></span>

    <button type="button" onclick="remove_line(event)">delete</button>
    <input type="hidden" name="isDeletedWorkExp[]" value="false"> 
    <input type="hidden" name="idWorkExp[]" value="null" id="company${no_of_lines+1}_id">`

    work_exp.appendChild(new_div);

}

function add_reference() {
    let reference_contact = document.getElementsByClassName("reference_contact")[0];
    let no_of_lines = reference_contact.childElementCount;

    let new_div = document.createElement("div");

    new_div.innerHTML = `<label for="referance_name_${no_of_lines+1}">Person Name :</label>
    <input type="text" name="referance_name[]" id="referance_name_${no_of_lines+1}" onfocusout="error_span_text_removal(id)">
    <span id="referance_name_${no_of_lines+1}_error" class="red"></span>

    <label for="referance_phone_${no_of_lines+1}">Phone No. :</label>
    <input type="text" name="referance_phone[]" id="referance_phone_${no_of_lines+1}" onfocusout="error_span_text_removal(id)">
    <span id="referance_phone_${no_of_lines+1}_error" class="red"></span>

    <label for="referance_relation_${no_of_lines+1}">Relation :</label>
    <input type="text" name="referance_relation[]" id="referance_relation_${no_of_lines+1}" onfocusout="error_span_text_removal(id)">
    <span id="referance_relation_${no_of_lines+1}_error" class="red"></span>

    <button type="button" onclick="remove_line(event)">delete</button>
    <input type="hidden" name="isDeletedReference[]" value="false">
    <input type="hidden" name="idReference[]" value="null" id="referance_id_${no_of_lines+1}">`

    reference_contact.appendChild(new_div);
}

function remove_line(event){
    //1 vadhyo hoy to delete na thay handle karvanu baki che
    
    // console.log(event.target.parentElement.parentElement.childElementCount);

    // if (event.target.parentElement.parentElement.childElementCount > 1) {
        event.target.nextElementSibling.value = "true";
        event.target.parentElement.style.display = "none";
    // }
}