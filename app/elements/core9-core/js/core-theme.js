if (typeof Core9 === 'undefined') {
  Core9 = {}
};

Core9.theme = {
  __repo: {
    themes: []
  },
  get: function(callback) {
    this.__async([this.__do('GET', '/dashboard/themes/bower.json', 'json', this.__getThemes)], callback);
  },
  __getThemes: function(bowerData, resolve) {
    Core9.theme.__repo = JSON.parse(bowerData);
    if(Object.keys(Core9.theme.__repo.dependencies).lenght == 0){
				resolve(Core9.theme.__repo);
		}
    var itterable = [];
		for (var key in Core9.theme.__repo.dependencies) {
      if (Core9.theme.__repo.dependencies.hasOwnProperty(key)) {
				itterable.push(Core9.theme.__do('GET', '/dashboard/themes/bower_components/'+key+'/bower.json'));
      }
    }
		Core9.theme.__async(itterable, function(data){
			var themes = [];
			var themeData = [];
			for (var i = 0; i < data.length; i++) {
				var j = JSON.parse(data[i]);
				themes.push(j);
				themeData.push(Core9.theme.__do('GET', '/dashboard/themes/bower_components/' + j.name + '/' + j.main));
			}

			Core9.theme.__async(themeData, function(dat){
					for (var i = 0; i < dat.length; i++) {
							themes[i]['data'] = JSON.parse(dat[i]);
					}
					Core9.theme.__repo['themes'] = themes;
					resolve(Core9.theme.__repo);
			});


		});
  },
  __async: function(iterable, callback) {
    Promise.all(iterable)
      .then(values => {
        callback(values);
      });
  },
  __do: function(method, url, contentType, callback) {
    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();
      req.open(method, url);
      if (contentType == null || contentType == "json") {
        contentType = "application/json;";
      }
      req.setRequestHeader("Content-Type",
        contentType + " charset=utf-8");
      req.onload = function() {
        if (req.status == 200) {
          if (typeof callback == 'function') {
            callback(req.response, resolve);
          } else {
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

export {
  THEME
}
