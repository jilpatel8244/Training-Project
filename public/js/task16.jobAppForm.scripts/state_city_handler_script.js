function showState(val) {
    const xhttp = new XMLHttpRequest();
    let state_select = document.getElementById("state");
    let cities_select = document.getElementById("city");
    
    if (!val) {
        // 
        cities_select.innerHTML = `<option value="">-- select city --</option>`;
        xhttp.onload = function() {
            let allfetchedStates = JSON.parse(this.responseText);
            allfetchedStates.forEach((singleState) => {
                let new_option = `<option value="${singleState.id}">${singleState.name}</option>`;
                state_select.innerHTML += new_option;
            });
        }

        xhttp.open("GET", "/app/v1/getAllStatesAndCities");
    } else {
        cities_select.innerHTML = `<option value="">-- select city --</option>`;
        xhttp.onload = function() {
            let allfetchedCities = JSON.parse(this.responseText);
            allfetchedCities.forEach((singleCity) => {
                // console.log(singleCity.id);
                let new_option = `<option value="${singleCity.id}">${singleCity.name}</option>`;
                cities_select.innerHTML += new_option;
            });
        }

        xhttp.open("GET", "/app/v1/getAllStatesAndCities?state_id="+val);
    }
    xhttp.send();
}
showState();