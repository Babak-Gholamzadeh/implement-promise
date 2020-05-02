function asyncController(borrowFunction) {
  var asyncHanlder = {};
  var _onSuccess = null;
  var _onError = null;
  var value = null;
  var state = 'PENDING';

  try {
    borrowFunction(resolve, reject);
  } catch (err) {
    reject(err);
  }

  function resolve(data) {
    // _onSuccess(data);
    value = data;
    state = 'RESOLVED';
    executeController();
  }

  function reject(err) {
    // _onError(err);
    value = err;
    state = 'REJECTED';
    executeController();
  }

  function executeController() {
    if(state === 'RESOLVED') {
      if(_onSuccess) {
        _onSuccess(value);
      }
    } else if (state === 'REJECTED') {
      if(_onError) {
        _onError(value);
      }
    }
  }

  asyncHanlder.then = function (onSuccess, onError) {
    _onSuccess = onSuccess;
    _onError = onError;
    executeController();
  
    function borrowFunction(resolve, reject) {
      // The party is here!
    }
  
    return asyncController(borrowFunction);
  }

  return asyncHanlder;
}

module.exports = asyncController;