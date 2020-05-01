var fetchResult = require('./fetch.js');

var asyncFetchData = require('./fetch.js');

asyncFetchData.then(
  onSuccess,
  onError
);

setTimeout(function() {
  asyncFetchData.then(
    onSuccess,
    onError
  );
}, 60_000 /* even after 1 minute */);

function onSuccess(data) {
  console.log('Result:', data); // output> Result: data is here!!!
}
function onError(err) {
  console.log('Error:', err); // output> Error: something is wrong!!!
}
