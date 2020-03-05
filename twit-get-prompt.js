console.log('The bot is starting');
//
const Twit = require('twit');
const confirm = require('prompt-confirm');
const config = require('./config');
const T = new Twit(config);
let searchString = ""
let params = {
    q: 're4s0n4',
    count: 3
}

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
    var tweets = data.statuses;
    
    // searchString comes from closure above
    processTweets(tweets, searchString);
}

// local searchString param takes scope precedence over global variable above
function processTweets(tweets, searchString) {
    // Exit recursion. No more tweets to process
    if(tweets.length === 0)
           return;
    
    // Extract the first tweet in the array
    const tweet = tweets[0];
    
    // If it doesn't match, skip it and process the remaining tweets in the array
    if (!tweet.text.includes(searchString)) 
        processTweets(tweets.slice(1));
     
    const prompt = new confirm(`Do you want to delete "${tweet.text}"?`)
        .run()
        .then(function (answer) {
            // Prompt finishes. Do something
            console.log(answer);
            if (answer == true) {
                console.log(`Deleting "${tweets[i].text}"`);
                
            } else {
                console.log("Nope");
            }
        }) // maybe it finished, or maybe it failed, either way, process the remaining array of tweets
        .finally(()=>{processTweets(tweets.slice(1))}); 
}
