var fs = require('fs');

function getAccounts(dir) {
  var files_ = [];
  var files = fs.readdirSync(dir);
  for(i = 0; i < files.length; i++) {
    //var file = files[i].replace('.json', '');
    files_.push(files[i]);
  }
  return files_;
}
var accountBaseDir = __baseDir + 'data/accounts/';
var accountDirs = getAccounts(accountBaseDir);
console.log('accounts : ');
console.log(accountDirs);
var records = [];
var accounts = [];
for(i = 0; i < accountDirs.length; i++) {
  var userDb = require(__baseDir + 'data/accounts/' + accountDirs[i] + '/users/users.js');
  console.log(userDb);
  records = records.concat(userDb.records);
}
//var records = orgRecords.concat(userDb.records);
console.log('records :');
console.log(JSON.stringify(records));
exports.findById = function (id, cb) {
  process.nextTick(function () {
    var idx = id - 1;
    if(records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}
exports.findByUsername = function (username, cb) {
  process.nextTick(function () {
    for(var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if(record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}
