#! /usr/bin/env node
import inquirer from "inquirer";
class Student {
    id;
    name;
    courseEnrolled;
    fees;
    constructor(id, Name, courseEnrolled, fees) {
        this.id = id;
        this.name = Name;
        this.courseEnrolled = courseEnrolled;
        this.fees = fees;
    }
}
let baceId = 42500;
let studentId = '';
let Enroll = true;
let students = [];
do {
    let answer = await inquirer.prompt([{
            name: "opption",
            type: "list",
            message: "Select your opption",
            choices: ['Enroll courses', "Status"]
        }
    ]);
    if (answer.opption === 'Enroll courses') {
        let ans = await inquirer.prompt({
            name: "name",
            type: "input",
            message: "Enter your name",
        });
        let studentName = (ans.name).trim();
        let studentNameChek = students.map(obj => obj.name);
        if (studentNameChek.includes(studentName) === false) {
            if (studentName !== '') {
                baceId++;
                studentId = "STID:" + baceId;
                console.log("Your acount successfully has been created ");
                console.log(`Wellcome ${studentName}`);
            }
            let courses = await inquirer.prompt({
                name: 'ans',
                type: 'list',
                message: 'Select an opption',
                choices: ['Metaverse', 'AI', 'Blockchain']
            });
            let fees = 0;
            switch (courses.ans) {
                case 'Metaverse':
                    fees = 3000;
            }
            switch (courses.ans) {
                case 'AI':
                    fees = 4000;
            }
            switch (courses.ans) {
                case 'Blockchain':
                    fees = 3000;
            }
            let confirmation = await inquirer.prompt({
                name: 'con',
                type: 'confirm',
                message: "Do you want enrolled in this course"
            });
            if (confirmation.con === true) {
                let studentManagment = new Student(studentId, studentName, [courses.ans], fees);
                students.push(studentManagment);
                console.log(`you have enrolled in this course`);
            }
            else {
                console.log(`Invalid name`);
            }
        }
        else {
            console.log(`This name is already enrolled try other name`);
        }
    }
    else if (answer.opption === "Status") {
        if (students.length !== 0) {
            let nameCheck = students.map(value => value.name);
            let selectedStd = await inquirer.prompt({
                name: "answer",
                type: "list",
                message: "Select your name",
                choices: nameCheck
            });
            let foundStuden = students.find(studentManagment => studentManagment.name === selectedStd.answer);
            console.log("Student information");
            console.log(foundStuden);
        }
        let userconfirm = await inquirer.prompt({
            name: 'answer',
            type: 'confirm',
            message: "Do you want to continue"
        });
        if (userconfirm.answer === false) {
            Enroll = false;
        }
    }
} while (Enroll);
