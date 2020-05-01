var fetchResult = require('./fetch.js');

// fetchResult.done = function(data) {
//   console.log(data);
// };

fetchResult.done(function(data) {
  console.log(data); // output> null
});
