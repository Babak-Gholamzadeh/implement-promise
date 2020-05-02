var fetchData = require('./helper/fetch-data');

var simplePromise = require('./simple-promise');

function borrowFunction(resolve, reject) {

  fetchData(function (data) {
    if(data) {
      resolve(data);
    } else {
      reject('something is wrong!!!');
    }
  });

}

var asyncFetchData = simplePromise(borrowFunction);
module.exports = asyncFetchData;