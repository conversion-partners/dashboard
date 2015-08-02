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
        var entries = getSelectBoxEntries();
        var data = [];
        for (i = 0; i < entries.length; i++) {
          var item = {
            "id": guid(),
            "page": entries[i].page
          }
          data.push(item);
        }
        initNestable(JSON.stringify(data));
      });

      $('#newpage').on(
        'click',
        function() {
          var content = $('#nestable').nestable(
            'serialize');
          var json = content; //JSON.parse(jsonStr);
          json.unshift({
            "id": guid(),
            "page": "New Page"
          });
          initNestable(JSON.stringify(json));
          var theme = $(".template-data").val();
          var language = $(".language-data").val();
          var country = $(".country-data").val();
          if (country == null) {
            country = ""
          }
          var templateData = {
            "template": theme,
            "language": language,
            "country": country,
            "page": "New Page",
            "versions": [{
              "status": "active",
              "title": "New Page"
            }]
          }
          Core9.data.templates.insert(templateData);
        });

      $('#delpage')
        .on(
          'click',
          function() {
            $(
                'li[data-id="' + this.dataset.currentid + '"]')
              .remove();
          });
    });
