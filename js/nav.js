

app.navModule =  (function() {
	var $mainElement = $('nav'),
		languangeList = [],
		anguageButtons;

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
		languageButtons = $('.languageBtn');
		languageButtons.click(clickLanguageButton);
	}

	function clickLanguageButton(evt) {
		var $target = $(evt.target);
		languageButtons.removeClass('disabled');
		$target.addClass('disabled');
		$.publish('github/readme/data/filter', $target.data('language'));
		//app.main.filterLanguage($target.data('language'));
	}

	return {
		init: init
	}

})();
app.navModule.init();