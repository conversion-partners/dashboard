var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var cheerio = require('cheerio');
var fs = require('fs');
var app = express();
var mime = require('mime');
var mkdirp = require('mkdirp');
var path = require('path');
var loginPage = '/auth/login';
global.__baseDir = __dirname + '/';
if(!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}
if(!Array.prototype.contains) {
  Array.prototype.contains = function (obj) {
    var i = this.length;
    while(i--) {
      if(this[i] === obj) {
        return true;
      }
    }
    return false;
  }
}
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
//app.use(express.json({limit: '50mb'}));
//app.use(express.urlencoded({limit: '50mb'}));
/** passport **/
var passport = require('passport');
var Strategy = require('passport-local')
  .Strategy;
var db = require('./db');
// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(function (username, password, cb) {
  db.users.findByUsername(username, function (err, user) {
    if(err) {
      return cb(err);
    }
    if(!user) {
      return cb(null, false);
    }
    if(user.password != password) {
      return cb(null, false);
    }
    return cb(null, user);
  });
}));
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function (id, cb) {
  db.users.findById(id, function (err, user) {
    if(err) {
      return cb(err);
    }
    cb(null, user);
  });
});
// Configure view engine to render EJS templates.
app.set('views', __dirname + '/panels/login/views');
app.set('view engine', 'ejs');
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined', {
  skip: function (req, res) {
    return res.statusCode < 400
  }
}));
app.use(require('cookie-parser')());
//app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
// Define routes.
app.get('/auth/', function (req, res) {
  res.render('home', {
    user: req.user
  });
});
app.get('/auth/login', function (req, res) {
  res.render('login');
});
app.get('/login', function (req, res) {
  res.redirect('/dashboard/');
  //res.status(200) // HTTP status 404: NotFound
  //  .send('');
});
app.post('/auth/login', passport.authenticate('local', {
  failureRedirect: '/auth/login'
}), function (req, res) {
  //console.log(req);
  res.redirect('/dashboard/');
});
app.get('/auth/logout', function (req, res) {
  req.logout();
  res.redirect('/auth/');
});
app.get('/auth/profile', require('connect-ensure-login')
  .ensureLoggedIn(loginPage),
  function (req, res) {
    res.render('profile', {
      user: req.user
    });
  });
/** passport **/
var bodyParser = require('body-parser');
app.use(bodyParser({
  limit: '200kb'
}));
//app.use(bodyParser.json({limit: '1500kb'}));
//app.use(bodyParser.urlencoded({limit: '1500kb', extended: true}));
app.use('/api/session/get/user', require('connect-ensure-login')
  .ensureLoggedIn(loginPage),
  function (req, res) {
    res.writeHead(200, {
      "Content-Type": "application/json" //contentType
    });
    delete req.user.password;
    var sessionFile = "data/accounts/" + req.user.account + "/sites/data/global-session.json";
    fs.readFile(sessionFile, 'utf8', function (err, data) {
      console.log(data);
      if(typeof data !== 'undefined') {
        data = JSON.parse(data);
        var userdata = {
          user: req.user,
          session: data,
          error: err
        }
        res.write(JSON.stringify(userdata));
        res.end();
      } else {
        res.write(JSON.stringify({
          user: {}
        }));
        res.end();
      }
    });
  });
/**


handleSessionWrite

**/
function getResultModel() {
  return {
    error: {},
    session: {}
  };
}

function isOtherUserBusy(user, data) {
  if(data.site.menu.write !== user && data.site.menu.write.length !== 0) {
    return true;
  }
  return false;
}

function writeSessionData(req, res, file, data) {
  fs.writeFile(file, JSON.stringify(data), function (err) {
    var result = getResultModel();
    if(err) {
      result.error = err;
      result.session = data;
      sendSessionData(req, res, result);
    } else {
      result.session = data;
      sendSessionData(req, res, result);
    }
  });
}

function sendSessionData(req, res, result) {
  result.session.whoami = req.user.username;
  res.write(JSON.stringify(result));
  res.end();
}

function updateSessionDataWithUser(file, req, res, data, set) {
  var user = req.user.username;
  var result = getResultModel();
  if(data.site.menu.write == user) {
    result.session = data;
    sendSessionData(req, res, result);
  } else if(isOtherUserBusy(user, data)) {
    result.session = data;
    sendSessionData(req, res, result);
  } else if(data.site.menu.write.length === 0) {
    data.site.menu.write = user;
    writeSessionData(req, res, file, data);
  }
}

