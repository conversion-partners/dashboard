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
$(document).ready(function() {
  $('#exit-modal').on('click', function() {
    $('#choose-theme').toggle();
  });
  $('#refresh-templates').on('click', function() {
    var entries = getSelectBoxEntries();
    var data = [];
    for (i = 0; i < entries.length; i++) {
      if (TYPEOFPAGE == 'pages') {
        var item = {
          "id": guid(),
          "$loki": entries[i].$loki,
          "page": entries[i].page
        }
      }
      if (TYPEOFPAGE == 'themes') {
        var item = {
          "id": guid(),
          "$loki": entries[i].$loki,
          "template": entries[i].template
        }
      }
      data.push(item);
    }
    //console.log('entries : ');
    //console.log(entries);
    initNestable(JSON.stringify(data));
    // create a save and init connected to the selected items (domain, language, country)
    //console.log('data : ');
    //console.log(data);
    // sucky sucky
/**
    setTimeout(function() {
      $('#nestable > ol > li:nth-child(1)')[0].click();
    }, 900);
**/
    setTimeout(function() {
      $("#load-nestable")[0].click();
    }, 1800);
    setTimeout(function() {
      $("button[data-action='collapse-all']")[0].click();
    }, 2700);


  });
  $('#delpage').on('click', function() {
    var lokiId = getCurrentPageId();
    Core9.data[TYPEOFPAGE].remove(lokiId);
    $('li[data-id="' + Core9.data.currentid + '"]').remove();
    try {
      Core9.editor.destroy();
    } catch (e) {}
    try {
      Core9.editor2.destroy();
    } catch (e) {}
    try {
      Core9.template.save();
    } catch (e) {}
  });
});
