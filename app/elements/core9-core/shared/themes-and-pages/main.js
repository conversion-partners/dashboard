if (typeof Core9 === 'undefined') {
  Core9 = {}
};

Core9.editor = {};

initStarted = false;

function init() {
  if (!initStarted) {
    initNestable([]);
    initStarted = true;
  }
}



$(document)
  .ready(
    function() {


      $('#edit-selected-theme').on('click', function() {
        var dropdown = $('.choose-theme-select').val();
        var account = store.get('account');
        var page = $('#choose-theme-template-page').html();
        var theme = $(".template-data").val();
        var template = '/dashboard/data/accounts/' + account + '/themes/bower_components/' + theme + '/templates/pages/' + page + '/versions/' + dropdown + '/index.html'
        template = template.toLowerCase();
        store.set('template', template);
        store.set('theme', theme);
        history.pushState(null, null, "/dashboard/theme/edit");
        postClick("/dashboard/theme/edit");
      });

      $('#exit-modal').on('click', function() {
        $('#choose-theme').toggle();
      });

      $('#editpage').on('click', function() {
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

      $('#refresh-templates').on('click', function() {
        var entries = getSelectBoxEntries(TYPEOFPAGE);
        var data = [];
        for (i = 0; i < entries.length; i++) {
          var item = {
            "id": guid(),
            "$loki": entries[i].$loki,
            "page": entries[i].page
          }
          data.push(item);
        }
        initNestable(JSON.stringify(data));
      });



      $('#newpage').on(
        'click',
        function() {

          var pageName = null;
          while (pageName == null) {
            pageName = prompt("Please enter template name", "New Template");
          }

          var content = $('#nestable').nestable(
            'serialize');
          var json = content; //JSON.parse(jsonStr);
          var id = guid();
          document.getElementById('delpage').dataset.currentid = id;
          json.unshift({
            "id": id,
            "page": pageName
          });
          initNestable(JSON.stringify(json));
          var data = getSelectBoxValues();
          if (TYPEOFPAGE == 'templates') {
            var templateData = {
              "template": data.theme,
              "language": data.language,
              "country": data.country,
              "page": pageName,
              "versions": [{
                "status": "active",
                "title": "New Page"
              }]
            }
            Core9.data[TYPEOFPAGE].insert(templateData);
          }
          if (TYPEOFPAGE == 'pages') {
            var pageData = {
              "domain": data.theme,
              "language": data.language,
              "country": data.country,
              "page": pageName,
              "url": $('#editor_holder > div > div.well.well-sm > div > div > div > div > div.form-group > input').val(),
              "versions": [{
                "title": "page 1",
                "theme": "",
                "language": "",
                "country": "",
                "percentage": 100,
                "startdate": "",
                "enddate": "",
                "status": "active"
              }]
            }
            Core9.data[TYPEOFPAGE].insert(pageData);
          }

        });


      $('#delpage')
        .on(
          'click',
          function() {
            var lokiId = getCurrentPageId();
            Core9.data[TYPEOFPAGE].remove(lokiId);
            $('li[data-id="' + $('#delpage').data('currentid') + '"]').remove();
            try {
              Core9.editor.destroy();
              Core9.editor2.destroy();
              Core9.template.save();
            } catch (e) {}
          });
    });