function removeUserFromSessionData(file, req, res, data, set) {
  var user = req.user.username;
  var result = getResultModel();
  if(data.site.menu.write === user) {
    data.site.menu.write = "";
    writeSessionData(req, res, file, data);
  } else {
    result.session = data;
    sendSessionData(req, res, result);
  }
}

function updateSessionDataWriteUser(file, req, res, data, set) {
  if(set) {
    updateSessionDataWithUser(file, req, res, data, set);
  } else {
    removeUserFromSessionData(file, req, res, data, set);
  }
}

function createSessionData(file, req, res, set) {
  var user = req.user.username;
  var session = {
    site: {
      menu: {
        write: "",
        message: ""
      }
    }
  }
  session.site.menu.write = set ? user : "";
  mkdirp(path.dirname(file), function (err) {
    writeSessionData(req, res, file, session);
  });
}

function sessionDataExists(file, req, res, data, set) {
  updateSessionDataWriteUser(file, req, res, data, set);
}

function sessionDoesNotExists(file, req, res, set) {
  createSessionData(file, req, res, set);
}

function handleSessionWrite(req, res, set) {
  set = (set == "true") ? true : false;
  if(typeof req.session.app == 'undefined') {
    req.session.app = {}
  }
  var file = "data/accounts/" + req.user.account + "/sites/data/global-session.json";
  fs.readFile(file, 'utf8', function (err, data) {
    if(err || typeof data == 'undefined') {
      sessionDoesNotExists(file, req, res, set);
    } else {
      sessionDataExists(file, req, res, JSON.parse(data), set);
    }
  });
}
/**



handleSessionWrite

**/
/**



'/api/session/set/perm/write'

**/
app.use('/api/session/set/perm/write/:set', require('connect-ensure-login')
  .ensureLoggedIn(loginPage),
  function (req, res) {
    console.log("------------------------------------------------------------------------------------------");
    //console.log(req);
    res.writeHead(200, {
      "Content-Type": "application/json" //contentType
    });
    delete req.user.password;
    var result = handleSessionWrite(req, res, req.params.set);
  });
/**



'/api/session/set/perm/write'

  **/
function saveGeneralFile(directory, file, req) {
  mkdirp(directory, function (err) {
    fs.writeFile(file, req.body.content, function (err) {
      if(err) {
        return console.log(err);
      }
      console.log("this file was saved : ");
      console.log(file);
    });
  });
}

function isMenuFile(file) {
  //var pageDb = "../dashboard/data/accounts/" + account + "/sites/data/pages.json";
  //..\/dashboard\/data\/accounts\/[a-zA-Z0-9._-]+\/sites\/[a-zA-Z0-9._-]+\/sites/data/pages.json
  //var pageMenu = "../dashboard/data/accounts/" + account + "/sites/easydrain.com_en-null/menu";
  //../dashboard/data/accounts/easydrain/sites/easydrain.com_en-null/menu/page-menu-easydrain.com-en-.json
  //..\/dashboard\/data\/accounts\/[a-zA-Z0-9._-]+\/sites\/[a-zA-Z0-9._-]+\/menu\/page-menu-[a-zA-Z0-9._-]+.json
  //var templateDb = "../dashboard/data/accounts/" + account + "/themes/bower_components/core9-theme-ess/data/templates.json";
  // ../dashboard/data/accounts/easydrain/themes/bower_components/core9-theme-ess/data/templates.json
  // ..\/dashboard\/data\/accounts\/[a-zA-Z0-9._-]+\/themes\/bower_components\/[a-zA-Z0-9._-]+\/data\/templates.json
  //var templateMenu = "../dashboard/data/accounts/" + account + "/themes/bower_components/core9-theme-ess/global-data/";
  /// ../dashboard/data/accounts/easydrain/themes/bower_components/core9-theme-ess/global-data/theme-menu-core9-theme-ess--.json
  // ..\/dashboard\/data\/accounts\/[a-zA-Z0-9._-]+\/themes\/bower_components\/[a-zA-Z0-9._-]+\/global-data\/theme-menu-[a-zA-Z0-9._-]+.json
  var menuFilesPatterns = ["..\/dashboard\/data\/accounts\/[a-zA-Z0-9._-]+\/sites/data/pages.json", "..\/dashboard\/data\/accounts\/[a-zA-Z0-9._-]+\/sites\/[a-zA-Z0-9._-]+\/menu\/page-menu-[a-zA-Z0-9._-]+.json", "..\/dashboard\/data\/accounts\/[a-zA-Z0-9._-]+\/themes\/bower_components\/[a-zA-Z0-9._-]+\/data\/templates.json", "..\/dashboard\/data\/accounts\/[a-zA-Z0-9._-]+\/themes\/bower_components\/[a-zA-Z0-9._-]+\/global-data\/theme-menu-[a-zA-Z0-9._-]+.json"];
  var re = new RegExp(menuFilesPatterns.join("|"), "i");
  return(file.match(re) != null);
}

