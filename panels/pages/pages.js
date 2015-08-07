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
            enum: []
          },
          country: {
            type: "string",
            enum: []
          },
          template: {
            type: "string",
            enum: []
          },
          version: {
            type: "string",
            enum: []
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

  function ifUndefined(versions, i, val){
    try {
      if(typeof versions[i][val] == 'undefined'){
        return "";
      }
    } catch (e) {
      return "";
    }
    return versions[i][val];
  }

  function save() {
    var page = getCurrentPage();
    var url = Core9.editor2.getValue().url;
    page.url = url;
    var versions = Core9.editor.getValue();
    page.versions = [];
    for(var i = 0; i < versions.length; i++) {
      page.versions[i] = {};
      page.versions[i].title = ifUndefined(versions, i, 'title');
      page.versions[i].theme = ifUndefined(versions, i, 'theme');
      page.versions[i].language = ifUndefined(versions, i, 'language');
      page.versions[i].country = ifUndefined(versions, i, 'country');
      page.versions[i].percentage = ifUndefined(versions, i, 'percentage');
      page.versions[i].startdate = ifUndefined(versions, i, 'startdate');
      page.versions[i].enddate = ifUndefined(versions, i, 'enddate');
      page.versions[i].status = ifUndefined(versions, i, 'status');
    }
    Core9.data[TYPEOFPAGE].update(page);
    Core9.template.save();
  }

  function getOptions(options) {
    //returns false by one empty option
    if(options.length == 1 && isEmpty(options[0])) {
      return false;
    }
    var optionStr = "";
    var emptyOption = false;
    for(var i = 0; i < options.length; i++) {
      var option = options[i];
      if(!isEmpty(option)) {
        optionStr = optionStr.concat('<option value="' + option + '">' + option + '</option>');
      } else {
        emptyOption = true;
      }
    }
    if(emptyOption) {
      optionStr = '<option value=""></option>'.concat(optionStr);
    }
    return optionStr;
  }

  function checkNextOptions(session, forType) {
    var result = Core9.data.templates.findObjects(session);
    var arr = [];
    for(var i = 0; i < result.length; i++) {
      var item = result[i];
      arr.push(item[forType]);
    }
    var options = Core9.deDupeArray(arr);
    if(options.length == 1 && isEmpty(options[0])) {
      return false;
    }
    return options;
  }

  function getTemplateNames(session) {
    var templateNames = [];
    var result = Core9.data.templates.findObjects(session);
    for(var i = 0; i < result.length; i++) {
      var template = result[i];
      if(!isEmpty(template.page)) {
        templateNames.push(template.page);
      }
    }
    return templateNames;
  }

  function getTemplateVersionNames(session) {
    var versionNames = [];
    var result = Core9.data.templates.findObjects(session)[0]; // can only be one template left otherwise something went wrong
    for(var i = 0; i < result.versions.length; i++) {
      var version = result.versions[i];
      console.log(version);
      if(!isEmpty(version.title) && version.status != 'pauzed') {
        versionNames.push(version.title);
      }
    }
    return versionNames;
  }

  function setVersionSelect(version, session, versionNames) {
    var options = getOptions(versionNames);
    var versionSelect = $('[data-schemapath="root.' + version + '.version"]').find('select');
    if(versionNames) {
      $(versionSelect).empty().append(options).prop('disabled', false);
    } else {
      console.log('sorry no versions found..');
      $('[data-schemapath="root.' + version + '.version"]').find('select').empty().prop('disabled', 'disabled');
    }
  }

  function setTemplateSelect(version, session, templateNames) {
    var options = getOptions(templateNames);
    var templateSelect = $('[data-schemapath="root.' + version + '.template"]').find('select');
    if(templateNames) {
      $(templateSelect).empty().append(options).prop('disabled', false);
      console.log(templateNames);
      if(templateNames.length == 1) {
        session.page = templateNames[0];
        var versionNames = getTemplateVersionNames(session);
        setVersionSelect(version, session, versionNames);
      }
    } else {
      console.log('sorry no template options..');
      $('[data-schemapath="root.' + version + '.template"]').find('select').empty().prop('disabled', 'disabled');
    }
    $(templateSelect).on('change', function () {
      session.page = $(this).val();
      console.log('template is ' + session.page);
      var versionNames = getTemplateVersionNames(session);
      console.log(versionNames);
      setVersionSelect(version, session, versionNames);
    });
    //setTemplateVersions();
  }

  function setCountrySelect(version, session, next) {
    console.log('selection country ....');
    var options = getOptions(next);
    var countrySelect = $('[data-schemapath="root.' + version + '.country"]').find('select');
    if(next) {
      $(countrySelect).empty().append(options).prop('disabled', false);
    } else {
      // skip and let country disabled
      console.log('sorry no country options trying templates..');
      $('[data-schemapath="root.' + version + '.country"]').find('select').empty().prop('disabled', 'disabled');
    }
    session.country = "";
    $(countrySelect).on('change', function () {
      session.country = $(this).val();
      console.log('country is ' + session.country);
      var templateNames = getTemplateNames(session);
      console.log('template options : ');
      console.log(templateNames);
      setTemplateSelect(version, session, templateNames);
    });
  }

  function disableSelectBoxesForVersion(version) {
    $('[data-schemapath="root.' + version + '.language"]').find('select').empty().prop('disabled', 'disabled');
    $('[data-schemapath="root.' + version + '.country"]').find('select').empty().prop('disabled', 'disabled');
    $('[data-schemapath="root.' + version + '.template"]').find('select').empty().prop('disabled', 'disabled');
    $('[data-schemapath="root.' + version + '.version"]').find('select').empty().prop('disabled', 'disabled');
  }
  // select boxes
  function watchVersion(version) {
    var session = {
      template: "",
      language: ""
    };
    disableSelectBoxesForVersion(version);
    Core9.editor.watch('root.' + version + '.theme', function () {
      session.template = $('[data-schemapath="root.' + version + '.theme"]').find('select').val();
      var language = Core9.editor.getEditor('root.' + version + '.language');
      if(language) {
        var languageSelect = $('[data-schemapath="root.' + version + '.language"]').find('select');
        $(languageSelect).on('change', function () {
          session.language = $(this).val();
          language.setValue(session.language);
          var next = checkNextOptions(session, 'country');
          console.log('country options : ', next);
          delete session.country;
          setCountrySelect(version, session, next);
        });
        session.template = Core9.editor.getEditor('root.' + version + '.theme').getValue();
        var options = getOptions(getLanguageOptions(session.template));
        if(options) {
          $(languageSelect).empty().append(options).prop('disabled', false);
        } else {
          disableSelectBoxesForVersion(version);
        }
      } else {
        var next = checkNextOptions(session, 'country');
        console.log('country options : ', next);
        delete session.country;
        setCountrySelect(version, session, next);
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
