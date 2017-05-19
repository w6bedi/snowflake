// this is a small JS for posting a tweet, see comments in bot.js
// with an extension to do that every 20 seconds

console.log('The replier bot is starting...');

var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);

// with a stream function in order to react on a user interaction

var stream = T.stream('user'); // sets up a user stream - this is defining the stream

stream.on('tweet', tweetEvent); // anytime a tweet comes into teh accounts timeline - this is using the stream object

function tweetEvent(eventMsg) {
  //  var fs = require('fs'); // uses a node module - file system, required to work with files below
  //  var json = JSON.stringify(eventMsg,null, 2); // turning a JS object into a string
  //  fs.writeFile('tweet.json', json); //write the stringified object out into a JSON file, it is overwritten with every tweet that is triggered
    // could be alos just console.log but then we an not keep the information for later analysis
    
    var replyto = eventMsg.in_reply_to_screen_name;
    var text = eventMsg.text;
    var from = eventMsg.user.screen_name;
    
    console.log(replyto + ' ' + from);
    
    if (replyto === 'w6bedi2MO') {
        
        var newTweet = '@' + from + ' thank you for asking me to reply #w6bedi2MO'
        tweetIt(newTweet);
    }
    

}

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