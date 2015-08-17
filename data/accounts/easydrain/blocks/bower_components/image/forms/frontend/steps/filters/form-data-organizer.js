// provides the method to square a number
var api = {
    filter: function(input, cb) {
        // result reported to the callback
        cb(input);
    }
}

// exports the api to the application environment
application.setInterface(api);
