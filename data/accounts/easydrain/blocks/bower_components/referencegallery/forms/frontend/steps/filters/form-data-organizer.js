var stepData = {
  "article.json": ["articles"],
  "description.json": ["title", "subtitle", "gallerydescription"]
}
var api = {
  filter: function (input, cb) {
    input.stepData = stepData;
    cb(input);
  }
}
application.setInterface(api);
