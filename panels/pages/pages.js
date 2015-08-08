TYPEOFPAGE = 'pages';

var activateEditor = function () {
  var pageData = getCurrentPage();
  var starting_value = {};
  try {
    starting_value = pageData.versions;
  } catch (e) {
    alert("Please reload page");
  }

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

  function ifUndefined(versions, i, val) {
    try {
      if(typeof versions[i][val] == 'undefined') {
        return "";
      }
    } catch(e) {
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





  function disableSelectBoxesForVersion(version) {
    $('[data-schemapath="root.' + version + '.language"]').find('select').empty().prop('disabled', 'disabled');
    $('[data-schemapath="root.' + version + '.country"]').find('select').empty().prop('disabled', 'disabled');
    $('[data-schemapath="root.' + version + '.template"]').find('select').empty().prop('disabled', 'disabled');
    $('[data-schemapath="root.' + version + '.version"]').find('select').empty().prop('disabled', 'disabled');
  }

  function watchVersion(version) {
    disableSelectBoxesForVersion(version);
    Core9.editor.watch('root.' + version + '.theme', function () {
      session.template = $('[data-schemapath="root.' + version + '.theme"]').find('select').val();
    });
  }
  watchVersion(0);
  watchVersion(1);
  watchVersion(2);
  watchVersion(3);

  document.getElementById('submit2').addEventListener('click', function () {
    save();
  });
  document.getElementById('restore2').addEventListener('click', function () {
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
      "template":"",
      "version":"",
      "percentage": 100,
      "startdate": "",
      "enddate": "",
      "status": "active"
    }]
  }
  Core9.data[TYPEOFPAGE].insert(pageData);
  try {
    Core9.template.save();
  } catch(e) {}
}

function showNewPageForm() {
  try {
    Core9.editor3.destroy();
  } catch(e) {}
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
      title: "New page",
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
  if(languageSelect) {
    $(languageSelect).append(document.getElementById('language-options').innerHTML);
  }
  var countrySelect = $('[data-schemapath="root.country"]').find('select');
  if(countrySelect) {
    $(countrySelect).append(document.getElementById('country-options').innerHTML);
  }
  $('#save-new-page').on('click', function () {
    var data = Core9.editor3.getValue();
    data.newdomain = $('[data-schemapath="root.newdomain"]').find('input').val();
    data.domain = $('[data-schemapath="root.domain"]').find('select').val();
    if(isEmpty(data.domain) && !isEmpty(data.newdomain)) {
      data.domain = data.newdomain;
    } else if (!isEmpty(data.domain)) {
      // use data.domain
    }else {
      alert("No domain filled in");
      return;
    }
    data.country = $('[data-schemapath="root.country"]').find('select').val();
    data.language = $('[data-schemapath="root.language"]').find('select').val();
    savePage(data);
  });
}
$(document).ready(function () {
  $('#newpages').on('click', function () {
    $("#myModal").modal();
    showNewPageForm();
  });
});
