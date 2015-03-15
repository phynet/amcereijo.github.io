app.navModule =  (function() {
	var $mainElement = $('nav'),
		languangeList = [];

	function init() {
		console.log('nav init!!');
		$.subscribe('github/repo/data', processRepos);
	}

	function processRepos(evt, results) {
		var target = $mainElement.find('#laguages').get(0),
			data = results.data;
		for(var i=0,l=data.length;i<l;i++) {
			var language = data[i].language;
			insertLanguange(language, target);
		}
	}

	function insertLanguange(language, target) {
		if(language && languangeList.indexOf(language) === -1) {
			languangeList.push(language);
			var spanLanguage = document.createElement('span');
			spanLanguage.className = 'btn btn-default';
			spanLanguage.style.backgroundColor = app.util.randomColor();
			spanLanguage.innerHTML = language;
			target.appendChild(spanLanguage);
		}
	}

	return {
		init: init
	}
})();
app.navModule.init();