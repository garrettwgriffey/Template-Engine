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

function roundOne() {
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
    ]).then(response1 => {
        console.log(response1)
    roundTwo(response1)
    })
}
function roundTwo(answers1) {
  let attr;
  let Role;
    if(answers1.role === 'Engineer') {
        attr = 'github username';
        Role = Engineer; 
    } else if(answers1.role === 'Manager') {
        attr = 'office number';
        Role = Manager; 
    } else{
        attr = 'school';
        Role = Intern; 
    }
    inquirer
      .prompt([
        {
          type: "input",
          message: `What is your ${attr}?`,
          name: "unique"
        },
    ]).then(response2 => {
        const emp = new Role(answers1.name, answers1.id, answers1.email, response2.unique);
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
    ]).then(response3 => {
      if(response3.role === 'Yes') {
          roundOne()
      } else {
          const html = render(myTeam)
          fs.writeFile(outputPath, html, error => {
            if(error)throw error;
          })
          console.log(html)
      }
    })
        
    }
    roundOne();
