const fs = require('fs');

function printPath(path) {
  return fs.readdirSync(path).map(name =>
   ` ${name} `).join(',');
}

module.exports = printPath;