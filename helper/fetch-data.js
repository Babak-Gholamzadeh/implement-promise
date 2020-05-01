function fetchData(fn) {
  setTimeout(() => {

    // Send some data to 'fn' function for resolving value
    fn('data is here!!!');

    // Send nothing to it for rejection purpos
    // fn();

  }, 500);
}
module.exports = fetchData;