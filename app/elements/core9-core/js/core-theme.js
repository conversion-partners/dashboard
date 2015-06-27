if (typeof Core9 === 'undefined') {
	Core9 = {}
};

Core9.theme = {
    __repo : {
      themes : []
    },
    get : function(callback){
        this.__async([this.__do('GET', '/dashboard/themes/bower.json'),this.__do('GET', '/dashboard/themes/bower_components/core9-theme-example/bower.json')],callback);
    },
    __parseBower : function (callback) {

    this.__do('GET', '/dashboard/themes/bower.json').then(function(response) {
      Core9.theme.__repo.bower = JSON.parse(response);
        var obj = Core9.theme.__repo.bower.dependencies;
        for (var prop in obj) {
          if( obj.hasOwnProperty( prop ) ) {
            var theme = {
              "name" : prop,
              "version" : obj[prop]
            }
            Core9.theme.__repo.themes.push(theme);
          }
        }
        callback(Core9.theme.__repo);
      }, function(error) {
        console.log(error);
      });

    },
    __async : function(iterable, callback){
      Promise.all(iterable)
       .then(values => {
           callback(values);
        });
    },
    __do : function(method, url,contentType) {
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open(method, url);
        if(contentType == null){
          contentType = "application/json;";
        }
        req.setRequestHeader("Content-Type",
            contentType + " charset=utf-8");
        req.onload = function() {
          if (req.status == 200) {
            resolve(req.response);
          } else {
            reject(Error(req.statusText));
          }
        };
        req.onerror = function() {
          reject(Error("Network Error"));
        };
        req.send();

      });
    }

}


var THEME = Core9.theme;

export
{
	THEME
}
