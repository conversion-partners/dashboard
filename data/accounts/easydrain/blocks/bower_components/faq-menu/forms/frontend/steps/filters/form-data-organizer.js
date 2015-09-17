var stepData = {
  "article.json": ["categories"],
  "description.json": ["title"],
  "settings.json": ["settings"]
}
var api = {
  filter: function (input, cb) {
    input.stepData = stepData;
    cb(input);
  }
}
application.setInterface(api);
