var github = (function() {
	var getUserName = function() {
		//http://username.github.io/
		//var host = 'amcereijo.github.io',
		var host = window.location.host,
			userName = host.replace(/.github.io/, '');
		return userName;
	},
	getReposUrl =  function() {
		return 'https://api.github.com/users/' + getUserName() +
			'/repos';
	},
	getRepos = function(target) {
		$.ajax({
			url: getReposUrl(),
			contentType: 'application/json'
		}).done(function(data) {
			console.log('getRepos: ' + JSON.stringify(data));
			target.text(JSON.stringify(data));
		});
	};

	return {
		getRepos: getRepos
	};
})();