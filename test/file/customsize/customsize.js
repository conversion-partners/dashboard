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

	});

});