var stepData = {
  "html.json": ["html"]
}
var api = {
  filter: function (input, cb) {
    input.stepData = stepData;
    cb(input);
  }
}
application.setInterface(api);
