initStarted = false;

TYPEOFPAGE = 'templates';

function init() {
  if (!initStarted) {
    initNestable([]);
    initStarted = true;
  }
}

function activateEditor(page, id, pageData) {
  document.getElementById('delpage').dataset.currentid = id;
  try {
    Core9.editor.destroy();
  } catch (e) {}
  var starting_value = pageData.versions;
  $('#choose-theme-template-page').html(page);
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
        title: page,
        format: "tabs",
        items: {
          title: "Version",
          headerTemplate: "{{i}} - {{self.title}}",
          type: "object",
          id: "templateid",
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

  document.getElementById('submit').addEventListener('click',
    function() {
      console.log(Core9.editor.getValue());

      Core9.template.save();
    });

  document.getElementById('restore').addEventListener('click',
    function() {
      Core9.editor.setValue(starting_value);
    });

}
