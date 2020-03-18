var items = ["PlayStation 4", "Monitor BenQ 2411Z", "Keyboard G-Skill K570MX", "Samsung Sound Bar 380P"];
showItemList(items);

function showItemList(arr) {
    let form = "";
    for (let i = 0; i < items.length; i++) {
        form += "<tr class='itemRow'>";
        form += "<td style='text-align: center'>";
        form += i + 1;
        form += "</td>";
        form += "<td>";
        form += "CG_0" + (i + 1);
        form += "</td>";
        form += "<td id='item" + (i + 1) + "'>";
        form += "<input type = 'text' class='displayItem' id='displayItem" + i + "' style='display: none' value='" + items[i] + "'>" + "<span style='display: block' " +
            " id='itemName" + i + "'>" + items[i] + "</span>";
        form += "</td>";
        form += "<td style='text-align: center'>";
        form += "<input type = 'button' id='editItem" + i + "' onclick='editItem(" + i + ")' value='EDIT'>" + "&nbsp&nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp&nbsp"
            + "<button type = 'button' id='delItem" + (i + 1) + "' onclick='deleteItem(" + i + ")'>DELETE</button>";
        form += "</td>";
        form += "</tr>";
    }
    document.getElementById("itemList").innerHTML = form;
}

function addItem() {
    let name = document.getElementById("name").value;
    if (name === "") {
        alert("Please input a name");
    } else {
        items.push(name);
        document.getElementById("name").value = "";
        showItemList(items);
    }
}

function showEditField(index) {
    let showInput = document.getElementById("displayItem" + index);
    let listItem = document.getElementById("itemName" + index);
    console.log(showInput);
    if (showInput.style.display === 'none') {
        showInput.style.display = 'block';
        listItem.style.display = 'none';
    }
}

function saveEditedItem(i) {
    let newName = document.getElementById("displayItem" + i).value;
    console.log(newName);
    items[i] = newName;
    //items = [];
    // for (let i = 0; i < listInput.length; i++) {
    //     items.push(listInput[i].value);
    //     listInput[i].style.display = 'none';
    // }
    showItemList(items);
}

function deleteItem(i) {
    let resultConfirm = confirm("Are you sure?");
    if (resultConfirm === true) {
        let listTableRow = document.getElementsByClassName("itemRow");
        listTableRow[i].remove();
        saveEditedItem();
    }
}

function editItem(index) {
    let buttonName = document.getElementById("editItem" + index);
    if (buttonName.value === "EDIT") {
        showEditField(index);
        buttonName.value = "SAVE";
    } else {
        saveEditedItem(index);
        buttonName.value = "EDIT";
    }
}

