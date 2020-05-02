var asyncFetchData = require('./fetch.js');

asyncFetchData
  .then(function (result) {
    console.log('result 1:', result); // output> result 1: data is here!
    return result + ' hooray!';
  })
  .then(function (result) {
    console.log(result); // output> data is here, hooray!
  });

asyncFetchData
  .then(function (result) {
    console.log('result 2:', result); // output> result 2: data is here!
  });