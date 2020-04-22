/**
 * To execute, run the following command
 * node rename.js path/to/directory 'string-to-search' 'string-to-replace'
 */
const { join } = require('path');
const { readdirSync, renameSync, statSync } = require('fs');

// DEVNOTE: For one-time execution replace the strings below
// process.argv.push('D:\\xampp\\htdocs\\Edio Repos\\cca28-edio\\frontend\\src\\modules\\directory\\blanketwaiver');
// process.argv.push('itr');
// process.argv.push('blanketwaiver');
// process.argv.push(true);

const [dir, search, replace] = process.argv.slice(2);
console.log(process.argv);
const match = RegExp(search, 'g');


const listDir = (dir, fileList = []) => {

  let files = readdirSync(dir);

  files.forEach(file => {
    if (statSync(join(dir, file)).isDirectory()) {
      fileList = listDir(join(dir, file), fileList);
    }
    if (match.test(file)) {
      const filePath = join(dir, file);
      const newFilePath = join(dir, file.replace(match, replace));
      console.log('====================================');
      console.log('Old: ' + filePath);
      console.log('New: ' + newFilePath)
      console.log('====================================');
      fileList.push({
        oldSrc: filePath,
        newSrc: newFilePath
      });
    }
  });

  return fileList;
};

let foundFiles = listDir(dir);
foundFiles.forEach(f => {
  renameSync(f.oldSrc, f.newSrc);
});