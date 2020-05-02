var asyncFetchData = require('./fetch.js');
asyncFetchData
  .then(function (result) {
    console.log(result); // output> data is here!
    throw 'something is wrong!';
    return result + ' hooray!';
  })
  .then(function (result) {
    console.log(result);
  })
  .catch(function(err) {
    console.log(err); // output> something is wrong!
    return 'everything is find now!';
  })
  .then(function(result) {
    console.log(result); // output> everything is find now!
  });