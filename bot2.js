// this is a small JS for posting a tweet, see comments in bot.js

console.log('The bot is starting...');

var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);

// here is the real tweet function

tweetIt();

setInterval(tweetIt, 1000*20)

function tweetIt() {

var r = Math.floor(Math.random()*100);
    
var tweet = { 
    status: 'This is number ' + r + ' #w6bedi getting excited' 
}

function tweeted(err, data, response) {
  if (err) {
      console.log("something went wrong!")
            } else {
            console.log("all ok!")
            }
        }

    T.post('statuses/update', tweet , tweeted)
    
}