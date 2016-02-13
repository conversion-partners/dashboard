var records = [{
  id: 1,
  username: 'robert',
  password: 'secret',
  account: 'easydrain',
  displayName: 'robert',
  emails: [{
    value: 'robert@easydrain.com'
  }]
}, {
  id: 2,
  username: 'rogier',
  password: 'secret',
  account: 'easydrain',
  displayName: 'rogier',
  emails: [{
    value: 'rogier@easydrain.com'
  }]
}, {
  id: 3,
  username: 'maarten',
  password: 'secret',
  account: 'easydrain',
  displayName: 'maarten',
  emails: [{
    value: 'maarten@easydrain.com'
  }]
}];
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
