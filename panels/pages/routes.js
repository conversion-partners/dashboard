var pageRoutes = {
  '/pages$/': function(req) {
    Core9.panel.open('panel-pages');
    Core9.iframe.parent.sentMessageToIframe('init();', Core9.panel.getIframeById('panel-pages'));
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
