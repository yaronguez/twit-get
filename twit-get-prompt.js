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
    for (let i = 0; i < tweets.length; i++){
        
        if (tweets[i].text.includes(searchString)) {
            //console.log(tweets[i].text);
            let prompt = new confirm(`Do you want to delete "${tweets[i].text}"?`);
            prompt.run()
            .then(function (answer) {
                console.log(answer);
                if (answer == true) {
                    console.log(`Deleting "${tweets[i].text}"`);
                    
                } else {
                    console.log("Nope");
                }
            });
            
            //T.post('statuses/destroy/:id', { id: tweets[i].id_str }, function (err, data, response) {
            //    console.log(data)
            //})
        }
            

           
    }

}
