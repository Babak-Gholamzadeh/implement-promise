const [PENDING, RESOLVED, REJECTED] = [0, 1, 2];

function isNotNull(value) {
  return value !== null;
}
function isFunction(value) {
  return typeof value === 'function';
}
function isObject(value) {
  // Check the value type is 'object', 'function', or 'array'
  return (
    typeof value === 'object' ||
    isFunction(value)
  );
}
function isThenable(value) {
  return (
    isNotNull(value) &&
    isObject(value) &&
    isFunction(value.then)
  );
}

function simplePromise(borrowFunction) {
  var promiseHanlder = {};
  var onThenHanlers = [];
  var value = null;
  var state = PENDING;

  function applyNewState(newState) {
    return function (newValue) {
      if (isThenable(newValue)) {
        return newValue.then(resolve, reject);
      }
      if (state === PENDING) {
        value = newValue;
        state = newState;
        executeController();
      }
    }
  }

  var resolve = applyNewState(RESOLVED);
  var reject = applyNewState(REJECTED);

  try {
    borrowFunction(resolve, reject);
  } catch (err) {
    reject(err);
  }

  function executeController() {
    if (state === PENDING) {
      return;
    }
    setTimeout(function () {
      onThenHanlers.forEach(function (hanlder) {
        if (state === RESOLVED) {
          return hanlder.onSuccess(value);
        }
        hanlder.onError(value);
      });
      onThenHanlers = [];
    }, 0);
  }

  promiseHanlder.then = function (onSuccess, onError) {
    function borrowFunction(resolve, reject) {
      var hanlder = {
        onSuccess: function (result) {
          if (!onSuccess) {
            return resolve(result);
          }
          try {
            var returnedValue = onSuccess(result);
            resolve(returnedValue);
          } catch (err) {
            reject(err);
          }
        },
        onError: function (err) {
          if (!onError) {
            return reject(err);
          }
          try {
            var returnedValue = onError(err);
            resolve(returnedValue);
          } catch (err) {
            reject(err);
          }
        }
      };
      onThenHanlers.push(hanlder);
      executeController();
    }
    return simplePromise(borrowFunction);
  }

  promiseHanlder.catch = function (onError) {
    return promiseHanlder.then(null, onError);
  }

  return promiseHanlder;
}

simplePromise.resolve = function (value) {
  function borrowResolve(resolve) {
    resolve(value);
  }
  return simplePromise(borrowResolve);
}

simplePromise.reject = function (err) {
  function borrowReject(resolve, reject) {
    reject(err);
  }
  return simplePromise(borrowReject);
}

module.exports = simplePromise;