var fs = require('fs');

var userFile = '../data/users.json';

module.exports = {
  users : {
    get : function *(){
      var data = yield fs.readFile(userFile, 'utf-8');
      return JSON.parse(data);
    },
    save : function *(){

    }
  }
}
