
var stepData = {
  "comments.json" : ["comments"],
  "author.json" : ["author", "body"]
}



var api = {
    filter: function(input, cb) {
        console.log('from form-data-organizer.js');
        input.stepData = stepData;
        console.log(input);
        cb(input);
    }
}

// exports the api to the application environment
application.setInterface(api);
