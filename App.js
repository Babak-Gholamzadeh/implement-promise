var fetchResult = require('./fetch.js');

// fetchResult.done(function (data) {
//   console.log(data);
// });

// 'then' method is just the same as 'done' method
// but takes two callbacks instead of one
fetchResult.then(
  // if data be fetched successfuly, then 'onSuccess' would be called
  onSuccess,
  // if any error occurs, then 'onError' would be called
  onError
);

function onSuccess(data) {
  console.log('Result:', data); // output> Result: data is here!!!
}
function onError(err) {
  console.log('Error:', err); // output> Error: something is wrong!!!
}
