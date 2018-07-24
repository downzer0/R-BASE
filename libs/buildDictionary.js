const path = require('path');
const fs = require('fs');

const buildDictionary = () => {
  return new Promise((resolve, reject) => {
    const dictionaryFile = fs.readFileSync(path.join('./', 'dictionary/us-en.txt'));
    resolve(dictionaryFile.toString().split('\n'));
  });
};

module.exports = buildDictionary;