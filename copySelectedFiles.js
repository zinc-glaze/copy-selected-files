const fs = require('fs');

//load file Ids into array
let searchIds = fs.readFileSync(`${__dirname}/fileIds.txt`, 'utf8').trim().split(',');
let counter = 0;

const traverseFileSystem = function (currentPath) {
  //console.log('Current path:', currentPath);
  let files = fs.readdirSync(currentPath);
  
  //traverse file system recursively
  for (let i in files) {
    let currentFile = files[i];
    let currentFilePath = currentPath + '/' + files[i];
    let stats = fs.statSync(currentFilePath);
    //look at current file
    if (stats.isFile()) {
      //console.log('Current file: ', currentFilePath);
      //iterate through array of file ids to be copied
      for (let i in searchIds) {
        //if current file meets the search criteria, copy it, and give confirmation
        if (currentFilePath.includes('.vtt') && currentFilePath.includes(searchIds[i])) {
          fs.copyFileSync(currentFilePath, `../file-mover-destination/${currentFile}`);
          counter += 1;
          console.log('Copied: ', currentFile);
        }
      }
    } else if (stats.isDirectory()) {
      traverseFileSystem(currentFilePath);
    }
  }
};

//create destination directory for copied files
fs.mkdirSync('../file-mover-destination');
//run search and copy function
traverseFileSystem(__dirname);
//print results
console.log(`${counter} files copied`);
