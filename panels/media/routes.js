



var mediaRoutes = {
  '/media$/': function(req) {
    console.log("media menu");
    Core9.panel.open('panel-media');
  }
}
Router.addRoutes(mediaRoutes);
