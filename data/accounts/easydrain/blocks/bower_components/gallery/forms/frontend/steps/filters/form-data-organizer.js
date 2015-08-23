var stepData = {
  "src.json": ["src"],
  "description.json": ["title", "description"]
}
var api = {
  filter: function (input, cb) {
    input.stepData = stepData;
    cb(input);
  }
}
application.setInterface(api);
