function saveData(fn) {
  setTimeout(() => {

    // Send some data to 'fn' function for resolving value
    fn('data saved successfuly!');

    // Send nothing to it for rejection purpos
    // fn();

  }, 500);
}
module.exports = saveData;