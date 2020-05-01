var fetchResult = require('./fetch.js');

console.log(fetchResult); // output> undefined;

setTimeout(function() {
  console.log(fetchResult); // output> undefined;
}, 1000); // assume fetchResult takes data in less than 1 sec
