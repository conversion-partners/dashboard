var loginRoutes = {
  '/login$/': function(req) {
    Core9.panel.close('panel-login');
  }
}
Router.addRoutes(loginRoutes);
