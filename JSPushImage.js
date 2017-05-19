// this is a small JS for posting a tweet, see comments in bot.js
// this now includes a posting of an Image
// for Image processing we use _processing_

console.log('The bot is starting...');

var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);


var exec = require('child_process').exec; // access to a child process package within node - required to run the shell script with processing

var fs  = require('fs');
// var T = new Twit(config);


// here is the real tweet function

tweetIt();

function tweetIt() {
    var cmd = 'processing-java --sketch=`pwd`/Images --run' // defining a Shell command to create an Image --> processing
    exec(cmd, processing);
    
    function processing() {
        var filename = 'Images/output.png';
        var params = {
            encoding: 'base64'
        }
        
        var b64 = fs.readFileSync(filename, params);
        
        T.post('media/upload', { media_data: b64}, uploaded);  
        
        console.log('Images uploaded')
        
        function uploaded(err, data, response) {
            var id = data.media_id_string;
            var tweet = {
                status: '#w6bedi2MO live pushing Images',
                media_ids: [id]
            }
            T.post('statuses/update', tweet, tweeted); 
            
        console.log('tweeted');
        }    
                
           
        function tweeted(err, data, response) {
            if (err) {
                console.log("something went wrong!");
            } else {
                 console.log("all ok!");
                }
        }
        
    }
    
}