var reverse = require('./helper/reverse');
var asyncFetchData = require('./fetch.js');

asyncFetchData
  .then(function (result) {
    console.log(result); // output> data is here,
    return result + ' hooray!';
  })
  .then(function (result) {
    console.log(result); // output> data is here, hooray!
    return reverse(result);
  })
  .then(function (result) {
    console.log(result); // output> !yarooh ,ereh si atad
    throw 'something is wrong!';
    return result + ' hooray!';
  })
  .then(
    function (result) {
      console.log(result);
    },
    function (err) {
      console.log(err); // output> something is wrong!
    },
  );