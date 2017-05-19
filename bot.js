// small JS for getting the last tweets for a special search item

console.log('The bot is starting...');

// adding the twit package - which was installed before via npm
var Twit = require('twit');

// declaring a config file for the connections to Twitter - look for config.js
var config = require('./config');

var T = new Twit(config);

var params = {
     q: 'Intershop since:2017-01-01', 
     count: 20
}

      
function gotData(err, data, response) {

    var tweets = data.statuses;
    
    for (var i = 0; i < tweets.length; i++) {
          console.log(tweets[i].text);
    }
}

T.get('search/tweets', params, gotData);