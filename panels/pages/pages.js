TYPEOFPAGE = 'pages';

var reduceFun = function(array) {
  return Core9.deDupeArray(array);
}

function getCountryOptions() {
  var mapFun = function(obj) {
    return obj.country;
  }
  return Core9.data.templates.mapReduce(mapFun, reduceFun);
}

function getLanguageOptions() {
  var mapFun = function(obj) {
    return obj.language;
  }
  return Core9.data.templates.mapReduce(mapFun, reduceFun);
}

function getTemplateName(pageData) {
  var pageVersion = getActiveTab();
  //var version = pageData;//Core9.data.page.pageData.versions[pageVersion];

  var templateNames = [];

  var query = {
    "page": pageData.version.versions[pageVersion].template,
    "language": "", //version.language,
    "country": "" //$('#editor_holder2 > div > div.rows > div.col-md-10 > div:nth-child(1) > div.well.well-sm > div > div > div:nth-child(4) > div > div.form-group > select').val()
  }
  var result = Core9.data.templates.findObjects(query);
  for (var i = 0; i < result.length; i++) {
    var template = result[i];
    templateNames.push(template.page);
  }
  templateNames.push(" ");
  //
  return templateNames;
}

function getTemplateVersion() {
  var pageVersion = getActiveTab();
  var pageData = Core9.data.page.pageData; //.versions[pageVersion];
  var query = {
    "template": pageData.template,
    "language": pageData.language,
    "country": pageData.country,
    "page": Core9.data.page.page
  }
  var result = Core9.data.templates.findObjects(query);
  //
  return ['test'];
}

function getActiveTab() {
  var tabs = $('#editor_holder2 > div > div.rows > div.tabs.list-group.col-md-2 > a.list-group-item');
  for (var i = 0; i < tabs.length; i++) {
    var tab = tabs[i];
    if ($(tab).hasClass("active")) {
      return i;
    }
  }
  return 0;
}

function setActiveTab(tab) {
  $('#editor_holder2 > div > div.rows > div.tabs.list-group.col-md-2 > a.list-group-item').eq(tab)[0].click();
}

Core9.data.tmp = {};

function setPageVersions(version, selectBox, value) {
  if (Core9.data.tmp != value) {
    Core9.data.page.pageData.versions[version][selectBox] = value;
    Core9.data.language = getLanguageOptions();
    if (selectBox == "theme") {
      Core9.data.countries = [];
    }
    if (selectBox == "language") {
      Core9.data.countries = getCountryOptions();
    }
    if (selectBox == "country") {
      console.log('country selected : ');
      // fck json editor select2 bug!!!
    }
    activateEditor(Core9.data.page.page, Core9.data.page.id, Core9.data.page.pageData);
    setActiveTab(version);
    Core9.data.tmp = value;
  }
}



function toLowerCase(data) {
  var arr = [];
  for (var i = 0; i < data.length; i++) {
    var item = data[i].toLowerCase();
    arr.push(item);
  }
  return arr;
}

var activateEditor = function(page, id, pageData) {


  Core9.data.page.page = page;
  Core9.data.page.id = id;
  Core9.data.page.pageData = pageData;

  document.getElementById('delpage').dataset.currentid = id;
  try {
    Core9.editor.destroy();
    Core9.editor2.destroy();
  } catch (e) {}

  Core9.editor2 = new JSONEditor(document.getElementById('editor_holder'), {
    disable_edit_json: true,
    disable_collapse: true,
    disable_properties: true,
    format: 'grid',
    theme: 'bootstrap3',
    schema: {
      type: "object",
      title: page,
      properties: {
        url: {
          type: "string",
          default: pageData.url
        }
      }
    }
  });

  var starting_value = pageData.versions;



  Core9.editor = new JSONEditor(document
    .getElementById('editor_holder2'), {
      ajax: true,
      disable_edit_json: true,
      disable_collapse: true,
      disable_properties: true,
      format: 'grid',
      theme: 'bootstrap3',
      startval: starting_value,
      no_additional_properties: false,
      required_by_default: false,
      schema: {
        type: "array",
        title: page,
        format: "tabs",
        items: {
          title: "Version",
          headerTemplate: "{{i}} - {{self.title}}",
          type: "object",
          id: "person",
          properties: {
            title: {
              type: "string",
              minLength: 3
            },
            theme: {
              type: "string",
              enum: Core9.template.templates
            },
            language: {
              type: "string",
              enum: ["", "nl", "de"]
            },
            country: {
              type: "string",
              enum: ["", "nl", "de"]
            },
            template: {
              type: "string",
              enum: ["", "nl", "de"]
            },
            version: {
              type: "string",
              enum: ["", "nl", "de"]
            },
            percentage: {
              type: "integer",
              enum: getArray(101)
            },
            startdate: {
              type: "string",
              format: "date"
            },
            enddate: {
              type: "string",
              format: "date"
            },
            status: {
              type: "string",
              enum: ["active", "pauzed"]
            }
          }
        }
      }
    });




  Core9.editor.on('change', function() {
    var errors = Core9.editor.validate();
    var indicator = document.getElementById('valid_indicator');
    if (errors.length) {
      indicator.style.color = 'red';
      indicator.textContent = "not valid";
    } else {
      indicator.style.color = 'green';
      indicator.textContent = "valid";
    }
  });


  Core9.editor.watch('root.0.theme', function() {
    console.log('watching theme ...');
    var language = Core9.editor.getEditor('root.0.language');
    if (language) {
      language.setValue(" ");
      console.log(language.getValue());
    }
  });

  Core9.editor.watch('root.0.language', function() {
    console.log('watching language ...');
    var country = Core9.editor.getEditor('root.0.country');
    if (country) {
      country.setValue(" ");
      console.log(country.getValue());
    }
  });

  Core9.editor.watch('root.0.country', function() {
    console.log('watching country ...');
    var template = Core9.editor.getEditor('root.0.template');
    if (template) {
      template.setValue(" ");
      console.log(template.getValue());
    }
  });


  Core9.editor.watch('root.0.template', function() {
    console.log('watching template ...');
    var version = Core9.editor.getEditor('root.0.version');
    if (version) {
      version.setValue(" ");
      console.log(version.getValue());
    }
  });


  document.getElementById('submit2').addEventListener('click',
    function() {
      var page = getCurrentPage();
      console.log(page);
      var url = Core9.editor2.getValue().url;
      console.log(url);
      page.url = url;
      var versions = Core9.editor.getValue();
      page.versions = [];
      page.versions = versions;
      console.log(versions);
      Core9.data[TYPEOFPAGE].update(page);
      Core9.template.save();
    });

  document.getElementById('restore2').addEventListener('click',
    function() {
      Core9.editor.setValue(starting_value);
    });


}
