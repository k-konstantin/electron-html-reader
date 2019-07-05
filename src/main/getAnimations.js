const fs = require('fs');
const path = require('path');

function getHtmlFiles(dirPath) {
    const allFiles = [];
    fs.readdirSync(dirPath).forEach(file => {
        const filePath = path.join(dirPath, file);

        const isDir = fs.lstatSync(filePath).isDirectory();
        if (isDir) {
            const files = getHtmlFiles(filePath);
            Array.prototype.push.apply(allFiles, files);
        } else if (filePath.slice(-5) === '.html') {
            allFiles.push(path.join(filePath));
        }
    });

    return allFiles;
}

module.exports = animationsPath => getHtmlFiles(animationsPath);
