if(typeof Core9 === 'undefined') {
  Core9 = {}
};
Core9.data = {};
Core9.data.themes = new loki.Collection('themes');
Core9.data.pages = new loki.Collection('pages');
Core9.data.blocks = new loki.Collection('blocks');
Core9.data.currentid = {};
Core9.data.languageOptions = [];
Core9.data.countryOptions = [];
Core9.data.templateOptions = [];
Core9.data.versionOptions = [];
Core9.data.pageData = [];
Core9.data.pageDataObj = {
  "domain": "",
  "language": "",
  "country": "",
  "page": "",
  "menuid": "",
  "url": "",
  "versions": [{
    "title": "version-one",
    "theme": "",
    "language": "",
    "country": "",
    "template": "",
    "version": "",
    "percentage": 100,
    "startdate": "",
    "enddate": "",
    "status": "active"
  }]
};
Core9.data.menuDataObj = {
  "theme": "",
  "language": "",
  "country": "",
  "template": "",
  "menuid": "",
  "versions": [{
    "status": "active",
    "title": "New-Page"
  }]
};
Core9.template = {
  paths: {
    "template": "/dashboard/data/accounts/{0}/themes/bower_components/{1}/data/templates.json",
    "blocks": "/dashboard/data/accounts/{0}/themes/bower_components/{1}/data/blocks.json",
    "pages": "/dashboard/data/accounts/{0}/sites/data/pages.json",
    "bower": "/dashboard/data/accounts/{0}/themes/bower.json"
  },
  installedThemes: [],
  allTemplates: [],
  allLanguages: [],
  allCountries: [],
  allVersions: [],
  pages: [],
  account: store.get('account'),
  init: function () {
    this.dataInit();
  },
  dataInit: function () {
    Core9.j(Core9.template.paths.bower.format(Core9.template.account))
      .then(function (data) {
        var json = JSON.parse(data.currentTarget.response);
        var themes = json.dependencies;
        var themeData = [];
        var blockData = [];
        var pageData = [];
        Object.keys(themes)
          .forEach(function (key) {
            Core9.template.installedThemes.push(key);
            themeData.push(Core9.j(Core9.template.paths.template.format(Core9.template.account, key)));
            blockData.push(Core9.j(Core9.template.paths.blocks.format(Core9.template.account, key)));
          });
        pageData.push(Core9.j(Core9.template.paths.pages.format(Core9.template.account)));
        var allData = [];
        allData.push(Core9.template.dataCollect(Core9.data.themes, themeData));
        allData.push(Core9.template.dataCollect(Core9.data.blocks, blockData));
        allData.push(Core9.template.dataCollect(Core9.data.pages, pageData));
        Promise.settle(allData)
          .then(function (results) {
            var len = 0;
            results.forEach(function (result) {
              if(result.isFulfilled()) {
                len++;
              } else {
                console.log(result.reason());
              }
            });
            if(len == allData.length) {
              Core9.template.dataReady();
            } else {
              //raise exeption
            }
          });
      });
  },
  cleanJsonCollection: function (json) {
    for(var i = 0; i < json.length; i++) {
      var obj = json[i];
      delete obj.$loki;
      delete obj.meta;
    }
    return json;
  },
  dataCollect: function (collection, data) {
    return Promise.settle(data)
      .then(function (results) {
        results.forEach(function (result) {
          if(result.isFulfilled()) {
            var json = JSON.parse(result.value()
              .currentTarget.response);
            json = Core9.template.cleanJsonCollection(json);
            //console.log(json);
            collection.insert(json);
          } else {
            console.log(result.reason());
          }
        });
      });
  },
  showData: function () {
    console.log('template : ');
    console.log(Core9.data.themes.data);
    console.log('page : ');
    console.log(Core9.data.pages.data);
    console.log('block : ');
    console.log(Core9.data.blocks.data);
  },
  getAllDataForType: function (type) {
    var mapFun = function (obj) {
      return obj[type];
    }
    return Core9.data.themes.mapReduce(mapFun, reduceFun);
  },
  getAllDataForTypeVersions: function () {
    var mapFun = function (obj) {
      var name = [];
      for(var i = 0; i < obj.versions.length; i++) {
        var version = obj.versions[i];
        if(version.status == "active") {
          name.push(version.title);
        }
      }
      return name;
    }
    var reduceFun = function (obj) {
      return obj[0];
    }
    return Core9.data.themes.mapReduce(mapFun, reduceFun);
  },
  dataReady: function () {
    //Core9.template.showData();
    Core9.template.themes = Core9.template.getThemesOrSites('themes', Core9.data.themes);
    Core9.template.themes.splice(0, 0, " "); // add first empty option
    Core9.template.pages = Core9.template.getThemesOrSites('pages', Core9.data.pages);
    Core9.template.pages.splice(0, 0, " "); // add first empty option
    //Core9.template.save();
    Core9.template.allTemplates = Core9.template.getAllDataForType('template');
    Core9.template.allLanguages = Core9.template.getAllDataForType('language');
    Core9.template.allCountries = Core9.template.getAllDataForType('country');
    Core9.template.allVersions = Core9.template.getAllDataForTypeVersions();
    // fire dataready event
    if(typeof document.body != null) {
      var event = new Event('dataready');
      document.body.dispatchEvent(event);
    }
  },
  save: function () {
    if(TYPEOFPAGE == 'themes') {
      Core9.template.saveData('themes', Core9.data.themes);
    }
    Core9.template.saveData('blocks', Core9.data.blocks);
    if(TYPEOFPAGE == "pages") {
      Core9.template.savePageData('pages', Core9.data.pages);
    }
  },
  getThemesOrSites: function (type, collection) {
    var mapFun = function (obj) {
      if(type == 'themes') {
        return obj.theme;
      }
      if(type == 'pages') {
        return obj.domain;
      }
    }
    var reduceFun = function (array) {
      return Core9.deDupeArray(array);
    }
    return collection.mapReduce(mapFun, reduceFun);
  },
  savePageData: function (type, collection) {
    var url = Core9.template.paths.pages.format(Core9.template.account);
    console.log(url);
    $.ajax({
      type: "POST",
      url: "/api/io/" + "save",
      data: {
        content: JSON.stringify(collection.data),
        file: url,
        account: Core9.template.account
      }
    });
  },
  saveData: function (type, collection) {
    var themes = Core9.template.getThemesOrSites(type, collection);
    for(var i = 0; i < themes.length; i++) {
      var theme = themes[i];
      var data = collection.find({
        "theme": theme
      });
      if(type == 'themes') {
        Core9.template.saveThemeData(theme, data);
      }
      if(type == 'blocks') {
        Core9.template.saveBlockData(theme, data);
      }
    }
  },
  saveThemeData: function (theme, data) {
    var url = Core9.template.paths.template.format(Core9.template.account, theme);
    console.log(url);
    $.ajax({
      type: "POST",
      url: "/api/io/" + "save",
      data: {
        content: JSON.stringify(data),
        file: url,
        account: Core9.template.account
      }
    });
  },
  saveBlockData: function (theme, data) {
    var url = Core9.template.paths.blocks.format(Core9.template.account, theme);
    console.log(url);
    $.ajax({
      type: "POST",
      url: "/api/io/" + "save",
      data: {
        content: JSON.stringify(data),
        file: url,
        account: Core9.template.account
      }
    });
  }
};
Core9.template.init();
