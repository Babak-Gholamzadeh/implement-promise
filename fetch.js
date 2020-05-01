var fetchData = require('./helper/fetch-data');

// var fetchResult = undefined;
var fetchResult = {};

fetchData(function (data) {
  // fetchResult = data;
  fetchResult.data = data;
});

module.exports = fetchResult;