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
		randomColor = function() {
			var letters = '0123456789ABCDEF'.split(''),
				color = '#',
				i;
			do {
		    	for (i = 0; i < 6; i++ ) {
		        	color += letters[Math.floor(Math.random() * 16)];
		    	}
		    } while(colors.indexOf(color) !== -1);
		    colors.push(color);
		    return color
		};
	return {
		randomColor: randomColor
	}
})();

$(document).ready(function() {
	console.log('ready!!');
	app.github.getRepos();
});
