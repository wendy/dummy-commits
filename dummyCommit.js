var rp = require('request-promise');

var user = 'wendyleung';

var options = {
  uri: 'https://api.github.com/users/' + user + '/events/public?per_page=1',
  headers: {
    'User-Agent':'wendyleung'
  }
};

rp(options)
  .then(function(res) {
    var lastCommit = new Date(JSON.parse(res)[0].created_at);
    var date = new Date();
    date.setDate(date.getDate() - 1);

    // if no commits yesterday
    if (lastCommit.getDate() !== date.getDate()) {

      // do something
    }
  })