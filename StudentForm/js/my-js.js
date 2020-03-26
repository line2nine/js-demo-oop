const MAX = 15;
var form = "";

function Student(orderList, studentID, firstName, lastName, dateBirth, fromCountry, editStudent, delStudent) {
    this.orderList = orderList;
    this.studentID = studentID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateBirth = dateBirth;
    this.fromCountry = fromCountry;
    this.editStudent = editStudent;
    this.delStudent = delStudent;

     this.showList = function (index) {
        form += "<tr class='studentRow'>";
        form += "<td>";
        form += this.orderList;
        form += "</td>";
        form += "<td>";
        form += this.studentID;
        form += "</td>";
        form += "<td>";
        form += `<input type="text" id="displayLastName${index}" style="display: none" value="${this.lastName}">` +
            `<span style="display: block" id="studentLastName${index}"> ${this.lastName}</span>` +
            `<input type="text" id="displayFirstName${index}" style="display: none" value="${this.firstName}">` +
            `<span style="display: block" id="studentFirstName${index}"> ${this.firstName}</span>`;
        form += "</td>";
        form += "<td>";
        form += this.dateBirth;
        form += "</td>";
        form += "<td>";
        form += this.fromCountry;
        form += "</td>";
        form += "<td>";
        form += `<input type ='button' value='EDIT' class="editStd" data-id="${index}" id='edit${index}' ${this.editStudent}>` + " | " +
            `<button type ='button' id='del${index}'>  ${this.delStudent} </button>`;
        form += "</td>";
        form += "</tr>";

        document.getElementById("studentList").innerHTML = form;
    }
}

function StudentList() {
    this.studentList = new Array(MAX);
    this.initStudentList = function () {
        for (let i = 0; i < MAX; i++) {
            let orderList = i + 1;
            let studentID = "CG_" + (i + 1);
            let firstName = Math.random().toString(36).substring(10);
            let lastName = Math.random().toString(36).substring(5);
            let dateBirth = Math.random().toString(8).substring(17) + "/" +
                Math.random().toString(8).substring(17) + "/" + Math.random().toString(8).substring(16);
            let fromCountry = Math.random().toString(36).substring(5);
            let editStudent = "";
            let delStudent = "Xóa";
            this.studentList[i] = new Student(orderList, studentID, firstName, lastName, dateBirth, fromCountry, editStudent, delStudent);
        }
    };

    this.showStudentList = function () {
        form = "";
        for (let i = 0; i < this.studentList.length; i++) {
            this.studentList[i].showList(i);
        }
    };

    this.addStudent = function () {
        let count = this.studentList.length;
        let orderList = count + 1;
        let studentID = "CG_" + (count + 1);
        let firstName = document.getElementById("addFirstName").value;
        let lastName = document.getElementById("addLastName").value;
        let dateBirth = document.getElementById("addDateBirth").value;
        let fromCountry = document.getElementById("addCountry").value;
        let editStudent = "";
        let delStudent = "Xóa";
        this.studentList[count] = new Student(orderList, studentID, firstName, lastName, dateBirth, fromCountry, editStudent, delStudent);
        this.studentList[count].showList(count);
    };

    this.showEditField = function (index) {
        let showInputFN = document.getElementById("displayFirstName" + index);
        let showInputLN = document.getElementById("displayLastName" + index);
        let listStudentFN = document.getElementById("studentFirstName" + index);
        let listStudentLN = document.getElementById("studentLastName" + index);
        if (showInputFN.style.display === 'none' && showInputLN.style.display === 'none') {
            showInputFN.style.display = 'block';
            showInputLN.style.display = 'block';
            listStudentFN.style.display = 'none';
            listStudentLN.style.display = 'none';
        }
    };

    this.saveEditedStudent = function (index) {
        let newStudentFN = document.getElementById("displayFirstName" + index).value;
        let newStudentLN = document.getElementById("displayLastName" + index).value;
        this.studentList[index].firstName = newStudentFN;
        this.studentList[index].lastName = newStudentLN;
        this.showStudentList();
        // this.studentList = [];
        // for (let i = 0; i < newStudentFN.length && newStudentLN.length; i++) {
        //     this.studentList.firstName.push(newStudentFN[i].value);
        //     this.studentList.lastName.push(newStudentLN[i].value);
        //     newStudentFN[i].style.display = 'none';
        //     newStudentLN[i].style.display = 'none';
        // }
        //this.showStudentList(index);
        //this.studentList[index].showList(index);
    };

    this.editButton = function (index) {
        let buttonName = document.getElementById("edit" + index);
        if (buttonName.value === "EDIT") {
            this.showEditField(index);
            buttonName.value = "SAVE";
        } else {
            this.saveEditedStudent(index);
            buttonName.value = "EDIT";
        }
    };

    this.deleteStudent = function () {
        let count = this.studentList.length;
        let listTableRow = document.getElementsByClassName("studentRow");
        delete listTableRow[count];
        this.saveEditedStudent()
        //console.log("c");
    };
}

// function editStudent(student) {
//     student.editButton();
// }

function showForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

let stdList = new StudentList();

// function editStudent(element) {
//     stdList.editButton(element);
// }

function main() {
    stdList.initStudentList();
    stdList.showStudentList();
    document.getElementById("add").onclick = function () {
        stdList.addStudent();
    };
    let anchors = document.getElementsByClassName('editStd');
    for(let i = 0; i < anchors.length; i++) {
        let anchor = anchors[i];
        anchor.onclick = function() {
            let id = this.getAttribute("data-id");
            stdList.editButton(id);
        }
    }
    // document.getElementById("del0").onclick = function () {
    //     stdList.deleteStudent();
    // };
}

main();
