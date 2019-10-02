const fs = require('fs');

function createDir(dirPath) {
  try {
    if (!fs.existsSync(process.cwd() + dirPath)) {
      fs.mkdirSync(process.cwd() + dirPath, { recursive: true });
      console.log(`Directory "${dirPath}" created!`);
    } else {
      console.log(`Directory "${dirPath}" already exists!`);
    }
  } catch (err) {
    console.error(err);
  }
}

function createFile(filePath, fileContent) {
  try {
    if (!fs.existsSync(process.cwd() + filePath)) {
      fs.writeFileSync(process.cwd() + filePath, fileContent);
      console.log(`File "${filePath}" created!`);
    } else {
      console.log(`File "${filePath}" already exists!`);
    }
  } catch (err) {
    console.error(err);
  }
}

for (let i = 1; i < 10; i++) {
  const path = `/my-new-dir-${i}`;
  const file1 = path + `/my-new-file-${i}.txt`;
  const file2 = path + `/wrong-file-${i}.txt`;
  const content = 'content of my new file';

  createDir(path);
  createFile(file1, content);
  createFile(file2, content);
}
