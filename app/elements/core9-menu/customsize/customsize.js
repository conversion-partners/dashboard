var arrMenu = [{
  title: 'All Categories',
  id: 'menuID',
  icon: 'fa fa-reorder',
  items: []
}];
$(document).ready(function () {
  var body = document.body,
    html = document.documentElement;
  var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  // HTML markup implementation, overlap mode
  $('#menu').multilevelpushmenu({
    menu: arrMenu,
    menuWidth: 220, // '450px', '30em', '25%' will also work
    menuHeight: height,
    onCollapseMenuEnd: function () {
      document.body.className = "menu-close";
    }
  });
  var cogClick = function (that) {
    Core9.iframe.child.sentMessageToParent({
      action: "cogClick",
      href: that.href,
      data: that.textContent
    });
  }
  var postClick = function () {
    Core9.iframe.child.sentMessageToParent({
      action: "menuClick",
      href: this.href,
      data: this.textContent
    });
  }
  var addItemsToMenu = function (title, items) {
    //console.log('adding to menu : ..');
    $('a').unbind('click', postClick);
    var $addTo = null;
    try {
      $addTo = $('#menu').multilevelpushmenu('findmenusbytitle', title).first();
    } catch(e) {
      //console.log(e);
    }
    $('#menu').multilevelpushmenu('additems', items, $addTo, 0);
    $('a').on('click', postClick);
  }
  $('a').on('click', postClick);
  $('.fa-reorder').on('click', postClick);
  var removeItemsFromMenu = function (title) {
    var item = $('#menu').multilevelpushmenu('finditemsbyname', title);
    $('#menu').multilevelpushmenu('removeitems', item);
  }
  var callback = function (event) {
    if(typeof event.data === 'undefined' || typeof event.data.action === 'undefined') return;
    if(event.data.action == 'addItems') {
      addItemsToMenu(event.data.findmenusbytitle, event.data.addItems);
      setTimeout(function () {
        console.log('setting on click on heading');
        $('h2').on('click', function () {
          $('#menu').multilevelpushmenu('collapse', 0);
        });
        $('i.fa-cog').on('click', function (event) {
          //console.log(this.parentNode);
          event.stopPropagation();
          cogClick(this.parentNode);
          return false;
        });
      }, 2000);
    }
  }
  Core9.iframe.child.listenToPostMessages(callback);
});
