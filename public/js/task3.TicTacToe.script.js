let element = 'x';
let winnerFlag = false;
let oClicked = [];
let xClicked = [];
let count = 0;

const tdTag = document.getElementsByTagName("td");
for (let i = 0; i < 9; i++) {
    tdTag[i].addEventListener("click", clickHandler);
}

function clickHandler() {
    const clickedCell = document.getElementById(this.id);

    if (element == 'x') {
        clickedCell.innerHTML = "x";
        element = "o";
        xClicked.push(clickedCell.id);
        clickedCell.removeEventListener("click", clickHandler);
        count++;
    }
    else {
        clickedCell.innerHTML = "o";
        element = "x";
        oClicked.push(clickedCell.id);
        clickedCell.removeEventListener("click", clickHandler);
        count++;
    }

    if ((oClicked.includes("1") && oClicked.includes("2") && oClicked.includes("3")) || (oClicked.includes("4") && oClicked.includes("5") && oClicked.includes("6")) || (oClicked.includes("7") && oClicked.includes("8") && oClicked.includes("9")) || (oClicked.includes("1") && oClicked.includes("4") && oClicked.includes("7")) || (oClicked.includes("2") && oClicked.includes("5") && oClicked.includes("8")) || (oClicked.includes("3") && oClicked.includes("6") && oClicked.includes("9")) || (oClicked.includes("1") && oClicked.includes("5") && oClicked.includes("9")) || (oClicked.includes("3") && oClicked.includes("5") && oClicked.includes("7"))) {
        winnerFlag = true;
        document.getElementById("status").innerHTML = "";
        document.getElementsByClassName('container')[0].innerHTML = "winner is o";
        setTimeout(function () { location.reload() }, 2000);
    }
    else if ((xClicked.includes("1") && xClicked.includes("2") && xClicked.includes("3")) || (xClicked.includes("4") && xClicked.includes("5") && xClicked.includes("6")) || (xClicked.includes("7") && xClicked.includes("8") && xClicked.includes("9")) || (xClicked.includes("1") && xClicked.includes("4") && xClicked.includes("7")) || (xClicked.includes("2") && xClicked.includes("5") && xClicked.includes("8")) || (xClicked.includes("3") && xClicked.includes("6") && xClicked.includes("9")) || (xClicked.includes("1") && xClicked.includes("5") && xClicked.includes("9")) || (xClicked.includes("3") && xClicked.includes("5") && xClicked.includes("7"))) {
        winnerFlag = true;
        document.getElementById("status").innerHTML = "";
        document.getElementsByClassName('container')[0].innerHTML = "winner is x";
        setTimeout(function () { location.reload() }, 2000);
    }
    if (!winnerFlag) {
        if (count == 9) {
            document.getElementById("status").innerHTML = "";
            document.getElementsByClassName('container')[0].innerHTML = "match drow";
            setTimeout(function () { location.reload() }, 2000);
        }
    } 
}


