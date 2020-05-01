var fetchData = require('./helper/fetch-data');

var asyncController = require('./async-controller');

function borrowFunction(resolve, reject) {

  fetchData(function (data) {
    if(data) {
      resolve(data);
    } else {
      reject('something is wrong!!!');
    }
  });

}

var asyncFetchData = asyncController(borrowFunction);
module.exports = asyncFetchData;