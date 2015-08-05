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

function getTemplateVersion() {
  var pageVersion = getActiveTab();
  var pageData = Core9.data.page.pageData;//.versions[pageVersion];
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
    if ($(tab).hasClass(active)) {
      return i;
    }
  }
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
      Core9.data.templateVersion = getTemplateVersion();
    }
    activateEditor(Core9.data.page.page, Core9.data.page.id, Core9.data.page.pageData);
    setActiveTab(version);
    Core9.data.tmp = value;
  }
}

function watchEditor() {
  var callback = function(record) {
    setTimeout(function() {
      try {
        var selector = record.target.firstChild.firstChild.getAttribute('aria-labelledby');
        if (selector.match(/select2-root\[\d*\]\[(theme|language|country|percentage)\]/)) {
          var value = record.target.firstChild.textContent;
          var myRegexp = /select2-root\[(\d*)\]\[(theme|language|country|percentage)\]/g;
          var match = myRegexp.exec(selector);
          var version = match[1];
          var selectBox = match[2];
          setPageVersions(version, selectBox, value);
        }
      } catch (e) {}
    }, 1100);
  }

  watch(['[id^="select2-root[0][theme]"]', '[id^="select2-root[1][theme]"]', '[id^="select2-root[2][theme]"]'], callback);
  watch(['[id^="select2-root[0][language]"]', '[id^="select2-root[1][language]"]', '[id^="select2-root[2][language]"]'], callback);
  watch(['[id^="select2-root[0][country]"]', '[id^="select2-root[1][country]"]', '[id^="select2-root[2][country]"]'], callback);
  watch(['[id^="select2-root[0][percentage]"]', '[id^="select2-root[1][percentage]"]', '[id^="select2-root[2][percentage]"]'], callback);
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

  Core9.data.language = getLanguageOptions();
  Core9.data.countries = getCountryOptions();
  Core9.data.templateVersion = getTemplateVersion();

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
              enum: Core9.data.language
            },
            country: {
              type: "string",
              enum: Core9.data.countries
            },
            template: {
              type: "string",
              enum: Core9.data.templateVersion
            },
            version: {
              type: "string",
              enum: ["blue","xmas"],
              default : "blue"
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

  watchEditor();
}
