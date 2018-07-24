const inquirer = require('inquirer');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const base = 4096;

const questions = [{
  type: 'input',
  name: 'words',
  message: 'Enter three or more words about the recipient',
  validate: (input) => {
    return input.replace(' ', '').length >= 3
  }
}, {
  type: 'input',
  name: 'location',
  message: 'Where do you want to place this keyfile?'
}];

const alpha = {
  A: 1, B: 2, C: 3, D: 4, E: 5,
  F: 6, G: 7, H: 8, I: 9, J: 10,
  K: 11, L: 12, M: 13, N: 14, O: 15,
  P: 16, Q: 17, R: 18, S: 19, T: 20,
  U: 21, V: 22, W: 23, X: 24, Y: 25,
  Z: 26
};

// build base dictionary

const buildDictionary = () => {
  return new Promise((resolve, reject) => {
    const dictionaryFile = fs.readFileSync(path.join('./', 'dictionary/us-en.txt'));
    resolve(dictionaryFile.toString().split('\n'));
  });
};

// words score

const buildWordsScore = (words) => {
  return new Promise((resolve, reject) => {
    let score = 0;
    const wordsArr = words.trim().split('').forEach(letter => {
      resolve(score = score + alpha[letter.toUpperCase()]);
    });
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
    }
    resolve(algorithm);
  });
};

// write the keyfile

const writeKeyfile = (shiftedDict, answers) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join('./', `rbase-${answers.words.split(' ').join('-')}.key`), JSON.stringify(shiftedDict), (err) => {
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
  console.log('! Keyfile generated.');
});