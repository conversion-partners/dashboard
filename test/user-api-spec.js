require('co-mocha');
var should = require('should');
var data = require('../vendor/users/user-data.js');

describe('user data', function(){
  it('should have +1 user count after saving', function* (){
    var users = yield data.users.get();

    console.log(users);

    yield data.users.save({ name : 'John' });

    var newUsers = yield data.users.get();

    newUsers.length.should.equal(users.length + 1);
  });
})