function isAllowedToSaveMenuFile(user, account, directory, file, req) {
  var sessionFile = "data/accounts/" + account + "/sites/data/global-session.json";
  fs.readFile(sessionFile, 'utf8', function (err, data) {
    console.log(data);
    data = JSON.parse(data);
    if(err || typeof data == 'undefined') {
      console.log(JSON.stringify(err));
    } else {
      console.log("working user is : ");
      console.log(data.site.menu.write);
      if(data.site.menu.write === user) {
        console.log("user : " + user + " can write");
        saveGeneralFile(directory, file, req);
      } else {
        console.log("user : " + user + " can not write");
      }
    }
  });
}

function isAllowedToSave(accountPath, file) {
  var save = true;
  if(!file.startsWith(accountPath)) {
    save = false;
  }
  return save;
}
app.post('/api/io/:action', require('connect-ensure-login')
  .ensureLoggedIn(loginPage),
  function (req, res) {
    var user = req.user.username;
    var account = req.user.account;
    var accountPath = "../dashboard/data/accounts/" + account;
    switch(req.params.action) {
    case 'save':
      var file = ".." + req.body.file;
      var directory = path.dirname(file);
      console.log(JSON.stringify({
        user: user,
        account: account
      }));
      console.log("trying to save file : ");
      console.log(file);
      if(isAllowedToSave(accountPath, file)) {
        if(isMenuFile(file)) {
          console.log("is a menu file");
          isAllowedToSaveMenuFile(user, account, directory, file, req);
        } else {
          console.log("is a not menu file");
          console.log("this file can be saved");
          saveGeneralFile(directory, file, req);
        }
      }
      break;
    default:
      console.log("end of api req");
      //console.log(req);
    }
    res.sendStatus(200);
  });
app.use('/dashboard/data/accounts/:account/sites/:domain/global-data/get-data-items', require('connect-ensure-login')
  .ensureLoggedIn(loginPage),
  function (req, res) {
    //console.log(this);
    var p = req.params;
    var globalDataDir = '../dashboard/data/accounts/' + p.account + '/sites/' + p.domain + '/global-data';
    var file = '..' + req.originalUrl;
    //var contentType = mime.lookup(file);
    // FIXME errorhandling
    res.writeHead(200, {
      "Content-Type": "application/json" //contentType
    });

    function getFilesNoExt(dir) {
      var files_ = [];
      var files = fs.readdirSync(dir);
      for(i = 0; i < files.length; i++) {
        var file = files[i].replace('.json', '');
        files_.push(file);
      }
      return files_;
    }
    var fileArr = getFilesNoExt(globalDataDir);
    var globalData = [];
    for(var i = 0; i < fileArr.length; i++) {
      globalData.push(fileArr[i].replace('.json', ''));
    }
    res.write(JSON.stringify(globalData));
    res.end();
  });
app.use('/dashboard/data/accounts/:account/themes/bower_components/:theme/templates/pages/:page/versions/:version/index.html', require('connect-ensure-login')
  .ensureLoggedIn(loginPage),
  function (req, res) {
    //console.log(this);
    var p = req.params;
    var defaultGridFile = '../dashboard/data/accounts/' + p.account + '/themes/bower_components/' + p.theme + '/templates/pages/default-grid.html';
    var file = '..' + req.originalUrl;
    var contentType = mime.lookup(file);
    // FIXME errorhandling
    res.writeHead(200, {
      "Content-Type": contentType
    });
    fs.readFile(file, 'utf8', function (err, data) {
      if(err) {
        fs.readFile(defaultGridFile, 'utf8', function (err, data) {
          if(err) {
            return console.log(err);
          } else {
            res.write(data);
            res.end();
          }
        });
        //return console.log(err);
      } else {
        res.write(data);
        res.end();
      }
    });
  });
/**
app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });
**/
app.use('/dashboard/', require('connect-ensure-login')
  .ensureLoggedIn(loginPage), express.static('.'));
//app.use('/dashboard/', express.static('.'));
app.use('/*', function (req, res) {
  //res.redirect('/dashboard/');
  res.status(200) // HTTP status 404: NotFound
    .send('');
});
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
//var hostname = "localhost";//config.hostname;//"localhost";
console.log("config : ");
console.log(config);
var server = app.listen(3000, config.hostname, function () {
  var host = server.address()
    .address;
  var port = server.address()
    .port;
  console.log('Example app listening at http://%s:%s', host, port);
});
