TYPEOFPAGE = 'pages';


Core9.data.tmp = {};

function setPageVersions(version, selectBox, value) {
  if(Core9.data.tmp != value){
    Core9.data.page.pageData.versions[version][selectBox] = value;
    activateEditor(Core9.data.page.page, Core9.data.page.id, Core9.data.page.pageData);
    Core9.data.tmp = value;
  }
}

function watchEditor() {
  var callback = function(record) {
    setTimeout(function() {
      try {
        var selector = record.target.firstChild.firstChild.getAttribute('aria-labelledby');
        if (selector.match(/select2-root\[\d*\]\[(theme|language|country|percentage)\]/)) {
          //console.log(selector);
          var value = record.target.firstChild.textContent;
          var myRegexp = /select2-root\[(\d*)\]\[(theme|language|country|percentage)\]/g;
          var match = myRegexp.exec(selector);
          var version = match[1];
          var selectBox = match[2];
          //console.log(' updating version : ' + version + ' and selectbox : ' + selectBox + ' with value : ' + value);
          //console.log(match);
          setPageVersions(version, selectBox, value);
        }
      } catch (e) {}
    },1100);
  }

  watch(['[id^="select2-root[0][theme]"]', '[id^="select2-root[1][theme]"]', '[id^="select2-root[2][theme]"]'], callback);
  watch(['[id^="select2-root[0][language]"]', '[id^="select2-root[1][language]"]', '[id^="select2-root[2][language]"]'], callback);
  watch(['[id^="select2-root[0][country]"]', '[id^="select2-root[1][country]"]', '[id^="select2-root[2][country]"]'], callback);
  watch(['[id^="select2-root[0][percentage]"]', '[id^="select2-root[1][percentage]"]', '[id^="select2-root[2][percentage]"]'], callback);
}

var activateEditor = function(page, id, pageData) {

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

  watchEditor();
}
