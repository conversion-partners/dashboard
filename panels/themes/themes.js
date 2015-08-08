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
      title: pageData.page,
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
  json.unshift({
    "id": id,
    "template": pageName
  });
  initNestable(JSON.stringify(json));
  if(TYPEOFPAGE == 'themes') {
    var templateData = {
      "theme": data.theme,
      "language": data.language,
      "country": data.country,
      "template": pageName,
      "versions": [{
        "status": "active",
        "title": "New Page"
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
          enum: []
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
});
