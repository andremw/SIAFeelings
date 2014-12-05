'use strict';

var twit = require('twit'),
		sentimentAnalyze = require('Sentimental').analyze;
var T = new twit({
  consumer_key: '',
  consumer_secret: '',
  access_token: '',
  access_token_secret: ''
});

var analyzedTweets = [],
		tweetCount = null,
		sentimentPoints = 0;

// functions

var handleNewTweet = null;

T.get('search/tweets',
	{
		q: 'estacio sia since:2014-10-01',
		count: 100
	},
	function (err, data, response) {
		var tweetText = null;

		console.log('------ Old tweets ------\n');
		tweetCount = data.statuses.length - 1;
		for (tweetCount; tweetCount >= 0; tweetCount--) {
			tweetText = data.statuses[tweetCount].text;
			if (analyzedTweets.indexOf(tweetText))
			sentimentPoints += sentimentAnalyze(tweetText).score;
		}

		console.log('----- TWITTER SENTIMENT -----\n');
		console.log(sentimentPoints);
		console.log('\n----------------')
	}
);

var stream = T.stream('statuses/filter', {
	track: 'estacio sia'
});

handleNewTweet = function(tweet) {
	console.log('New tweet.. Hope it sounds kind!');
	sentimentPoints += sentimentAnalyze(tweet.text).score;
	console.log('Now sentiment is %d', sentimentPoints);
};

stream.on('tweet', handleNewTweet);

console.log('\nChecking for new twits! :)\n\n');
