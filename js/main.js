app.main = (function(){
	var $mainElement = $('main'),
		data;

	function init() {
		console.log('main init!!');
		$.subscribe('github/repo/data', processRepos);
	}

	function processRepos(evt, results) {
		data = results.data;
		console.log('getRepos: ' + JSON.stringify(data));
		writeElements(data);
		$('.searchRepos').keyup(function(evt) {
		 	filterData(evt.target.value);
		});
		$('.project-name').click(function(evt) {
			$(evt.target).closest('.panel').find('.more-stuff').toggleClass('hide');
		});
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
		console.log('flter by ' + text);
		var filterData = text? data.filter(function(value) {
			var fullName = value.full_name.toLowerCase();
				text = text.toLowerCase();
			return (fullName.indexOf(text) !== -1);
		}) : data;		
		$mainElement.empty();
		writeElements(filterData);
	}

	return {
		init: init,
		filterData: filterData
	};

})();
app.main.init();
