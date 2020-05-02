var asyncController = require('./async-controller');
var result = asyncController.resolve(5);
result
  .then(function (value) {
    console.log(value); // output> 5
    return value + 1;
  })
  .then(function (value) {
    console.log(value); // output> 6
    return asyncController.reject('something is wrong!');
  })
  .then(function(value) {
    console.log(value);
    return value + 1;
  })
  .catch(function(err) {
    console.log(err); // output> something is wrong!
  });
