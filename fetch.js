var fetchData = require('./helper/fetch-data');

var fetchResult = {
  // data: null,
  resolve: function(data) {
    this.callback(data);
  },
  done: function(callback) {
    // callback(this.data);
    this.callback = callback;
  }
};

fetchData(function (data) {
  // fetchResult.data = data;
  fetchResult.resolve(data);
});

module.exports = fetchResult;