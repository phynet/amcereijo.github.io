

app.navModule =  (function() {
	var $mainElement = $('nav'),
		languangeList = [];

	function init() {
		console.log('nav init!!');
		$.subscribe('github/repo/data', processRepos);
	}

	function processRepos(evt, results) {
		var target = $mainElement.find('#laguages').get(0),
			data = results.data,
			languages = [],
			language; 
		for(var i=0,l=data.length;i<l;i++) {
			language = data[i].language || 'other';
			if(languangeList.indexOf(language) === -1) {
				languangeList.push(language);
				languages.push({name: language, color: app.util.randomColor(language)});
			}
		}
		app.util.render('#nav-languanges-template', {languages:languages}, target);
	}

	function insertLanguange(language, target) {
		language = language || 'other';
		if(language && languangeList.indexOf(language) === -1) {
			languangeList.push(language);
			var spanLanguage = document.createElement('span');
			spanLanguage.className = 'btn btn-default';
			spanLanguage.style.backgroundColor = app.util.randomColor(language);
			spanLanguage.innerHTML = language;
			target.appendChild(spanLanguage);
		}
	}

	return {
		init: init
	}
})();
app.navModule.init();