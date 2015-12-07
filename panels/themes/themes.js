TYPEOFPAGE = 'themes';

function activateEditor() {
  var pageData = getSelectBoxEntries()[0];
  var starting_value = pageData.versions;
  try {
    Core9.editor.destroy();
  } catch(e) {}
  $('#choose-theme-template-page').html(getSelectedPageId());
  Core9.editor = new JSONEditor(document.getElementById('editor_holder2'), {
    ajax: true,
    disable_edit_json: true,
    disable_collapse: true,
    disable_properties: true,
    format: 'grid',
    theme: 'bootstrap3',
    startval: starting_value,
    no_additional_properties: true,
    required_by_default: true,
    schema: {
      type: "array",
      title: pageData.template,
      format: "tabs",
      items: {
        title: "Version",
        headerTemplate: "{{i}} - {{self.title}}",
        type: "object",
        id: "id",
        properties: {
          "title": {
            "type": "string",
            "minLength": 4
          },
          "status": {
            "type": "string",
            "enum": ["active", "pauzed"]
          }
        }
      }
    }
  });
  //FIXME disable title edit for first 6 versions
  var versionArr = [0, 1, 2, 3, 4, 5];
  for(var i = 0; i < versionArr.length; i++) {
    try {
      Core9.editor.getEditor('root.' + i + '.title').disable();
    } catch(e) {}
  }
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
  document.getElementById('submit').addEventListener('click', function () {
    var page = getCurrentPage();
    page.versions = [];
    var versions = Core9.editor.getValue();
    for(var i = 0; i < versions.length; i++) {
      var version = versions[i];
      page.versions.push(version);
    }
    Core9.data[TYPEOFPAGE].update(page);
    Core9.template.save();
  });
  document.getElementById('restore').addEventListener('click', function () {
    Core9.editor.setValue(starting_value);
  });
}

function saveTheme(data) {
  var pageName = data.title;
  var content = $('#nestable').nestable('serialize');
  var json = content; //JSON.parse(jsonStr);
  var id = guid();
  Core9.data.currentid = id;
  document.getElementById('delpage').dataset.currentid = id;
  if(json.length != 0) {
    json.unshift({
      "id": id,
      "template": pageName
    });
  } else {
    json.push({
      "id": id,
      "template": pageName
    });
  }
  initNestable(JSON.stringify(json));
  if(TYPEOFPAGE == 'themes') {
    var templateData = {
      "theme": data.theme,
      "language": data.language,
      "country": data.country,
      "template": pageName,
      "versions": [{
        "status": "active",
        "title": "New-Page"
      }]
    }
    Core9.data[TYPEOFPAGE].insert(templateData);
  }
  try {
    Core9.template.save();
  } catch(e) {}
}
/*
  new template
*/
function showNewTemplateForm() {
  try {
    Core9.editor3.destroy();
  } catch(e) {}
  Core9.editor3 = new JSONEditor(document.getElementById('new-template-form'), {
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
      title: "New template",
      properties: {
        title: {
          type: "string",
          minLength: 3
        },
        // newtheme: {
        //   type: "string"
        // },
        theme: {
          type: "string",
          enum: Core9.template.installedThemes
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
  var themeSelect = $('[data-schemapath="root.theme"]').find('select');
  if(themeSelect) {
    for(var i = 0, options = ""; i < Core9.template.themes.length; i++) {
      $(themeSelect).append('<option value="' + Core9.template.themes[i] + '">' + Core9.template.themes[i] + '</option>');
    }
  }
  var languageSelect = $('[data-schemapath="root.language"]').find('select');
  if(languageSelect) {
    $(languageSelect).append(document.getElementById('language-options').innerHTML);
  }
  var countrySelect = $('[data-schemapath="root.country"]').find('select');
  if(countrySelect) {
    $(countrySelect).append(document.getElementById('country-options').innerHTML);
  }
  $('#save-new-template').on('click', function () {
    var data = Core9.editor3.getValue();
    data.country = $('[data-schemapath="root.country"]').find('select').val();
    data.theme = $('[data-schemapath="root.theme"]').find('select').val();
    data.language = $('[data-schemapath="root.language"]').find('select').val();
    console.log(data);
    saveTheme(data);
  });
}
$(document).ready(function () {
  $('#newtemplates').on('click', function () {
    $("#myModal").modal();
    showNewTemplateForm();
  });
  $('#edittemplate').on('click', function () {
    $('#theme-selector').modal();
    $('#choose-theme').toggle();
    var versions = Core9.editor.getValue();
    var activeVersions = [];
    for(var i = 0; i < versions.length; i++) {
      var status = versions[i].status;
      if(status == 'active') {
        activeVersions.push(versions[i].title);
      }
    }
    changeSelect2Data("choose-theme-select", activeVersions);
  });
  $('#edit-selected-theme').on('click', function () {
    var dropdown = $('.choose-theme-select').val();
    var account = store.get('account');
    var page = $('#choose-theme-template-page').html();
    var theme = $(".template-data").val();
    var template = '/dashboard/data/accounts/' + account + '/themes/bower_components/' + theme + '/templates/pages/' + page + '/versions/' + dropdown + '/index.html';
    template = template.toLowerCase();
    store.set('template', template.toLowerCase());
    store.set('theme', theme.toLowerCase());
    history.pushState(null, null, "/dashboard/theme/edit");
    postClick("/dashboard/theme/edit");
  });
});


function getThemeMenuFile() {
  var account = store.get('account');
  var theme = $(".template-data").val();
  var file = '/dashboard/data/accounts/' + account + '/themes/bower_components/' + theme + '/global-data/theme-menu.json';
  return file.toLowerCase();
}
