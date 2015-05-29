//respond to events





    $(document).ready(function(){ 
        window.gm = jQuery("#mycanvas").gridmanager().data('gridmanager');
        
var domain = location.protocol +"//"+ location.host;
window.addEventListener('message',function(event) {
	if(event.origin !== domain) return;
	console.log('message received:  ' + event.data,event);
	eval(event.data);
	event.source.postMessage('status: ...',event.origin);
},false);
        
    });