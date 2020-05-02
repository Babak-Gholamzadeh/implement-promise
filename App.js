var asyncFetchData = require('./fetch.js');

asyncFetchData
  .then(function (result) {
    console.log(result); // output> data is here!
    // saveData is an async function
    // and the returned value of it is a thenable object (like asyncFetchData)
    return saveData(result);
  })
  .then(function (result) {
    console.log(result); // output> data saved successfuly!
  });