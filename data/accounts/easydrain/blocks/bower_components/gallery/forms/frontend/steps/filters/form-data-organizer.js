var stepData = {
  "comments.json": ["comments"],
  "author.json": ["firstname", "lastname", "body"]
}
var api = {
  filter: function (input, cb) {
    input.stepData = stepData;
    cb(input);
  }
}
application.setInterface(api);
