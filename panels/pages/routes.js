var pageRoutes = {
  '/pages$/': function(req) {
    var init = function(modules) {
      var theme = Core9.system.unwrapModule(modules[0]);
      var callback = function(data) {
        var themes = data[0].themes;
        if (initPanelpages) {
          Core9.iframe.parent.sentMessageToIframe('initNestable([],' + JSON.stringify(themes) + ');', Core9.panel.getIframeById('panel-pages'));
          initPanelpages = false;
        }
      }
      theme.get(callback);
      Core9.panel.open('panel-pages');
    }
    Core9.system.multiImport(['app/elements/core9-core/js/core-theme'])
      .then(function(modules) {
        init(modules);
      });
  },
  '/page/editor$/': function() {
    Core9.panel.open('panel-iframe-site');
    if (initPanelIframeSite) {
      var iframe = Core9.panel.getIframeById('panel-iframe-site');
      var cmd = 'window.gm = jQuery("#mycanvas").gridmanager().data("gridmanager");';
      Core9.iframe.parent.sentMessageToIframe(cmd, iframe);
      initPanelIframeSite = false;
    }
  }
}
Router.addRoutes(pageRoutes);
