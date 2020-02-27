console.log('The bot is starting');
//
const Twit = require('twit');
const confirm = require('prompt-confirm');
const config = require('./config');
const T = new Twit(config);
var searchString = ""
var params = {
    q: 're4s0n4',
    count: 3
}

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
    var tweets = data.statuses;
    processTweets(tweets);
}

function processTweets(tweets) {
    if(tweets.length === 0)
           return;
    
    const tweet = tweets[0];
    const prompt = new confirm(`Do you want to delete "${tweet.text}"?`)
        .run()
        .then(function (answer) {
            console.log(answer);
            if (answer == true) {
                console.log(`Deleting "${tweets[i].text}"`);
                
            } else {
                console.log("Nope");
            }
        })
        .finally(()=>{processTweets(tweets.slice(1))});
}
