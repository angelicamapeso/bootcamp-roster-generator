const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

//since managers, interns and engineers have one additional property
//only need one additional question to generic employee questions
const MANAGER_QUESTION = {
  type: 'input',
  name: 'officeNumber',
  message: "What is the Manager's office number?",
}

const INTERN_QUESTION = {
  type: 'input',
  name: 'school',
  message: "What school is the Intern currently attending?",
}

const ENGINEER_QUESTION = {
  type: 'input',
  name: 'github',
  message: "What is the Engineer's GitHub username?",
}

function getEmployeeQuestions(employeeRole) {
  const employeeQuestions = [
    {
      type: 'input',
      name: 'name',
      message: `What is the ${employeeRole}'s name?`,
    },
    {
      type: 'input',
      name: 'id',
      message: `What is the ${employeeRole}'s id?`,
    },
    {
      type: 'input',
      name: 'email',
      message: `What is the ${employeeRole}'s email?`,
    }
  ]
  switch(employeeRole) {
    case 'Manager':
      employeeQuestions.push(MANAGER_QUESTION);
      break;
    case 'Intern':
      employeeQuestions.push(INTERN_QUESTION);
      break;
    case 'Engineer':
      employeeQuestions.push(ENGINEER_QUESTION);
      break;
    default:
      throw new Error('Employee role does not exist!');
  }
  //returning a copy so that additional changes made by other questions
  //will not affect one another
  return employeeQuestions.slice(0);
}

async function askToStart() {
  const intro = [
    {
      type: 'list',
      name: 'isStarting',
      message: "What would you like to do?",
      choices: [
        {
          name: 'Start',
          value: true,
        },
        {
          name: 'Exit',
          value: false,
        }
      ]
    }
  ];

  console.log(`
Welcome to the Team Roster Generator!
Note: To generate a new roster, you'll need to input information about the team's manager first.
`);
  const answers = await inquirer.prompt(intro);
  return answers.isStarting;
}

async function askAction(teamLength) {
  const actions = [
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'Add Intern',
        'Add Engineer',
        'Render HTML',
        'Exit without rendering',
      ]
    }
  ];

  console.log(`\nYour team currently consists of: ${teamLength} member${teamLength > 1 ? 's' : ''}`);
  const answer = await inquirer.prompt(actions);
  return answer.action;
}

async function getEmployeeInfo(role) {
  const questions = getEmployeeQuestions(role);

  console.log(`\n----- GETTING ${role.toUpperCase()} INFO -----`);
  const answers = await inquirer.prompt(questions);
  switch(role) {
    case 'Manager':
      return new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    case 'Intern':
      return new Intern(answers.name, answers.id, answers.email, answers.school);
    case 'Engineer':
      return new Engineer(answers.name, answers.id, answers.email, answers.github);
  }
}

function generateHTMLFile() {
  const OUTPUT_DIR = path.resolve(__dirname, "output");
  const outputPath = path.join(OUTPUT_DIR, "team.html");

  console.log('\n-----RENDERING HTML-----');
}

async function runApp() {
  let exitProgram = false;
  const employees = [];
  const isStarting = await askToStart();
  if (isStarting) {
    const manager = await getEmployeeInfo('Manager');
    employees.push(manager);

    while (!exitProgram) {
      const action = await askAction(employees.length);
      switch(action) {
        case 'Add Intern':
          const intern = await getEmployeeInfo('Intern');
          employees.push(intern);
          break;
        case 'Add Engineer':
          const engineer = await getEmployeeInfo('Engineer');
          employees.push(engineer);
          break;
        case 'Render HTML':
          generateHTMLFile();
        case 'Exit without rendering':
        default:
          exitProgram = true;
      }
    }
  }
  console.log('\nExiting program');
}

runApp();
