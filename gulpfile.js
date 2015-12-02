var gulp = require('gulp'),
  server = require('gulp-develop-server'),
  livereload = require('gulp-livereload'),
  shell = require('gulp-shell');

var options = {
  path: './app.js'
};

var serverFiles = [];

var fs = require('fs');

var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
console.log("config : ");
console.log(config);

gulp.task('shorthand', shell.task([
  'cd ' + __dirname + '/data/accounts/easydrain/; /usr/bin/node ' + __dirname + '/node_modules/nide/main.js  -H ' + config.hostname + ' -p 9999 --no-browser'
]));

gulp.task('shorthand2', shell.task([
  '/usr/bin/node ' + __dirname + '/proxy.js'
]));

gulp.task('shorthand3', shell.task([
  //'/usr/local/bin/node-debug '+__dirname+'/app.js'
  '/usr/bin/node ' + __dirname + '/app.js'
]));



gulp.task('shorthand4', shell.task([
  "cd " + __dirname + '/data/accounts/easydrain; /usr/bin/node ' + __dirname + '/node_modules/nide/main.js init --no-browser'
]));

gulp.task('server:start', function() {
  server.listen(options, livereload.listen);
});

// If server scripts change, restart the server and then livereload.
/**
gulp.task( 'default', ['shorthand2','shorthand', 'server:start' ], function() {

    function restart( file ) {
        server.changed( function( error ) {
            if( ! error ) livereload.changed( file.path );
        });
    }

    gulp.watch( serverFiles ).on( 'change', restart );
});
**/



gulp.task('watch-folder', function() {
  gulp.watch('./data/accounts/easydrain/sites/**/*', ['copy-folder']);
});

gulp.task('copy-folder', function() {
  gulp.src('./data/accounts/easydrain/sites/**/*')
    .pipe(gulp.dest('/var/www/easy-sanitary-solutions/html/dashboard/data/accounts/easydrain/sites'));
});




gulp.task('default', ['shorthand4', 'shorthand3', 'shorthand', 'shorthand2', 'watch-folder'], function() {

});
