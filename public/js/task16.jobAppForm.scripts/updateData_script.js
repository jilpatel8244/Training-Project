document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("inside else update");


    let form = document.getElementById("form");
    let form_data = new FormData(form);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/app/v1/updateData", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {
        if (this.status == 200) {
            console.log(this.responseText);
        }
    }

    xhr.send(new URLSearchParams(form_data));
})