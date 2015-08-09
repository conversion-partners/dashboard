

Core9.select = {
  collection: Core9.data.themes,
  __session: {},
  setSession: function(session) {
    Core9.select.__session = session;
  },
  getSession: function() {
    return Core9.select.__session;
  },
  getThemeNames: function() {
    var mapFun = function(obj) {
      return obj.template;
    }
    return Core9.data.themes.mapReduce(mapFun, reduceFun);
  },
  getLanguageNames: function() {
    var mapFun = function(obj) {
      if (Core9.select.__session.theme == obj.theme) {
        return obj.language;
      }
    }
    return Core9.data.themes.mapReduce(mapFun, reduceFun);
  },
  getCountryNames: function() {
    var mapFun = function(obj) {
      if (Core9.select.__session.theme == obj.theme && Core9.select.__session.language == obj.language) {
        return obj.country;
      }
    }
    return Core9.data.themes.mapReduce(mapFun, reduceFun);
  },
  getTemplateNames: function() {
    var mapFun = function(obj) {
      if (Core9.select.__session.theme == obj.theme && Core9.select.__session.language == obj.language && Core9.select.__session.country == obj.country) {
        return obj.template;
      }
    }
    return Core9.data.themes.mapReduce(mapFun, reduceFun);
  },
  getVersionNames: function() {
    var mapFun = function(obj) {
      if (Core9.select.__session.theme == obj.theme && Core9.select.__session.language == obj.language && Core9.select.__session.country == obj.country && Core9.select.__session.template == obj.template) {
        var name = [];
        for (var i = 0; i < obj.versions.length; i++) {
          var version = obj.versions[i];
          if (version.status == "active") {
            name.push(version.title);
          }
        }
        return name;
      }
    }
    var reduceFun = function(obj){
      var res = obj[obj.length - 1]; // FIXME why is this???

      for (var i = 0; i < obj.length; i++) {
        var arr = obj[i];
        if(typeof arr != 'undefined'){
          return arr;
        }
      }

      return res;
    }
    return Core9.data.themes.mapReduce(mapFun, reduceFun);
  }
}
