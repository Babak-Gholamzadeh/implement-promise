const [ PENDING, RESOLVED, REJECTED ] = [0, 1, 2];

function asyncController(borrowFunction) {
  var asyncHanlder = {};
  var onThenHanlers = [];
  var value = null;
  var state = PENDING;

  var resolve = applyNewState(RESOLVED);
  var reject = applyNewState(REJECTED);

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

  try {
    borrowFunction(resolve, reject);
  } catch (err) {
    reject(err);
  }

  function executeController() {

    if(state === PENDING) {
      return;
    }
  
    setTimeout(function () {
      // if (state === RESOLVED) {
      //     _onSuccess(value);
      // } else {
      //     _onError(value);
      // }
  
      onThenHanlers.forEach(function (hanlder) {
  
        if (state === RESOLVED) {
          hanlder.onSuccess(value);
        } else {
          hanlder.onError(value);
        }
  
      });
      onThenHanlers = [];
  
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

      var hanlder = {

        onSuccess: function (result) {
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
        },

        onError: function (err) {
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
        }

      };

      onThenHanlers.push(hanlder);

      executeController();
    }

    return asyncController(borrowFunction);
  }

  asyncHanlder.catch = function (onError) {
    return asyncHanlder.then(null, onError);
  }

  return asyncHanlder;
}

asyncController.resolve = function (value) {

  function borrowResolve(resolve) {
    resolve(value);
  }

  return asyncController(borrowResolve);
}

asyncController.reject = function (err) {

  function borrowReject(resolve, reject) {
    reject(err);
  }

  return asyncController(borrowReject);
}

module.exports = asyncController;