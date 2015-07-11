




var themeRoutes = {
  '/themes$/': function() {
    var init = function(modules) {
      var theme = Core9.system.unwrapModule(modules[0]);
      theme.setAccount(store.get('account'));
      console.log(theme);
      var callback = function(data) {
        var themes = data[0].themes;
        if (initPanelThemes) {
          Object.keys(themes).forEach(function(key) {
            var insert = {
              "action": "addItems",
              "findmenusbytitle": "Themes",
              "addItems": [themes[key].data.menu]
            }
            Core9.iframe.parent.sentMessageToIframe(insert, document.getElementsByClassName('menu')[1]);
          });
          Core9.iframe.parent.sentMessageToIframe('initNestable([],' + JSON.stringify(themes) + ');', Core9.panel.getIframeById('panel-themes'));
          initPanelThemes = false;
        }
      }
      theme.get(callback);
      Core9.panel.open('panel-themes');
    }
    Core9.system.multiImport(['app/elements/core9-core/js/core-theme'])
      .then(function(modules) {
        init(modules);
      });
  },
  '/themes/.*/': function() {
    Core9.panel.open('panel-iframe-site');
    if (initPanelIframeSite) {
      var iframe = Core9.panel.getIframeById('panel-iframe-site');
      var cmd = 'window.gm = jQuery("#mycanvas").gridmanager().data("gridmanager");';
      Core9.iframe.parent.sentMessageToIframe(cmd, iframe);
      initPanelIframeSite = false;
    }
  }
}
Router.addRoutes(themeRoutes);
