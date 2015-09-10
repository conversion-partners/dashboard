var loginRoutes = {
  '/login$/': function(req) {
    store.set('login', 'true');
    Core9.panel.close('panel-login');
  }
}
Router.addRoutes(loginRoutes);
