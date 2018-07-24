const inquirer = require('inquirer');
const fs = require('fs');

const questions = [{
  type: 'input',
  name: 'words',
  message: 'Enter three or more words about the recipient',
  validate: (input) => {
    return input.split(' ').length >= 3
  }
}];

const dictionary = fs.readFile('./dictionary/us-en.txt', (err, content) => {
  return content.toString().split('\n');
});

// create shift amount

const shift = Math.floor((Math.random() * 4096) + 1);

// shifted dict

const algorithm = {};

// create the shifted dict

const buildShiftedDictionary = (words) => {
  console.log(words);
};

// prompt

inquirer.prompt(questions).then(answers => {
  buildShiftedDictionary(answers.words);
});