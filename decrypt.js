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

const unshiftText = (keyfile) => {
  return new Promise((resolve, reject) => {
    let decrypted = [];
    string.split(' ').forEach(word => {
      for (let prop in keyfile) {
        if (keyfile.hasOwnProperty(prop)) {
          if (keyfile[prop] === word.toUpperCase()) {
            decrypted.push(prop.toLowerCase());
          }
        }
      }
    });
    resolve(decrypted.join(' '));
  });
};

// decrypt

const decrypt = async () => {
  await processArgs();
  const keyfile = await openKeyfile();
  console.log(await unshiftText(keyfile));
};

decrypt();