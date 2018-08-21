const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const buildDictionary = require('./libs/buildDictionary');
const alpha = require('./libs/alphas');

const base = 4096;

const questions = [{
  type: 'input',
  name: 'recipient',
  message: 'Who is this message to?'
}, {
  type: 'input',
  name: 'words',
  message: 'Enter three or more words about the recipient',
  validate: (input) => {
    return input.replace(' ', '').length >= 3
  }
}, {
  type: 'input',
  name: 'location',
  message: 'Where do you want to place this keyfile?',
  default: '.'
}];

// words score

const buildWordsScore = (words) => {
  return new Promise((resolve, reject) => {
    let score = 0;
    words.replace(/\s/g, '').split('').forEach(letter => {
      if (alpha[letter.toUpperCase()]) {
        score = score + alpha[letter.toUpperCase()];
      }
    });
    resolve(score);
  });
};

// create shift amount

const shift = (score) => {
  return Math.floor((Math.random() * base) + score);
};

// get working score recursion

const getWorkingScore = (score, dictionary) => {
  if (score > dictionary.length) {
    getWorkingScore(score/base);
  }
  return score;
};

// create the shifted dict

const buildShiftedDictionary = (score, dictionary) => {
  return new Promise((resolve, reject) => {
    const algorithm = {};
    let start = getWorkingScore(score, dictionary);
    for (let i = 0; i < dictionary.length - 1; i++, start++) {
      if (start > dictionary.length) {
        start = 0;
      }
      algorithm[dictionary[i]] = dictionary[start];
      i++;
    }
    resolve(algorithm);
  });
};

// clean the keyfile name

const cleanKeyfile = (words) => {
  const keyfile = [];
  words.split(' ').forEach(word => {
    keyfile.push(word.replace(/[&\/\\#,+()$~%.'":*?!<>{}]/g, '').toLowerCase());
  });
  return keyfile.join('-');
};

// write the keyfile

const writeKeyfile = (shiftedDict, answers) => {
  return new Promise((resolve, reject) => {
    const keyfile = cleanKeyfile(answers.recipient);
    fs.writeFile(path.join(answers.location, `rbase-${keyfile}.key`), JSON.stringify(shiftedDict), (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

// prompt

inquirer.prompt(questions).then(async (answers) => {
  const dictionary = await buildDictionary();
  const score = await buildWordsScore(answers.words);
  const shiftAmount = await shift(score);
  const shiftedDictionary = await buildShiftedDictionary(shiftAmount, dictionary);
  await writeKeyfile(shiftedDictionary, answers);
  console.log(`! Keyfile generated with complexity rating of ${score}`);
});