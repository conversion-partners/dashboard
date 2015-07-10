var gulp       = require( 'gulp' ),
    server     = require( 'gulp-develop-server' ),
    livereload = require( 'gulp-livereload' ),
    shell = require('gulp-shell');

var options = {
    path: './app.js'
};

var serverFiles = [];


gulp.task('shorthand', shell.task([
  'cd data/accounts/easydrain/; /usr/bin/node /var/www/html/dashboard/node_modules/nide/main.js -p 9999 --no-browser'
]));

gulp.task('shorthand2', shell.task([
  '/usr/bin/node /var/www/html/dashboard/proxy.js'
]));

gulp.task('shorthand3', shell.task([
  '/usr/bin/node /var/www/html/dashboard/app.js'
]));

gulp.task( 'server:start', function() {
    server.listen( options, livereload.listen );
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

gulp.task( 'default', ['shorthand3','shorthand', 'shorthand2' ], function() {

});
