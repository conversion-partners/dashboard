initStarted = false;

function init() {
  if (!initStarted) {
    initNestable([]);
    initStarted = true;
  }
}
