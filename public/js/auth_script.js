async function register(event) {
    try {
        event.preventDefault();
        document.getElementById("error_message").innerHTML = "";
    
        let form = document.getElementById("register_form");
        let form_data = new FormData(form);
    
        let json_data = {};
        for(const [key, value] of form_data.entries()){
            json_data[key] = value;
        }
    
        if(validateUser(json_data)){
            let data = await fetch("/app/v1/register", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(json_data), // body data type must match "Content-Type" header
            });
        
            let response = await data.json();
        
            if (response.success) {
                let register_btn = document.getElementById('register_btn');
                let activation_link = document.createElement('a');
                activation_link.setAttribute("href", `/app/v1/activateUser/?activation_code=${response.activation_code}&userInsertedId=${response.userInsertedId}`);
                activation_link.innerHTML = activation_link;
                register_btn.parentElement.replaceChild(activation_link, register_btn);
            } else {
                document.getElementById("error_message").innerHTML = response.message;
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function login(event) {
    try {
        event.preventDefault();
        document.getElementById("error_message").innerHTML = "";
    
        let form = document.getElementById("login_form");
        let form_data = new FormData(form);
    
        let json_data = {};
        for(const [key, value] of form_data.entries()){
            json_data[key] = value;
        }
    
        if(validateUser(json_data)){
            let data =  await fetch("/app/v1/login", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(json_data), // body data type must match "Content-Type" header
            });
        
            let response = await data.json();
        
            if(response.success == true){
                window.location = "/app/v1/homepage";
            } else {
                document.getElementById("error_message").innerHTML = response.message;
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function timeout(event){
    try {
        event.preventDefault();
        document.getElementById("error_message").innerHTML = "";

        let form = document.getElementById("timeout_form");
        let form_data = new FormData(form);

        let json_data = {};
        for(const [key, value] of form_data.entries()){
            json_data[key] = value;
        }

        let data =  await fetch("/app/v1/generateNewLink", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(json_data), // body data type must match "Content-Type" header
        });

        let response = await data.json();

        if(response.success == true){
            let submit_btn = document.getElementById('submit_btn');
            let activation_link = document.createElement('a');
            activation_link.setAttribute("href", `/app/v1/create_confirm_render/?userInsertedId=${response.id}`);
            activation_link.innerHTML = activation_link;
            submit_btn.parentElement.replaceChild(activation_link, submit_btn);

        } else {
            document.getElementById("error_message").innerHTML = response.message;
        }
    } catch (error) {
        console.error(error);
    }
}

async function password(event){
    try {
        event.preventDefault();
        document.getElementById("error_message").innerHTML = "";

        let form = document.getElementById("password_form");
        let form_data = new FormData(form);

        let json_data = {};
        for(const [key, value] of form_data.entries()){
            json_data[key] = value;
        }

        if (validateUser(json_data)) {
            // check both password are same
            if (json_data['create_password'] == json_data['confirm_password']){

                let data =  await fetch("/app/v1/activateUser", {
                        method: "POST", 
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(json_data), // body data type must match "Content-Type" header
                    });

                    let response = await data.json();
                    if(response.success){
                        window.location = "/app/v1/login";
                    }

            } else {
                document.getElementById("error_message").innerHTML = "create password and confirm password are not match";
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function verify_email(event){
    try {
        event.preventDefault();
        document.getElementById("error_message").innerHTML = "";

        let form = document.getElementById("verify_email_form");
        let form_data = new FormData(form);

        let json_data = {};
        for(const [key, value] of form_data.entries()){
            json_data[key] = value;
        }

        if (validateUser(json_data)) {
            let data =  await fetch("/app/v1/verifyEmail", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(json_data), // body data type must match "Content-Type" header
            });
        
            let response = await data.json();
        
            if(response.success == true){
                let submit_btn = document.getElementById('submit_btn');
                let activation_link = document.createElement('a');
                activation_link.setAttribute("href", `/app/v1/forgetPassword/?activation_code=${response.activation_code}&userInsertedId=${response.id}`);
                activation_link.innerHTML = activation_link;
                submit_btn.parentElement.replaceChild(activation_link, submit_btn);
        
            } else {
                document.getElementById("error_message").innerHTML = response.message;
            }   
        }
    } catch (error) {
        console.error(error);
    }
}
    
function validateUser(json_data){
    
    for (const [key, value] of Object.entries(json_data)) {
        if(value == ""){
            document.getElementById("error_message").innerHTML = "please fill " + key;
            return false;
        }
        
        if(key == 'email'){
            var re = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
            if (re.test(value) == false) {
                document.getElementById("error_message").innerHTML = "please enter valid email";
                return false;
            }
        }
    }
    
    return true;
}

let all_input_tags = document.querySelectorAll('input[type="text"]');
all_input_tags.forEach((input_text) => {
    input_text.addEventListener('focusout', function (){
        document.getElementById("error_message").innerHTML = "";
    })
})

let all_password_tags = document.querySelectorAll('input[type="password"]');
all_password_tags.forEach((input_password) => {
    input_password.addEventListener('focusout', function (){
        document.getElementById("error_message").innerHTML = "";
    })
})