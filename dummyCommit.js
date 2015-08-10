var rp = require('request-promise');
var config = require('./config');
var user = config.user;
var repo = config.repo;
var email = config.email;
var headers = {
  'User-Agent': user,
  'Authorization': 'token ' + config.accessToken
};
var date = new Date();
date.setDate(date.getDate() - 1);

var options = {
  getLastUserCommit : {
    uri: 'https://api.github.com/users/' + user + '/events/public?per_page=1',
    headers: headers
  },
  getLastRepoCommit: {
    uri: 'https://api.github.com/repos/' + user +'/' + repo + '/commits?per_page=1',
    headers: headers
  },
  createDummyCommit: {
    uri: 'https://api.github.com/repos/' + user +'/' + repo + '/git/commits',
    json: true,
    method: 'POST',
    body: {
      message: '(update) dummy commit - ' + date,
      author: {
        name: user,
        email: email,
        date: date.toISOString()
      }
    },
    headers: headers
  },
  updateHeadRef: {
    uri: 'https://api.github.com/repos/' + user +'/' + repo + '/git/refs/heads/master',
    json: true,
    method: 'PATCH',
    body: {
      force: true
    },
    headers: headers
  }
};

var makeDummyCommit = function() {
  // Get the last commit
  return rp(options.getLastRepoCommit)
    .then(function(res) {
      options.createDummyCommit.body.tree = JSON.parse(res)[0].commit.tree.sha;
      options.createDummyCommit.body.parents = [JSON.parse(res)[0].sha];

      // Create new commit
      return rp(options.createDummyCommit);
    })
    .then(function(res) {
      options.updateHeadRef.body.sha = res.sha;

      // Point head to new commit
      return rp(options.updateHeadRef);
    })
    .then(function(res) {
      console.log(res);
    })
    .catch(function(err) {
      console.log(err);
    });
};

rp(options.getLastUserCommit)
  .then(function(res) {
    var lastCommit = new Date(JSON.parse(res)[0].created_at);

    // if no commits yesterday
    if (lastCommit.getDate() !== date.getDate()) {
      makeDummyCommit();
    }
  })

