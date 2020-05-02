function asyncController(borrowFunction) {
  var asyncHanlder = {};
  var _onSuccess = null;
  var _onError = null;
  var value = null;
  var state = 'PENDING';

  var resolve = applyNewState('RESOLVED');
  var reject = applyNewState('REJECTED');

  function applyNewState(newState) {
    return function (newValue) {

      if (isThenable(newValue)) {
        return newValue.then(resolve, reject);
      }

      value = newValue;
      state = newState;
      executeController();

    }
  }

  try {
    borrowFunction(resolve, reject);
  } catch (err) {
    reject(err);
  }

  function executeController() {

    setTimeout(function () {
  
      if (state === 'RESOLVED') {
        if (_onSuccess) {
          _onSuccess(value);
        }
      } else if (state === 'REJECTED') {
        if (_onError) {
          _onError(value);
        }
      }
  
    }, 0);
  
  }

  function isThenable(value) {
    return (

      value !== null &&

      (
        typeof value === 'object' ||
        typeof value === 'function'
      ) &&

      typeof value.then === 'function'

    );
  }

  asyncHanlder.then = function (onSuccess, onError) {

    function borrowFunction(resolve, reject) {

      _onSuccess = function (result) {
        if (!onSuccess) {
          resolve(result);
        } else {
          try {
            var returnedValue = onSuccess(result);
            resolve(returnedValue);
          } catch (err) {
            reject(err);
          }
        }
      };

      _onError = function (err) {
        if (!onError) {
          reject(err);
        } else {
          try {
            var returnedValue = onError(err);
            resolve(returnedValue);
          } catch (err) {
            reject(err);
          }
        }
      };

      executeController();
    }

    return asyncController(borrowFunction);
  }

  return asyncHanlder;
}

module.exports = asyncController;