document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();

    let form = document.getElementById("form");
    let form_data = new FormData(form);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/app/v1/insertData", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {
        console.log(this.responseText);
        if (this.status == 200) {
            window.location = '/app/v1/displayFilledCandidates'
        }
    }

    xhr.send(new URLSearchParams(form_data));
})