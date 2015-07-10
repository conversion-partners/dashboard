var arrMenu = [ {
	title : 'All Categories',
	id : 'menuID',
	icon : 'fa fa-reorder',
	items : [  {
		name : 'Theme editor',
		link : '/dashboard/home'
	} ]
} ];

$(document).ready(
		function() {


var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

			// HTML markup implementation, overlap mode
			$('#menu').multilevelpushmenu({
				menu : arrMenu,
				menuWidth : 200, // '450px', '30em', '25%' will also work
				menuHeight : height
			});

			var postClick = function() {
				Core9.iframe.child.sentMessageToParent(
						{ action : "menuClick",
						  href : this.href,
						  data : this.textContent });
			}
			var addItemsToMenu = function(title, items) {
				//console.log('adding to menu : ..');
				$('a').unbind('click',postClick);
				var $addTo = null;
				try{
					$addTo = $('#menu').multilevelpushmenu('findmenusbytitle',
					title).first();
				}catch(e){
					//console.log(e);
				}

				$('#menu').multilevelpushmenu('additems', items, $addTo, 0);

				$('a').on('click',postClick);

			}
			$('a').on('click',postClick);
			$('.fa-reorder').on('click',postClick);


			var removeItemsFromMenu = function(title) {
				var item = $('#menu').multilevelpushmenu('finditemsbyname',
						title);
				$('#menu').multilevelpushmenu('removeitems', item);
			}


			var callback = function(event) {
				if(typeof event.data === 'undefined' || typeof event.data.action === 'undefined')return;
				if (event.data.action == 'addItems') {
					addItemsToMenu(event.data.findmenusbytitle,
							event.data.addItems);

				}
			}

			Core9.iframe.child.listenToPostMessages(callback);

		});


// to make menu draggable

/* 		var menu = document.getElementById('panel-iframe-menu');
var dragHandler = document.createElement('div');
dragHandler.setAttribute('id', 'draghandler');
dragHandler.addEventListener('dblclick', function (e) {
	  var iframe = document.getElementsByClassName('menu')[1];
	  var state = iframe.style.display;
	  if(state == 'block'){
		  iframe.style.display = 'none';
	  }else{
		  iframe.style.display = 'block';
	  }
});
menu.appendChild(dragHandler);
	DragDrop.bind(menu); */
