app.main = (function(){
	var $mainElement = $('main'),
		data;

	function init() {
		console.log('main init!!');
		$.subscribe('github/repo/data', processRepos);
		$.subscribe('github/readme/data', processReadme);
		$.subscribe('github/readme/data/filter', filterLanguage);
	}

	function processRepos(evt, results) {
		data = results.data;
		console.log('getRepos: ' + JSON.stringify(data));
		writeElements(data);
		$('.searchRepos').keyup(function(evt) {
		 	filterData(evt.target.value);
		});
		$(document).on('click', '.project-name', clickProject);
	}

	function clickProject(evt) {
		var $panel = $(evt.target).closest('.panel'),
			index = $panel.data('projectid'),
			activeElement = data[index],
			$moreStuffElement = $panel.find('.more-stuff');
		if(!$moreStuffElement.hasClass('active')) {
			$('.more-stuff').removeClass('active').addClass('hide');
			$moreStuffElement.toggleClass('hide').addClass('active');
			$('.glyphicon').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
			app.github.getReadme(activeElement.name);
		} else {
			$moreStuffElement.addClass('hide').removeClass('active');
		}
		$panel.find('.glyphicon').toggleClass('glyphicon-chevron-up').toggleClass('glyphicon-chevron-down');
		
	}

	function processReadme(evt, result) {
		result = result.data;
		var markdownText = atob(result.content);
		var activeElement = $('.more-stuff.active').find('.panel-body');
		console.log(result.name + ' ,content:'+result.content);
		console.log( markdown.toHTML( markdownText ) );
		activeElement.html(markdown.toHTML( markdownText ));
	}

	function writeElements(list) {
		list = completeWithColors(list);
		app.util.render('#project-list-template', 
			{projects: list}, $mainElement);
	}

	function completeWithColors(list) {
		for(var i=0,l=list.length;i<l;i++) {
			list[i].color = app.util.randomColor(list[i].language);
		}
		return list;
	}

	function filterData(text) {
		console.log('flter by name: ' + text);
		filter(text, function(value) {
			var fullName = value.full_name.toLowerCase();
				text = text.toLowerCase();
			return (fullName.indexOf(text) !== -1);
		});
	}

	function filterLanguage(evt, language) {
		console.log('flter by language: ' + language);
		filter(language, function(value) {
			var elementLanguage = (value.language?value.language:'Other').toLowerCase();
				language = language.toLowerCase();
			return (elementLanguage === language);
		});
	}

	function filter(value, filterFuncion) {
		var filterData = value? data.filter(filterFuncion) : data;		
		$mainElement.empty();
		writeElements(filterData);
	}

	return {
		init: init
	};

})();
app.main.init();
