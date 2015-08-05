TYPEOFPAGE = 'templates';

function activateEditor() {

  var pageData = getSelectBoxEntries()[0];
  var starting_value = pageData.versions;

  try {
    Core9.editor.destroy();
  } catch (e) {}
  $('#choose-theme-template-page')
    .html(getSelectedPage());
  Core9.editor = new JSONEditor(document
    .getElementById('editor_holder2'), {
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
        title: getSelectedPage(),
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
    if (errors.length) {
      indicator.style.color = 'red';
      indicator.textContent = "not valid";
    } else {
      indicator.style.color = 'green';
      indicator.textContent = "valid";
    }
  });

  document.getElementById('submit')
    .addEventListener('click',
      function () {
        var page = getCurrentPage();
        page.versions = [];
        var versions = Core9.editor.getValue();
        for (var i = 0; i < versions.length; i++) {
          var version = versions[i];
          page.versions.push(version);
        }
        Core9.data[TYPEOFPAGE].update(page);
        Core9.template.save();
      });

  document.getElementById('restore')
    .addEventListener('click',
      function () {
        Core9.editor.setValue(starting_value);
      });

}
