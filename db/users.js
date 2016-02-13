//var userDb = require('../data/accounts/easydrain/users/user.js');
var userDb = require(__baseDir + 'data/accounts/easydrain/users/users.js');
console.log(userDb);
var orgRecords = [];
var records = orgRecords.concat(userDb.records);
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
