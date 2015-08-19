var stepData = {
  "comments.json": ["comments"],
  "author.json": ["author", "body"]
}
var api = {
  filter: function (input, cb) {
    input.stepData = stepData;
    cb(input);
  }
}
application.setInterface(api);
