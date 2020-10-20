// ---------- EMPLOYEE QUESTIONS ----------//
//since managers, interns and engineers have one additional property
//only need one additional question to generic employee questions
function getEmployeeQuestions(employeeRole) {
  const employeeQuestions = [
    {
      type: 'input',
      name: 'name',
      message: `What is the ${employeeRole}'s name?`,
      validate: isValidName,
    },
    {
      type: 'input',
      name: 'id',
      message: `What is the ${employeeRole}'s id?`,
      validate: isValidId,
    },
    {
      type: 'input',
      name: 'email',
      message: `What is the ${employeeRole}'s email?`,
      validate: isValidEmail,
    }
  ]
  switch(employeeRole) {
    case 'Manager':
      employeeQuestions.push({
        type: 'input',
        name: 'officeNumber',
        message: `What is the ${employeeRole}'s office number?`,
        validate: isValidOfficeNum,
      });
      break;
    case 'Intern':
      employeeQuestions.push({
        type: 'input',
        name: 'school',
        message: `What school is the ${employeeRole} currently attending?`,
        validate: isValidSchool,
      });
      break;
    case 'Engineer':
      employeeQuestions.push({
        type: 'input',
        name: 'github',
        message: `What is the ${employeeRole}'s GitHub username?`,
        validate: isValidGithub,
      });
      break;
    default:
      throw new Error('Employee role does not exist!');
  }
  //returning a copy so that additional changes made by other questions
  //will not affect one another
  return employeeQuestions.slice(0);
}

// ---------- VALIDATION FUNCTIONS ----------//
function isEmpty(answer) {
  return (answer.trim() === '');
}

function isValidName(name) {
  return new Promise((resolve, reject) => {
    if (isEmpty(name)) {
      resolve('Name cannot be empty!');
    } else {
      resolve(true);
    }
  });
}

function isValidId(id) {
  return new Promise((resolve, reject) => {
    //can only contain numbers
    if (isEmpty(id)) {
      resolve('ID cannot be empty!');
    } else if (/^\d+$/.test(id)) {
      resolve(true);
    } else {
      resolve('ID can only contain numbers!');
    }
  });
}

function isValidEmail(email) {
  return new Promise((resolve, reject) => {
    if (isEmpty(email)) {
      resolve('Email cannot be empty!');
    }
    //email format: https://en.wikipedia.org/wiki/Email_address#Local-part
    //local name can start with any character except @
    //domain can only contain letters, numbers and one hyphen that isn't beginning or last character
    //string must end with group pattern: .text
    //end pattern can be repeatable: .text.moretext.com (only letters allowed at this last part)
    else if (/^[^ @]+@[a-zA-Z0-9]+\-?[a-zA-Z0-9]+(\.[a-zA-Z]+)+$/.test(email)) {
      resolve(true);
    } else {
      resolve('Invalid email format!');
    }
  });
}

function isValidOfficeNum(officeNum) {
  return new Promise((resolve, reject) => {
    if (isEmpty(officeNum)) {
      resolve('Office number cannot be empty!');
    }
    //can only contain numbers
    else if (/^[0-9]+$/.test(officeNum)) {
      resolve(true);
    } else {
      resolve('Office number can only contain numbers!');
    }
  });
}

function isValidSchool(school) {
  return new Promise((resolve, reject) => {
    if (isEmpty(school)) {
      resolve('School cannot be empty!');
    } else {
      resolve(true);
    }
  });
}

function isValidGithub(github) {
  return new Promise((resolve, reject) => {
    if (isEmpty(github)) {
      resolve('GitHub username cannot be empty!');
    }
    //Regex from:
    //Author: shinnn
    //Date: Jan. 18, 2017
    //Code version: 1.0.0
    //Available at: https://github.com/shinnn/github-username-regex
    else if (/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(github)) {
      resolve(true);
    } else {
      resolve('Invalid GitHub username format!');
    }
  });
}

module.exports = getEmployeeQuestions;
