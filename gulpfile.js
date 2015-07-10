var gulp       = require( 'gulp' ),
    server     = require( 'gulp-develop-server' ),
    livereload = require( 'gulp-livereload' ),
    shell = require('gulp-shell');

var options = {
    path: './app.js'
};

var serverFiles = [];


gulp.task('shorthand', shell.task([
  'cd data/accounts/easydrain/; /usr/bin/node /var/www/html/dashboard/node_modules/nide/main.js -p 9999 --no-browser',
  'echo hello',
  'echo world'
]));

gulp.task( 'server:start', function() {
    server.listen( options, livereload.listen );
});

// If server scripts change, restart the server and then livereload.
gulp.task( 'default', ['shorthand', 'server:start' ], function() {

    function restart( file ) {
        server.changed( function( error ) {
            if( ! error ) livereload.changed( file.path );
        });
    }

    gulp.watch( serverFiles ).on( 'change', restart );
});
