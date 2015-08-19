// provides the method to square a number



var steps = {
  "comments.json" : "",
  "author.json" : ""
}

function getUserOrDefaultData(input){
  // check data
  return input.data.userData;
}

function setCorrectData(input){
  var data = getUserOrDefaultData(input);
}

var api = {
    save: function(input, cb) {
        // result reported to the callback
        console.log('from save.js');
        console.log(input);
        cb(input);
    }
}

// exports the api to the application environment
application.setInterface(api);
