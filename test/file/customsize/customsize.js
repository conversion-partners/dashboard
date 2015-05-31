$(document).ready(function(){
	// HTML markup implementation, overlap mode
	$( '#menu' ).multilevelpushmenu({
		containersToPush: [$( '#pushobj' )],
		menuWidth: 200, // '450px', '30em', '25%' will also work
		menuHeight: 400
	});



	var addItems = function(title, items){
		var $addTo = $( '#menu' ).multilevelpushmenu( 'findmenusbytitle' , title ).first();
		$( '#menu' ).multilevelpushmenu( 'additems' , items , $addTo , 0 );
	}

	// Remove Samsung items
	var removeItems = function(title){
		var item = $( '#menu' ).multilevelpushmenu( 'finditemsbyname' , title );
		$( '#menu' ).multilevelpushmenu( 'removeitems' , item );
	}


	$('a').on('click',function(){
		Core9.sentMessageToParent("menu item clicked : " + this.textContent);
	});

	var callback = function(event){
		console.log('message from callback : ');
		console.log(event)
		if(event.data.action == 'addItems'){
			var $addTo = $( '#menu' ).multilevelpushmenu( 'findmenusbytitle' , event.data.findmenusbytitle ).first();
			$( '#menu' ).multilevelpushmenu( 'additems' , event.data.addItems , $addTo , 0 );
		}
	}
	Core9.listenToPostMessages(callback);
});