var saveData = require('./save-data');

var asyncController = require('../async-controller');

function borrowResolveAndReject(resolve, reject) {
  saveData(function (data) {
    if (data) {
      resolve(data);
    } else {
      reject('an error occurred while saving data');
    }
  });
}

var asyncFetchData = function(data) {
  return asyncController(borrowResolveAndReject)
};
module.exports = asyncFetchData;
