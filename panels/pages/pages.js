TYPEOFPAGE = 'pages';

var activateEditor = function(page, id, pageData) {
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

  var language = ["en", "de", "nl"];

  var countries = ["UK", "NL", "DE"];

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
              enum: language
            },
            country: {
              type: "string",
              enum: countries
            },
            template: {
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


  var callback = function(record) {
    try {
      var selector = record.target.firstChild.firstChild.getAttribute('aria-labelledby');
      console.log(selector);
    } catch (e) {}
    console.log();
    console.log(record.target.firstChild.textContent);
  }

  watch(['[id^="select2-root[0][theme]"]', '[id^="select2-root[1][theme]"]', '[id^="select2-root[2][theme]"]'], callback);
  watch(['[id^="select2-root[0][language]"]', '[id^="select2-root[1][language]"]', '[id^="select2-root[2][language]"]'], callback);
  watch(['[id^="select2-root[0][country]"]', '[id^="select2-root[1][country]"]', '[id^="select2-root[2][country]"]'], callback);
  watch(['[id^="select2-root[0][percentage]"]', '[id^="select2-root[1][percentage]"]', '[id^="select2-root[2][percentage]"]'], callback);


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
      console.log(Core9.editor.getValue());
    });

  document.getElementById('restore2').addEventListener('click',
    function() {
      Core9.editor.setValue(starting_value);
    });

}
