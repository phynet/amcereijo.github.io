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
		var letters = 'ABCDE'.split(''),
			color = '#',
			i;
		language = language || 'other';
		if(languageColors[language]) {
			return languageColors[language];
		}
		do {
	    	for (i = 0; i < 3; i++) {
	        	color += letters[Math.floor(Math.random() * letters.length)];
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

	$('.searchRepos').keyup(function(evt) {
	 	app.main.filterData(evt.target.value);
	});

});
