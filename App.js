var fetchResult = require('./fetch.js');

// setTimeout(function() {
//   console.log(fetchResult);
// }, 1000);

fetchResult.done = function(data) {
  console.log(data); // output> data is here!!!
};
