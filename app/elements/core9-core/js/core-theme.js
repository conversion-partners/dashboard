if (typeof Core9 === 'undefined') {
	Core9 = {}
};

Core9.theme = {
    get : function(){

    },

    __do : function(method, url) {
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open(method, url);
        req.setRequestHeader("Content-Type",
            "application/hal+json; charset=utf-8");
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
