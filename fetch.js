var fetchData = require('./helper/fetch-data');

function asyncController(asyncFunction) {
  var asyncHanlder = {};
  var _callback = null;

  asyncFunction(function (data) {
    resolve(data);
  });

  function resolve(data) {
    _callback(data);
  }

  asyncHanlder.done = function (callback) {
    _callback = callback;
  }

  return asyncHanlder;
}

var asyncHanlder = asyncController(fetchData);
module.exports = asyncHanlder;