Core9.select = {
  collection: Core9.data.templates,
  __session: {},
  setSession: function(session) {
    Core9.select.__session = session;
  },
  getThemeNames: function() {
    var mapFun = function(obj) {
      return obj.template;
    }
    return Core9.data.templates.mapReduce(mapFun, reduceFun);
  },
  getLanguageNames: function() {
    var mapFun = function(obj) {
      if (Core9.select.__session.template == obj.template) {
        return obj.language;
      }
    }
    return Core9.data.templates.mapReduce(mapFun, reduceFun);
  },
  getCountryNames: function() {
    var mapFun = function(obj) {
      if (Core9.select.__session.template == obj.template && Core9.select.__session.language == obj.language) {
        return obj.country;
      }
    }
    return Core9.data.templates.mapReduce(mapFun, reduceFun);
  },
  getTemplateNames: function() {
    var mapFun = function(obj) {
      if (Core9.select.__session.template == obj.template && Core9.select.__session.language == obj.language && Core9.select.__session.country == obj.country) {
        return obj.page;
      }
    }
    return Core9.data.templates.mapReduce(mapFun, reduceFun);
  },
  getVersionNames: function() {
    var mapFun = function(obj) {
      if (Core9.select.__session.template == obj.template && Core9.select.__session.language == obj.language && Core9.select.__session.country == obj.country && Core9.select.__session.page == obj.page) {
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
    return Core9.data.templates.mapReduce(mapFun, reduceFun);
  }
}
