

describe('user data', function(){
  it('should have +1 user count after saving', function* (){
    var users = yield data.users.get();

    yield data.users.save({ name : 'John' });

    var newUsers = yield data.users.get();

    newUsers.lenght.should.equal(users.length + 1);
  });
})
