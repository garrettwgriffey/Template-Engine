const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let myTeam = []

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
          type: "input",
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
    roundTwo(response)
    })
}
function roundTwo(answers) {
    if(answers.role === 'Engineer') {
        const attr = 'github username';
        const Role = Engineer; 
    } else if(answers.role === 'Manager') {
        const attr = 'office number';
        const Role = Manager; 
    } else{
        const attr = 'school';
        const Role = Intern; 
    }
    inquirer
      .prompt([
        {
          type: "input",
          message: `What is your ${attr}?`,
          name: "name"
        },
    ]).then(response => {
        const emp = new Role(answers.name, answers.id, answers.email, response.name);
myTeam.push(emp)
roundThree()
    })
    }
    function roundThree() {
        inquirer
      .prompt([
        {
            type: "list",
            message: "Do you want to add another team member?",
            choices: ['Yes', 'No'],
            name: "role"
          }
    ]).then(response => {
      if(response.role === 'Yes') {
          inquireQuestions()
      } else {
          const html = render(myTeam)
          console.log(html)
      }
    })
        
    }
    inquireQuestions();
