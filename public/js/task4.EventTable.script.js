function onloadHandler() {
    alert("page is loaded");
}

//print before and after event handlers

function onafterprintHandler() {
    document.getElementById("1").innerHTML = "This document is now being printed";
}
function onbeforeprintHandler() {
    document.getElementById("1").innerHTML = "You are about to print this document!";
}

// animation event handler
function eventHandler() {
    var td2 = document.getElementById("mydiv2");
    td2.style.animation = "mymove 4s 2";

    td2.addEventListener("animationstart", function () {
        this.innerHTML = "The animation has started";
        this.style.backgroundColor = "pink";
    });
    td2.addEventListener("animationiteration", function () {
        this.innerHTML = "The animation was played again";
        this.style.backgroundColor = "lightblue";
    });
    td2.addEventListener("animationend", function () {
        this.innerHTML = "The animation has completed";
        this.style.backgroundColor = "lightgray";
    });
}

//onbeforeunloadHandler
function onbeforeunloadHandler() {
    document.getElementById("3").innerHTML = "you are trying to leave this page"
}

//focus handler

function onblurHandler() {
    let x = document.getElementById("fname");
    x.value = x.value.toUpperCase();
    x.style.opacity = 0.5;
}

function onfocusHandler() {
    let x = document.getElementById("lname");
    x.style.backgroundColor = "yellow";
}

function onfocusinHandler(x) {
    x.style.backgroundColor = "yellow";
}

function onfocusoutHandler(x) {
    x.style.backgroundColor = "white";
    x.placeholder = "onfocusout";
}


//select handler
function selectHandler() {
    var x = document.getElementById("mySelect").value;
    alert("You selected: " + x);
}

//context menu
function ondblclickHandler(x) {
    x.innerHTML = "ok";
}


function mouseDown() {
    document.getElementById("myP").style.color = "red";
}

function mouseUp() {
    document.getElementById("myP").style.color = "blue";
}

function onmouseoverHandler() {
    let x = document.getElementById("ok");
    x.style.color = "blue";
}

function onmouseleaveHandler() {
    let x = document.getElementById("ok");
    x.style.color = "black";
}

function myFunction(e) {
    let x = e.clientX;
    let y = e.clientY;
    let coor = "Coordinates: (" + x + "," + y + ")";
    document.getElementById("demo").innerHTML = coor;
}

function clearCoor() {
    document.getElementById("demo").innerHTML = "onmousemove and onmouseout";
}

function oncopyHandler() {
    document.getElementById("copy").innerHTML = "you copied the text";
}

function oncutHandler() {
    document.getElementById("cut").innerHTML = "you cut the text";
}

function onerrorHandler() {
    alert("image not found");
}

function openFullscreen() {
    var elem = document.documentElement;

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }
    else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
}

function oninputHandler() {
    let x = document.getElementById("myInput").value;
    document.getElementById("okok").innerHTML = "you wrote : " + x;
}

function onkeydownHandler() {
    document.getElementById("keyText").innerHTML = "key is presed";
}

function keydownFunction() {
    document.getElementById("keyDownUp").style.backgroundColor = "red";
}

function keyupFunction() {
    document.getElementById("keyDownUp").style.backgroundColor = "green";
}

function wheelHandler() {
    document.getElementById("wheelId").style.color = "red";
}

function myFunctionForToggle() {
    alert("The ontoggle event occured");
}

function onresizeHandler() {
    let w = window.outerWidth;
    let h = window.outerHeight;
    let txt = "Window size: width=" + w + ", height=" + h;
    alert(txt);
}

function onresetHandler() {
    alert("form was reset");
}

function onsubmitHandler() {
    alert("form was submited");
}