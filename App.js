var simplePromise = require('./simple-promise');
var result = simplePromise.resolve(5);
result
  .then(function (value) {
    console.log(value); // output> 5
    return value + 1;
  })
  .then(function (value) {
    console.log(value); // output> 6
    return simplePromise.reject('something is wrong!');
  })
  .then(function(value) {
    console.log(value);
    return value + 1;
  })
  .catch(function(err) {
    console.log(err); // output> something is wrong!
  });
