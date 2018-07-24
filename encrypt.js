const buildDictionary = require('./libs/buildDictionary');
const fs = require('fs');

let key, string;

// process argv

const processArgs = () => {
  return new Promise((resolve, reject) => {
    process.argv.slice(2).forEach(arg => {
      const pre = arg.split('=');
      if (pre[0] === '--string') {
        string = pre[1];
      } else if (pre[0] === '--key') {
        key = pre[1];
      } else {
        // assume it's part of the string and append it
        string = `${string} ${pre[1]}`;
      }
    });
    resolve();
  });
};

// open key for use

const openKeyfile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(key, (err, keyfile) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(keyfile));
    });
  });
};

// shift text string using key

const shiftText = (keyfile) => {
  return new Promise((resolve, reject) => {
    let encrypted = [];
    string.split(' ').forEach(word => {
      encrypted.push(keyfile[word.toUpperCase()].toLowerCase());
    });
    resolve(encrypted.join(' '));
  });
};

// encrypt

const encrypt = async () => {
  await processArgs();
  const keyfile = await openKeyfile();
  console.log(await shiftText(keyfile));
};

encrypt();