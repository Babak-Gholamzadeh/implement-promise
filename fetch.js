var fetchData = require('./helper/fetch-data');

var fetchResult = {};

fetchData(function (data) {
  // fetchResult.data = data;
  fetchResult.done(data);
});

module.exports = fetchResult;