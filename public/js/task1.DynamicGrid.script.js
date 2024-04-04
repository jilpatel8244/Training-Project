
function CollAdd(){
    let noOfRows = document.getElementById("member_body").rows.length;

    for (let i = 0; i < noOfRows; i++) {
        let new_td = document.createElement("td");
        new_td.classList.add("box");

        const existing_row = document.getElementById("member_body").rows[i];
        existing_row.appendChild(new_td);
    }
}

function RowAdd(){
    let noOfColumns = document.getElementById("member_body").rows[0].cells.length;

    const new_tr = document.createElement("tr");

    for (let i = 0; i < noOfColumns; i++) {
        let new_td = document.createElement("td");
        new_td.classList.add("box");
        new_tr.appendChild(new_td);
    }

    const tbody = document.getElementById("member_body");

    tbody.appendChild(new_tr);
}

function DeleteRow(){
    let noOfRows = document.getElementById("member_body").rows.length;
    if (noOfRows>2) {
        const lastChild = document.getElementById("member_body").lastChild;
        lastChild.remove();
    }
    else{
        alert("no of rows shold be less than 2");
    }
}

function DeleteCol(){
    let noOfColumns = document.getElementById("member_body").rows[0].cells.length;
    let noOfRows = document.getElementById("member_body").rows.length
    if (noOfColumns>2) {
        for (let i = 0; i < noOfRows; i++) {
            const existingRow = document.getElementById("member_body").rows[i];
            const lastChild = existingRow.lastChild;
            lastChild.remove();
        }
    }
    else{
        alert("no of columns shold be less than 2");
    }
}