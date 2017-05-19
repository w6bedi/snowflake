// this is a small JS for posting a tweet, see comments in bot.js
// with an extension to do that every 20 seconds

console.log('The follow bot is starting...');

var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);

// with a stream function in order to react on a user interaction

var stream = T.stream('user'); // sets up a user stream - this is defining the stream

stream.on('follow', followed); // anytime someone follows - this is using the stream object

function followed(eventMsg) {
    console.log('followed');
    var name = eventMsg.source.name;
    var screenName = eventMsg.source.screen_name;
    var r = Math.floor(Math.random()*100);
    tweetIt('.@' + screenName + ' and number'+ r +' Thanks you for following');
    
}


// here is the real tweet function

// tweetIt();

// setInterval(tweetIt, 1000*20)

function tweetIt(txt) {
    
var tweet = { 
    status: txt 
}

function tweeted(err, data, response) {
  if (err) {
      console.log("something went wrong!")
            } else {
            console.log("all ok!" + txt)
            }
        }

    T.post('statuses/update', tweet , tweeted)
    
}