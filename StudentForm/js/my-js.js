const MAX = 20;
var form = "";

function Student(orderList, studentID, firstName, lastName, dateBirth, fromCountry, userName, editStudent, delStudent) {
    this.orderList = orderList;
    this.studentID = studentID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateBirth = dateBirth;
    this.fromCountry = fromCountry;
    this.userName = userName;
    this.editStudent = editStudent;
    this.delStudent = delStudent;

    this.showList = function () {
        form += "<tr class='studentRow'>";
        form += "<td>";
        form += this.orderList;
        form += "</td>";
        form += "<td>";
        form += this.studentID;
        form += "</td>";
        form += "<td>";
        form += this.lastName + " " + this.firstName;
        form += "</td>";
        form += "<td>";
        form += this.dateBirth;
        form += "</td>";
        form += "<td>";
        form += this.fromCountry;
        form += "</td>";
        form += "<td>";
        form += this.userName;
        form += "</td>";
        form += "<td>";
        form += `<input type ='button' value='Sửa' id='edit' ${this.editStudent}>` + " | " + `<button type ='button' id='del' onclick='delStudent(this)'>  ${this.delStudent} </button>`;
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
            let userName = Math.random().toString(36).substring(4);
            let editStudent = "";
            let delStudent = "Xóa";

            this.studentList[i] = new Student(orderList, studentID, firstName, lastName, dateBirth, fromCountry, userName, editStudent, delStudent);
        }
    };

    this.showStudentList = function () {
        form = "";
        for (let i = 0; i < this.studentList.length; i++) {
            this.studentList[i].showList();
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
        let userName = document.getElementById("addUsername").value;
        let editStudent = "";
        let delStudent = "Xóa";
        //console.log(this.studentList);
        this.studentList[count] = new Student(orderList, studentID, firstName, lastName, dateBirth, fromCountry, userName, editStudent, delStudent);
        this.studentList[count].showList();
    };

    this.deleteStudent = function () {
        let count = this.studentList.length;
        let listTableRow = document.getElementsByClassName("studentRow");
        delete listTableRow[count];
        this.showStudentList();
        console.log("c");
    };
}

function delStudent(student) {
    student.deleteStudent();
}

function showForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function main() {
    let stdList = new StudentList();
    stdList.initStudentList();
    stdList.showStudentList();
    document.getElementById("add").onclick = function () {
        stdList.addStudent();
    };
    document.getElementById("del").onclick = function () {
        stdList.deleteStudent();
    };
}

main();
