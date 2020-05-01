var fetchData = require('./helper/fetch-data');

var fetchResult = {
  data: null,
  done: function(callback) {
    callback(this.data);
  }
};

fetchData(function (data) {
  fetchResult.data = data;
  // fetchResult.done(data);
});

module.exports = fetchResult;