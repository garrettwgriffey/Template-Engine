const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function inquireQuestions() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is your full name?",
          name: "name"
        },
        {
          type: "input",
          message: "What is your employee id?",
          name: "id"
        },
        {
          type: "Input",
          message: "What is your e-mail address?",
          name: "email"
        },
        {
          type: "list",
          message: "What type of employee are you?",
          choices: ['Manager', 'Engineer', 'Intern'],
          name: "role"
        }
    ]).then(response => {
        console.log(response)

    })
}

    inquireQuestions();
