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
		var ul = document.createElement('ul');
		$mainElement.append(ul);
		writeElements(data, ul);
	}

	function writeElements(list, target) {
		for(var i=0,l=list.length;i<l;i++) {
			var li = document.createElement('li');
			li.innerHTML = list[i].full_name;
			li.style.backgroundColor = app.util.randomColor(list[i].language);
			target.appendChild(li);
		}
	}

	function filterData(text) {
		console.log('flter by ' + text);
		var filterData = text? data.filter(function(value) {
			var fullName = value.full_name.toLowerCase();
				text = text.toLowerCase();
			return (fullName.indexOf(text) !== -1);
		}) : data;		
		$mainElement.empty();
		var ul = document.createElement('ul');
		$mainElement.append(ul);
		writeElements(filterData, ul);

	}

	return {
		init: init,
		filterData: filterData
	};

})();
app.main.init();
