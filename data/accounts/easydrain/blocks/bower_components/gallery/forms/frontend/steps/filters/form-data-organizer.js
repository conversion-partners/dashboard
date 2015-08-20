var stepData = {
  "comments.json": ["comments"],
  "author.json": ["author.firstName", "author.lastName", "body"]
}
var api = {
  filter: function (input, cb) {
    input.stepData = stepData;
    cb(input);
  }
}
application.setInterface(api);
