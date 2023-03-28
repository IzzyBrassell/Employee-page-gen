const Manager = require('./lib/manager')
const Engineer = require('./lib/engineer')
const Intern = require('./lib/intern')
const inquirer = require('inquirer');
const { resolve, join } = require('path');
const fs = require('fs');
const generateTeam = require('./src/template');

const OUTPUT_DIR = resolve(__dirname, 'output');
const outputPath = join(OUTPUT_DIR, 'team.html');
const teamArray = [];

const addEmployee = (type) => {
  const questions = {
    Manager: [
      { type: 'input', name: 'managerName', message: 'What is the manager\'s name?' },
      { type: 'input', name: 'managerId', message: 'What is the manager\'s employee ID number?' },
      { type: 'input', name: 'managerEmail', message: 'What is the manager\'s email address?' },
      { type: 'input', name: 'managerOfficeNumber', message: 'What is the manager\'s office number?' }
    ],
    Engineer: [
      { type: 'input', name: 'engineerName', message: 'What is the engineer\'s name?' },
      { type: 'input', name: 'engineerId', message: 'What is the engineer\'s employee ID number?' },
      { type: 'input', name: 'engineerEmail', message: 'What is the engineer\'s email address?' },
      { type: 'input', name: 'engineerGithub', message: 'What is the engineer\'s GitHub username?' }
    ],
    Intern: [
      { type: 'input', name: 'internName', message: 'What is the intern\'s name?' },
      { type: 'input', name: 'internId', message: 'What is the intern\'s employee ID number?' },
      { type: 'input', name: 'internEmail', message: 'What is the intern\'s email address?' },
      { type: 'input', name: 'internSchool', message: 'What school does the intern attend?' }
    ]
  };

  return inquirer.prompt(questions[type]).then(answers => {
    const employee = type === 'Manager'
      ? new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
      : type === 'Engineer'
        ? new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
        : new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
    teamArray.push(employee);
  });
};

const createTeam = () => {
  inquirer.prompt([
    { type: 'list', name: 'employeeType', message: 'What type of employee would you like to add to your team?', choices: ['Manager', 'Engineer', 'Intern', 'No more team members are needed.'] }
  ]).then(({ employeeType }) => {
    if (employeeType === 'No more team members are needed.') {
      console.log('Team created!');
      fs.writeFileSync(outputPath, generateTeam(teamArray), 'UTF-8');
    } else {
      addEmployee(employeeType).then(createTeam);
    }
  });
};

const runApp = () => {
  createTeam();
};


runApp();