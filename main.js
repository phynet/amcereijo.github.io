app.main = (function(){
	var $mainElement = $('main');

	function init() {
		console.log('main init!!');
		$.subscribe('github/repo/data', processRepos);
	}

	function processRepos(evt, results) {
		var data = results.data;
		console.log('getRepos: ' + JSON.stringify(data));
		var ul = document.createElement('ul');
		$mainElement.append(ul);
		for(var i=0,l=data.length;i<l;i++) {
			var li = document.createElement('li');
			li.innerHTML = data[i].full_name;
			li.style.backgroundColor = app.util.randomColor(data[i].language);
			ul.appendChild(li);
		}
	}

	return {
		init: init
	};

})();
app.main.init();
