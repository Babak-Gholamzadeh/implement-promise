var fetchData = require('./helper/fetch-data');

function asyncController(asyncFunction) {
  var asyncHanlder = {};
  var _callback = null;

  asyncFunction(function (data) {
    // resolve(data);
    if (data) {
      resolve(data);
    } else {
      reject('something is wrong!!!');
    }
  });

  function resolve(data) {
    // _callback(data);
    _onSuccess(data);
  }
  function reject(err) {
    _onError(err);
  }

  asyncHanlder.done = function (callback) {
    _callback = callback;
  }

  return asyncHanlder;
}

var asyncHanlder = asyncController(fetchData);
module.exports = asyncHanlder;