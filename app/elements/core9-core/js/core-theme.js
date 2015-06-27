if (typeof Core9 === 'undefined') {
	Core9 = {}
};

Core9.theme = {
    __repo : {
      themes : []
    },
    get : function(callback){
        this.__async([this.__do('GET', '/dashboard/themes/bower.json', 'json', this.__getThemes)],callback);
    },
    __getThemes : function(bowerData, resolve){
      var json = JSON.parse(bowerData);
      console.log(json);
      //,this.__do('GET', '/dashboard/themes/bower_components/core9-theme-example/bower.json')
      for (var key in json) {
          if (p.hasOwnProperty(key)) {
            console.log(key + " -> " + json[key]);
          }
      }
      resolve(json);
    },
    __async : function(iterable, callback){
      Promise.all(iterable)
       .then(values => {
           callback(values);
        });
    },
    __do : function(method, url,contentType, callback) {
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open(method, url);
        if(contentType == null || contentType == "json"){
          contentType = "application/json;";
        }
        req.setRequestHeader("Content-Type",
            contentType + " charset=utf-8");
        req.onload = function() {
          if (req.status == 200) {
            if (typeof callback == 'function'){
              callback(req.response, resolve);
            }else{
              resolve(req.response);
            }
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
