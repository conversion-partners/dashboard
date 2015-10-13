// load menu in iframe needs to be in shadow root
document.body
  .appendChild(Core9.panel
    .create(
      'panel-iframe-menu',
      999,
      'menu',
      'iframe',
      '/dashboard/app/elements/core9-menu/customsize/customsize.html',
      false));

setTimeout(function() {
  p.then(function(msg) {
    Object.keys(Core9.panel.__registry).forEach(function(key) {
      var panel = Core9.panel.__registry[key];
      if (panel.url) {
        document.body.appendChild(Core9.panel.create(panel.id, panel['z-index'],
          panel.class, panel.type, panel.url,
          true));
        Core9.iframe.parent.sentMessageToIframe(Core9.panel.__registry[key].menu, document.getElementsByClassName('menu')[1]);
      }
    });
    setTimeout(function() {
      //document.getElementById('panel-iframe-menu').style.display = "none";
      //Core9.panel.open('panel-login');
    }, 1000);
    document.getElementsByClassName('menu')[1].style.visibility = "visible";
  });

}, 1500); // big fat hack needs a callback from on iframe loaded
