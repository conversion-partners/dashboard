// provides the method to square a number
var api = {
    filter: function(input, cb) {
        // result reported to the callback
        console.log('from form-data-organizer.js');
        console.log(input);
        cb(input);
    }
}

// exports the api to the application environment
application.setInterface(api);
