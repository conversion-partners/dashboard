TYPEOFPAGE = 'pages';
var reduceFun = function (array) {
  return Core9.deDupeArray(array);
}

function getCountryOptions(theme) {
  var mapFun = function (obj) {
    return obj.country;
  }
  return Core9.data.templates.mapReduce(mapFun, reduceFun);
}

function getLanguageOptions(theme) {
  var mapFun = function (obj) {
    if(typeof theme == 'undefined') {
      return obj.language;
    }
    if(theme == obj.template) {
      return obj.language;
    }
  }
  var result = Core9.data.templates.mapReduce(mapFun, reduceFun);
  return result;
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
  for(var i = 0; i < result.length; i++) {
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
var activateEditor = function () {
  var pageData = getSelectBoxEntries()[0];
  var starting_value = pageData.versions;
  console.log('init Editor');
  console.log(pageData);
  try {
    Core9.editor2.destroy();
  } catch(e) {}
  try {
    Core9.editor.destroy();
  } catch(e) {}
  Core9.editor2 = new JSONEditor(document.getElementById('editor_holder'), {
    disable_edit_json: true,
    disable_collapse: true,
    disable_properties: true,
    format: 'grid',
    theme: 'bootstrap3',
    schema: {
      type: "object",
      title: pageData.page,
      properties: {
        url: {
          type: "string",
          default: pageData.url
        }
      }
    }
  });
  Core9.editor = new JSONEditor(document.getElementById('editor_holder2'), {
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
      title: pageData.page,
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
            enum: Core9.data.languageOptions
          },
          country: {
            type: "string",
            enum: getCountryOptions()
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
  Core9.editor.on('change', function () {
    var errors = Core9.editor.validate();
    var indicator = document.getElementById('valid_indicator');
    if(errors.length) {
      indicator.style.color = 'red';
      indicator.textContent = "not valid";
    } else {
      indicator.style.color = 'green';
      indicator.textContent = "valid";
    }
  });

  function save() {
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
  }
  // select boxes
  function watchVersion(version) {
    $('[data-schemapath="root.0.language"]').find('select').prop('disabled', 'disabled');
    $('[data-schemapath="root.0.country"]').find('select').prop('disabled', 'disabled');
    $('[data-schemapath="root.0.template"]').find('select').prop('disabled', 'disabled');
    $('[data-schemapath="root.0.version"]').find('select').prop('disabled', 'disabled');
    Core9.editor.watch('root.' + version + '.theme', function () {
      var language = Core9.editor.getEditor('root.' + version + '.language');
      if(language) {
        console.log('setting language');
        var languageOptions = getLanguageOptions(Core9.editor.getEditor('root.' + version + '.theme').getValue());
        var select = $('[data-schemapath="root.0.language"]').find('select');
        $(select).on('change', function () {
          console.log($(this).val());
          language.setValue($(this).val());
        });
        $(select).empty();
        var optionStr = "";
        var emptyOption = false;
        for(var i = 0; i < languageOptions.length; i++) {
          var option = languageOptions[i];
          if(!isEmpty(option)) {
            optionStr = optionStr.concat('<option value="' + option + '">' + option + '</option>');
          } else {
            emptyOption = true;
          }
        }
        if(emptyOption){
          optionStr = '<option value=""></option>'.concat(optionStr);
        }
        $(select).append(optionStr);
        $('[data-schemapath="root.0.language"]').find('select').prop('disabled', false);
      }
    });
    Core9.editor.watch('root.' + version + '.language', function () {
      var language = Core9.editor.getEditor('root.' + version + '.language');
      if(language) {
        console.log(language.getValue());
      }
      var country = Core9.editor.getEditor('root.' + version + '.country');
      if(country) {
        country.setValue(" ");
      }
    });
    Core9.editor.watch('root.' + version + '.country', function () {
      var template = Core9.editor.getEditor('root.' + version + '.template');
      if(template) {
        template.setValue(" ");
      }
    });
    Core9.editor.watch('root.' + version + '.template', function () {
      var templateVersion = Core9.editor.getEditor('root.' + version + '.version');
      if(templateVersion) {
        templateVersion.setValue(" ");
      }
    });
  }
  watchVersion(0);
  watchVersion(1);
  watchVersion(2);
  watchVersion(3);
  // select boxes
  document.getElementById('submit2').addEventListener('click', function () {
    save();
  });
  document.getElementById('restore2').addEventListener('click', function () {
    Core9.editor.setValue(starting_value);
  });
}
