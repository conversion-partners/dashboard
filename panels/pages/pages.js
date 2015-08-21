TYPEOFPAGE = 'pages';
var activateEditor = function() {
  var pageData = getCurrentPage();
  var starting_value = {};
  try {
    starting_value = pageData.versions;
  } catch (e) {
    alert("Please reload page");
  }
  try {
    Core9.editor2.destroy();
  } catch (e) {}
  try {
    Core9.editor.destroy();
  } catch (e) {}
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
            enum: Core9.template.installedThemes
          },
          language: {
            type: "string",
            enum: Core9.template.allLanguages
          },
          country: {
            type: "string",
            enum: Core9.template.allCountries
          },
          template: {
            type: "string",
            enum: Core9.template.allTemplates
          },
          version: {
            type: "string",
            enum: Core9.template.allVersions
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
  //FIXME disable title edit for first 6 versions
  var versionArr = [0, 1, 2, 3, 4, 5];
  for (var i = 0; i < versionArr.length; i++) {
    try {
      Core9.editor.getEditor('root.' + i + '.title').disable();
    } catch (e) {}
  }
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

  function ifUndefined(versions, i, val, overide) {
    var result = "";
    try {
      if (typeof versions[i][val] == 'undefined') {
        result = "";
      }
    } catch (e) {
      result = "";
    }
    if (overide) {
      result = overide;
    } else if (versions[i][val]) {
      result = versions[i][val];
    }
    if (typeof result == 'undefined') {
      result = "";
    }
    return result;
  }

  function save() {
    var page = getCurrentPage();
    var url = Core9.editor2.getValue().url;
    page.url = url;
    var versions = Core9.editor.getValue();
    page.versions = [];
    for (var i = 0; i < versions.length; i++) {
      page.versions[i] = {};
      page.versions[i].title = ifUndefined(versions, i, 'title');
      page.versions[i].theme = ifUndefined(versions, i, 'theme');
      page.versions[i].language = ifUndefined(versions, i, 'language', $('[data-schemapath="root.' + i + '.language"]').find('select').val());
      page.versions[i].country = ifUndefined(versions, i, 'country', $('[data-schemapath="root.' + i + '.country"]').find('select').val());
      page.versions[i].template = ifUndefined(versions, i, 'template', $('[data-schemapath="root.' + i + '.template"]').find('select').val());
      page.versions[i].version = ifUndefined(versions, i, 'version', $('[data-schemapath="root.' + i + '.version"]').find('select').val());
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
    if (typeof options == 'undefined' || (options.length == 1 && isEmpty(options[0]))) {
      return false;
    }
    var optionStr = "";
    var emptyOption = false;
    for (var i = 0; i < options.length; i++) {
      var option = options[i];
      if (!isEmpty(option)) {
        optionStr = optionStr.concat('<option value="' + option + '">' + option + '</option>');
      } else {
        emptyOption = true;
      }
    }
    if (emptyOption) {
      optionStr = '<option value=""></option>'.concat(optionStr);
    }
    return optionStr;
  }

  function disableSelectBoxesForVersion(version) {
    $('[data-schemapath="root.' + version + '.language"]').find('select').empty().prop('disabled', 'disabled');
    $('[data-schemapath="root.' + version + '.country"]').find('select').empty().prop('disabled', 'disabled');
    $('[data-schemapath="root.' + version + '.template"]').find('select').empty().prop('disabled', 'disabled');
    $('[data-schemapath="root.' + version + '.version"]').find('select').empty().prop('disabled', 'disabled');
  }

  function setSelectBox(type, version, data, callback) {
    var session = Core9.select.getSession();
    var options = getOptions(data);
    var select = $('[data-schemapath="root.' + version + '.' + type + '"]').find('select');
    if (typeof data != 'undefined') {
      if (data.length > 1) {
        $(select).empty().append(options).prop('disabled', false);
        // watch and update session
        session[type] = $('[data-schemapath="root.' + version + '.' + type + '"]').find('select').val();
        Core9.select.setSession(session);

        Core9.editor.watch('root.' + version + '.' + type, function() {
          var session = Core9.select.getSession();
          var val = $('[data-schemapath="root.' + version + '.' + type + '"]').find('select').val();
          session[type] = val;
          Core9.select.setSession(session);
          callback();
        });
      } else {
        if (data.length == 0) {
          session[type] = "";
        } else {
          session[type] = data[0];
        }
        // no options can be made so lets go to the next box
        $(select).empty().append(options).prop('disabled', false);
        Core9.select.setSession(session);
        callback();
      }
    } else {
      session[type] = "";
      Core9.select.setSession(session);
      callback();
    }
  }

  function finishedSelection() {
    var session = Core9.select.getSession();
  }

  function setVersionSelectBox() {
    var session = Core9.select.getSession();
    setSelectBox('version', session.vers, Core9.select.getVersionNames(), finishedSelection);
  }

  function setTemplateSelectBox() {
    var session = Core9.select.getSession();
    resetSession(['version']);
    setSelectBox('template', session.vers, Core9.select.getTemplateNames(), setVersionSelectBox);
  }

  function setCountrySelectBox() {
    var session = Core9.select.getSession();
    resetSession(['template', 'version']);
    setSelectBox('country', session.vers, Core9.select.getCountryNames(), setTemplateSelectBox);
  }

  function setLanguageSelectBox() {
    var session = Core9.select.getSession();
    resetSession(['country', 'template', 'version']);
    $('[data-schemapath="root.' + session.vers + '.country"]').find('select').empty().prop('disabled', 'disabled');
    $('[data-schemapath="root.' + session.vers + '.template"]').find('select').empty().prop('disabled', 'disabled');
    $('[data-schemapath="root.' + session.vers + '.version"]').find('select').empty().prop('disabled', 'disabled');
    setSelectBox('language', session.vers, Core9.select.getLanguageNames(), setCountrySelectBox);
  }

  function resetSession(arr) {
    var session = Core9.select.getSession();
    for (var i = 0; i < arr.length; i++) {
      session[arr[i]] = "";
    }
    Core9.select.setSession(session);
  }

  function watchVersion(version) {
    Core9.editor.watch('root.' + version + '.theme', function() {
      disableSelectBoxesForVersion(version);
      var session = {
        vers: version,
        language: ""
      };
      session.theme = $('[data-schemapath="root.' + version + '.theme"]').find('select').val();
      if (isEmpty(session.theme)) {
        alert('please make a choice');
        return;
      }
      Core9.select.setSession(session);
      setLanguageSelectBox();
    });
  }
  watchVersion(0);
  watchVersion(1);
  watchVersion(2);
  watchVersion(3);
  document.getElementById('submit2').addEventListener('click', function() {
    save();
  });
  document.getElementById('restore2').addEventListener('click', function() {
    Core9.editor.setValue(starting_value);
  });
}

function savePage(data) {
  var pageName = data.title;
  var json = $('#nestable').nestable('serialize');
  var id = guid();
  Core9.data.currentid = id;
  document.getElementById('delpage').dataset.currentid = id;
  json.unshift({
    "id": id,
    "page": pageName
  });
  initNestable(JSON.stringify(json));
  var pageData = {
    "domain": data.domain,
    "language": data.language,
    "country": data.country,
    "page": pageName,
    "url": "",
    "versions": [{
      "title": "Version one",
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
  }
  Core9.data[TYPEOFPAGE].insert(pageData);
  try {
    Core9.template.save();
  } catch (e) {}
}

function showNewPageForm() {
  try {
    Core9.editor3.destroy();
  } catch (e) {}
  Core9.editor3 = new JSONEditor(document.getElementById('new-page-form'), {
    ajax: true,
    disable_edit_json: true,
    disable_collapse: true,
    disable_properties: true,
    format: 'grid',
    theme: 'bootstrap3',
    no_additional_properties: false,
    required_by_default: false,
    schema: {
      type: "object",
      title: "New-page",
      properties: {
        title: {
          type: "string",
          minLength: 3
        },
        newdomain: {
          type: "string"
        },
        domain: {
          type: "string",
          enum: Core9.template.pages
        },
        language: {
          type: "string",
          enum: []
        },
        country: {
          type: "string",
          enum: []
        }
      }
    }
  });
  var languageSelect = $('[data-schemapath="root.language"]').find('select');
  if (languageSelect) {
    $(languageSelect).append(document.getElementById('language-options').innerHTML);
  }
  var countrySelect = $('[data-schemapath="root.country"]').find('select');
  if (countrySelect) {
    $(countrySelect).append(document.getElementById('country-options').innerHTML);
  }
  $('#save-new-page').on('click', function() {
    var data = Core9.editor3.getValue();
    data.newdomain = $('[data-schemapath="root.newdomain"]').find('input').val();
    data.domain = $('[data-schemapath="root.domain"]').find('select').val();
    if (isEmpty(data.domain) && !isEmpty(data.newdomain)) {
      data.domain = data.newdomain;
    } else if (!isEmpty(data.domain)) {
      // use data.domain
    } else {
      alert("No domain filled in");
      return;
    }
    data.country = $('[data-schemapath="root.country"]').find('select').val();
    data.language = $('[data-schemapath="root.language"]').find('select').val();
    savePage(data);
  });
}
$(document).ready(function() {
  $('#newpages').on('click', function() {
    $("#myModal").modal();
    showNewPageForm();
  });


  $('#editpage').on('click', function() {
    $('#page-selector').modal();
    $('#choose-theme').toggle();
    var versions = Core9.editor.getValue();
    var activeVersions = [];
    for (var i = 0; i < versions.length; i++) {
      var status = versions[i].status;
      if (status == 'active') {
        activeVersions.push(versions[i].title);
      }
    }
    changeSelect2Data("choose-theme-select", activeVersions);
  });

  function fromEmptyToNull(val) {
    if (isEmpty(val)) {
      return "null";
    }
    return val;
  }
  $('#edit-selected-theme').on('click', function() {
    var dropdown = $('.choose-theme-select').val();
    var account = store.get('account');
    var version = getActiveTab();
    var url = $('[data-schemapath="root.url"]').find('input').val();
    var theme = $('[data-schemapath="root.' + version + '.theme"]').find('select').val();
    var template = $('[data-schemapath="root.' + version + '.template"]').find('select').val();
    var pageName = getSelectedPageId();
    var pageVersionName = $('[data-schemapath="root.' + version + '.title"]').find('input').val();
    var page = getCurrentPage();
    var pageLanguage = fromEmptyToNull(page.language);
    var pageCountry = fromEmptyToNull(page.country);
    var domain = $(".template-data").val();
    var domainDirectory = domain + "_" + pageLanguage + "-" + pageCountry;
    var pageFile = '/dashboard/data/accounts/' + account + '/sites/' + domainDirectory + '/pages/' + pageName + '/versions/' + pageVersionName + '/index.html';
    var pageDataDirectory = '/dashboard/data/accounts/' + account + '/sites/' + domainDirectory + '/pages/' + pageName + '/versions/' + pageVersionName + '/data/';

    var templateVersion = "";

    for (var i = 0; i < page.versions.length; i++) {
      var version = page.versions[i];
      if (version.title == dropdown) {
        templateVersion = version.version;
      }
    }


    var templateFile = '/dashboard/data/accounts/' + account + '/themes/bower_components/' + theme + '/templates/pages/' + template + '/versions/' + templateVersion + '/index.html';
    templateFile = templateFile.toLowerCase();
    store.set('page', pageFile);
    store.set('page-data-directory', pageDataDirectory);
    //FIXME
    store.set('template', templateFile);
    store.set('theme', theme);
    history.pushState(null, null, "/dashboard/page/edit");
    postClick("/dashboard/page/edit");
  });


});
