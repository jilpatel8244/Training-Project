let score = 0;
let count = 20;

function timerOn() {
    score = 0;
    document.getElementById("score").innerHTML = score;
    const timer = setInterval(function(){
        count--;
        if(count <= 0){
            clearInterval(timer);
            document.getElementsByClassName("container")[0].innerHTML = "game over your score is : " + score;

            setInterval(function() {
                location.reload()
            }, 2000);
        }
        else{
            document.getElementById("seconds").innerHTML = count;
        }
    },1000);
}

function selectRand() {
    document.getElementById("score").innerHTML = score;
    document.getElementById("seconds").innerHTML = count;
    
    let no_of_rows = document.getElementById("tbody").rows.length;

    let rand1 = Math.floor(Math.random()*no_of_rows);
    let rand2 = Math.floor(Math.random()*no_of_rows);

    let cell = document.getElementById("tbody").rows[rand1].cells[rand2];

    cell.addEventListener("click", startProcess);
    cell.style.opacity = "0.5";
}

function startProcess(event){

    if(event.target.style.opacity === "0.5"){
        score = score + 1;    
    }

    document.getElementById("score").innerHTML = score;

    addRowCol();
    randomColor();
    removeEvent();
    selectRand();
}

function removeEvent() {
    let tds = document.getElementsByTagName("td");
    for (let i = 0; i < tds.length; i++) {
        tds[i].removeEventListener("click", startProcess);
        tds[i].style.opacity = "1";
    }
}


function addRowCol(){
    //addRow logic
    let noOfColumns = document.getElementById("tbody").rows[0].cells.length;

    const new_tr = document.createElement("tr");

    for (let i = 0; i < noOfColumns; i++) {
        let new_td = document.createElement("td");
        new_td.classList.add("red");
        new_td.classList.add("box");
        new_tr.appendChild(new_td);
    }

    const tbody = document.getElementById("tbody");

    tbody.appendChild(new_tr);

    //addCol logic
    let noOfRows = document.getElementById("tbody").rows.length;

    for (let i = 0; i < noOfRows; i++) {
        let new_td = document.createElement("td");
        new_td.classList.add("red");
        new_td.classList.add("box");

        const existing_row = document.getElementById("tbody").rows[i];
        existing_row.appendChild(new_td);
    }
}

function randomColor(){
    let randColor = "#" + Math.random().toString(16).slice(-6);
    let tds = document.getElementsByTagName("td");
    for (let i = 0; i < tds.length; i++) {
        tds[i].style.backgroundColor = randColor;        
    }
}