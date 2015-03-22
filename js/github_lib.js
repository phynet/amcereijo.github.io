app.github = (function() {
	var getUserName = function() {
		//http://username.github.io/
		var host = window.location.host || 'localhost',
			username;
		host = host.indexOf('localhost')!=-1? 'amcereijo.github.io':host;
		userName = host.replace(/.github.io/, '');
		return userName;
	},
	getReposUrl =  function() {
		return 'https://api.github.com/users/' + getUserName() +
			'/repos';
	},
	getReadMeUrl =  function(repoName) {
		return 'https://api.github.com/repos/' + getUserName() + 
			'/' + repoName + '/contents/README.md?ref=master';
	},
  getUserUrl = function() {
    return 'https://api.github.com/users/' + getUserName();
  },
	doCall = function(url, callback) {
		$.ajax({
			url: url,
			contentType: 'application/json'
		}).done(callback);
	},
	getRepos = function() {
		doCall(getReposUrl(), function(data) {
			$.publish('github/repo/data', {data:data});
		});
	},
	getReadme = function(repoName) {
		doCall(getReadMeUrl(repoName), function(data) {
			$.publish('github/readme/data', {data:data});
		});
	},
  getUser = function() {
    doCall(getUserUrl(), function(data) {
      $.publish('github/user', {data: data});
    });
  };

	return {
		getRepos: getRepos,
		getReadme: getReadme,
    getUser: getUser
	};
})();