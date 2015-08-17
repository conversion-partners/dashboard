
// interface provided to the plugin
var image = document.getElementById('image');
var setImage = function(src) {
    image.style.backgroundImage = 'url('+src+')';
}

var link = document.getElementById('link');
var setLink = function(src) {
    link.href = src;
}

var api = {
    setImage: setImage,
    setLink: setLink
}


// clears the banner
var reset = function() {
    plugin = null;
    setImage('empty.png');
    setLink('#');
}


// initalize everything
var plugin;
var scripts = document.getElementsByTagName('script');
var path = scripts[scripts.length-1].src
    .split('/')
    .slice(0, -1)
    .join('/')+'/';


// creates the plugin, provides the interface
document.getElementById('connect').onclick = function() {

  console.log(path);
  console.log(path+'banner.js');



    path = location.origin + "/dashboard/data/accounts/easydrain/blocks/bower_components/image/forms/frontend/steps/result/result.js";

    plugin = plugin || new jailed.Plugin(path, api);   //path+'banner.js'
}


// disconnects the plugin, resets the banner
document.getElementById('disconnect').onclick = function() {
    if (plugin) {
        plugin.disconnect();
        reset();
    }
}

reset();
