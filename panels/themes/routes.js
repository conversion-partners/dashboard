// Wrap an HTMLElement around each element in an HTMLElement array.
HTMLElement.prototype.wrap = function (elms) {
  // Convert `elms` to an array, if necessary.
  if(!elms.length) elms = [elms];
  // Loops backwards to prevent having to clone the wrapper on the
  // first element (see `child` below).
  for(var i = elms.length - 1; i >= 0; i--) {
    var child = (i > 0) ? this.cloneNode(true) : this;
    var el = elms[i];
    // Cache the current parent and sibling.
    var parent = el.parentNode;
    var sibling = el.nextSibling;
    // Wrap the element (is automatically removed from its current
    // parent).
    child.appendChild(el);
    // If the element had a sibling, insert the wrapper before
    // the sibling to maintain the HTML structure; otherwise, just
    // append it to the parent.
    if(sibling) {
      parent.insertBefore(child, sibling);
    } else {
      parent.appendChild(child);
    }
  }
};
guid = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
var themeRoutes = {
  '/theme/edit$/': function () {
    console.log('edit template');
    var template = store.get('template');
    console.log('using template : ');
    console.log(template);
    var theme = store.get('theme');
    var account = store.get('account');
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var that = this;
      var ajax = new XMLHttpRequest();
      ajax.onload = function () {
        //FIXME this needs to be configurable!!!!!!!!!!!!
        var doc = this.responseXML;
        var html = Core9.xmlToString(that.responseXML);
        // with wrapper and no wrapper
        //doc.getElementsByTagName("body")[0].innerHTML = '<div id="gm-canvas" class="ui-sortable">' + html + '</div>';
        doc.getElementsByTagName("body")[0].innerHTML = html;
        // adding editor
        var templates = doc.getElementsByClassName("core9-template");
        var editor = document.createElement('div');
        editor.id = "mycanvas";
        editor.className = "ui-sortable core9-canvas";
        editor.wrap(templates);
        // adding editor
        //FIXME adding multiple editors
        var docString = Core9.xmlToString(doc);
        Core9.panel.open('panel-iframe-site');
        var iframe = Core9.panel.getIframeById('panel-iframe-site');
        Core9.iframe.write(iframe, docString, true);
        setTimeout(function () {
          var cmd = 'window.gm = jQuery("#mycanvas").gridmanager().data("gridmanager");$(".gm-preview").trigger("click");';
          Core9.iframe.parent.sentMessageToIframe(cmd, iframe);
        }, 1000); // smarter needs to be handled in sendMessage to iframe
        initPanelIframeSite = false;
      }
      ajax.open("GET", '/dashboard/data/accounts/' + account + '/themes/bower_components/' + theme + '/templates/pages/header.html');
      ajax.responseType = "document";
      ajax.send();
    }
    xhr.open("GET", template);
    xhr.responseType = "document";
    xhr.send();
  },
  '/themes/.*/blocks/.*/add$': function (req) {
    console.log('add block');
    console.log(window.location);
    var parts = location.pathname.split('/');
    var theme = parts[3];
    var block = parts[5];
    var iframe = Core9.panel.getIframeById('panel-iframe-site');
    var cmd = 'Core9.blocks.addBlock("' + block + '");';
    Core9.iframe.parent.sentMessageToIframe(cmd, iframe);
    setTimeout(function () {
      // var message = {
      //   action: "resetPageEditor"
      // }
      // Core9.iframe.child.sentMessageToParent(message);
      var iframe = Core9.panel.getIframeById('panel-iframe-site');
      var cmd = 'Core9.blocks.handler.init();';
      Core9.iframe.parent.sentMessageToIframe(cmd, iframe);
    }, 1000);
  },
  '/themes$': function (req) {
    console.log('themes');
    var init = function (modules) {
      var theme = Core9.system.unwrapModule(modules[0]);
      theme.setAccount(store.get('account'));
      var callback = function (data) {
          var themes = data[0].themes;
          if(initPanelThemes) {
            Object.keys(themes).forEach(function (key) {
              var insert = {
                "action": "addItems",
                "findmenusbytitle": "Themes",
                "addItems": [themes[key].data.menu]
              }
              Core9.iframe.parent.sentMessageToIframe(insert, document.getElementsByClassName('menu')[1]);
            });
            initPanelThemes = false;
          }
        }
        // for now no blocks in the menu
      theme.get(callback);
    }
    Core9.system.multiImport(['app/elements/core9-core/js/core-theme']).then(function (modules) {
      init(modules);
    });
  },
  '/templates$/': function () {
    Core9.panel.open('panel-themes');
    Core9.iframe.parent.sentMessageToIframe('init();', Core9.panel.getIframeById('panel-themes'));
  }
}
Router.addRoutes(themeRoutes);
