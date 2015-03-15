(function($) {
  var o = $({});

  $.subscribe = function() {
    o.on.apply(o, arguments);
  };

  $.unsubscribe = function() {
    o.off.apply(o, arguments);
  };

  $.publish = function() {
    o.trigger.apply(o, arguments);
  };

}(jQuery));

var app = {};
app.util = (function(){
	var colors = [],
		languageColors = {};

	function randomColor(language) {
		var letters = '0123456789ABCDEF'.split(''),
			color = '#',
			i;
		language = language || 'other';
		if(languageColors[language]) {
			return languageColors[language];
		}
		do {
	    	for (i = 0; i < 6; i++ ) {
	        	color += letters[Math.floor(Math.random() * 16)];
	    	}
	    } while(colors.indexOf(color) !== -1);
	    colors.push(color);
	    languageColors[language] = color;

	    return color
	}
	return {
		randomColor: randomColor
	}
})();

$(document).ready(function() {
	console.log('ready!!');
	app.github.getRepos();
});
