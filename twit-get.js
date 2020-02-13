
{
    "dependencies"; {
        "twit"
    }
}
console.log('The bot is starting');
//
var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);
var searchString = "Testing"
var params = {
    q: 're4s0n4',
    count: 100
}

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
    var tweets = data.statuses;
    for (var i = 0; i < tweets.length; i++){
        if (err) {
            console.log(err[i].messages)
        }
        else {
            if (tweets[i].text.includes(searchString)) {
                console.log(tweets[i].text);
                
                   T.post('statuses/destroy/:id', { id: tweets[i].id_str }, function (err, data, response) {
                       console.log(data)
                   })
            }
            

        }    
    }

}
