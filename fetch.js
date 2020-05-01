var fetchData = require('./helper/fetch-data');

var fetchResult = undefined;

fetchData(function (data) {
  fetchResult = data;
});

module.exports = fetchResult;
