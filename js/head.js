app.head = (function(){
	function init() {
		console.log('Head init');
		$.subscribe('github/user', processRepos);
	}

	function processRepos(evt, results) {
		var data =  results.data;
		var imageProfile = document.querySelector('.headerElement');
		app.util.render('#header-template', data, imageProfile);
	}
	return {
		init: init
	}
})();
app.head.init();