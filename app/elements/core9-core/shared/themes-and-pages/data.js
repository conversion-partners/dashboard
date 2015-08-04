if (typeof Core9 === 'undefined') {
  Core9 = {}
};

Core9.data = {
  "templates": new loki.Collection('templates'),
  "pages": new loki.Collection('pages'),
  "blocks": new loki.Collection('blocks')
}

Core9.template = {
  paths: {
    "template": "/dashboard/data/accounts/{0}/themes/bower_components/{1}/data/templates.json",
    "blocks": "/dashboard/data/accounts/{0}/themes/bower_components/{1}/data/blocks.json",
    "pages": "/dashboard/data/accounts/{0}/sites/data/pages.json",
    "bower": "/dashboard/data/accounts/{0}/themes/bower.json"
  },
  templates: [],
  pages: [],
  account: store.get('account'),
  init: function() {
    this.dataInit();
  },
  dataInit: function() {

    Core9.j(Core9.template.paths.bower.format(Core9.template.account)).then(function(data) {
      var json = JSON.parse(data.currentTarget.response);
      var themes = json.dependencies;
      var themeData = [];
      var blockData = [];
      var pageData = [];
      Object.keys(themes).forEach(function(key) {
        themeData.push(Core9.j(Core9.template.paths.template.format(Core9.template.account, key)));
        blockData.push(Core9.j(Core9.template.paths.blocks.format(Core9.template.account, key)));
      });
      pageData.push(Core9.j(Core9.template.paths.pages.format(Core9.template.account)));

      var allData = [];
      allData.push(Core9.template.dataCollect(Core9.data.templates, themeData));
      allData.push(Core9.template.dataCollect(Core9.data.blocks, blockData));
      allData.push(Core9.template.dataCollect(Core9.data.pages, pageData));

      Promise.settle(allData).then(function(results) {
        var len = 0;
        results.forEach(function(result) {
          if (result.isFulfilled()) {
            len++;
          } else {
            console.log(result.reason());
          }
        });
        if (len == allData.length) {
          Core9.template.dataReady();
        } else {
          //raise exeption
        }
      });

    });

  },

  cleanJsonCollection: function(json) {

    for (var i = 0; i < json.length; i++) {
      var obj = json[i];
      delete obj.$loki;
      delete obj.meta;
    }

    return json;
  },

  dataCollect: function(collection, data) {
    return Promise.settle(data).then(function(results) {
      results.forEach(function(result) {
        if (result.isFulfilled()) {
          var json = JSON.parse(result.value().currentTarget.response);
          json = Core9.template.cleanJsonCollection(json);
          //console.log(json);
          collection.insert(json);
        } else {
          console.log(result.reason());
        }
      });
    });
  },
  showData: function() {
    console.log('template : ');
    console.log(Core9.data.templates.data);
    console.log('page : ');
    console.log(Core9.data.pages.data);
    console.log('block : ');
    console.log(Core9.data.blocks.data);
  },
  dataReady: function() {
    Core9.template.showData();
    Core9.template.templates = Core9.template.getThemesOrSites('templates', Core9.data.templates);
    Core9.template.templates.splice(0, 0, " "); // add first empty option
    Core9.template.pages = Core9.template.getThemesOrSites('pages', Core9.data.pages);
    Core9.template.pages.splice(0, 0, " "); // add first empty option
    //Core9.template.save();
  },
  save: function() {

    Core9.template.saveData('templates', Core9.data.templates);
    Core9.template.saveData('blocks', Core9.data.blocks);
    Core9.data.pages

  },
  getThemesOrSites: function(type, collection) {
    var mapFun = function(obj) {
    	if(type == 'templates'){
    	      return obj.template;
    	}
    	if(type == 'pages'){
    	      return obj.domain;
    	}
    }
    var reduceFun = function(array) {
      return Core9.deDupeArray(array);
    }
    return collection.mapReduce(mapFun, reduceFun);
  },
  saveData: function(type, collection) {
    var themes = Core9.template.getThemesOrSites(type, collection);
    for (var i = 0; i < themes.length; i++) {
      var theme = themes[i];
      var data = collection.find({
        "template": theme
      });
      if (type == 'templates') {
        Core9.template.saveTemplateData(theme, data);
      }
      if (type == 'blocks') {
        Core9.template.saveBlockData(theme, data);
      }
      //console.log(theme, type);
      //console.log(data);
    }
  },
  saveTemplateData: function(theme, data) {
    var url = Core9.template.paths.template.format(Core9.template.account, theme);
    console.log(url);

    $.ajax({
      type: "POST",
      url: "http://localhost:9090/api/io/" + "save",
      data: {
        content: JSON.stringify(data),
        file: url,
        account: Core9.template.account
      }
    });

  },
  saveBlockData: function(theme, data) {
    var url = Core9.template.paths.blocks.format(Core9.template.account, theme);
    console.log(url);
    $.ajax({
      type: "POST",
      url: "http://localhost:9090/api/io/" + "save",
      data: {
        content: JSON.stringify(data),
        file: url,
        account: Core9.template.account
      }
    });
  }
};

Core9.template.init();
