const path = require.requireActual('path');


var _mockFolder = {
  "/default":{
    '/default/foo.js':'hello!',
    '/default/bar.js':'i am bar!',
  }
};

//var _mockFolder = {};

function __setMockFiles(newMockFolder) {
  var _tmpMockFiles={};
  console.warn('\n__setMockFiles');
  console.warn(newMockFolder);
  for(var fold in newMockFolder){
    console.warn(fold);
    _tmpMockFiles[fold]={};
    for(var file in newMockFolder[fold]){
      let filePath = path.join(fold,file);
      _tmpMockFiles[fold][filePath] = newMockFolder[fold][file];
    }
  }

  _mockFolder = _tmpMockFiles;
  console.warn(_tmpMockFiles);
}

function readdirSync(directoryPath) {
  console.warn('\n fsMock.readdirSync');
  console.warn(directoryPath);
  console.warn(_mockFolder);
  return Object.keys( _mockFolder[directoryPath]);
}

//const fsMock = jest.genMockFromModule('fs');
exports.readdirSync = readdirSync;
exports.__setMockFiles=__setMockFiles;
