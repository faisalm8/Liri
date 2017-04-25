// main variables
var nodeArgs = process.argv;
var operator = nodeArgs[2];
var searchItem = '';

	// if multi word searchItem
	for (var i=3; i<nodeArgs.length; i++) {
		if (i>3 && i<nodeArgs.length) {
			searchItem = searchItem + '+' + nodeArgs[i];
		} else {
			searchItem = searchItem + nodeArgs[i];
		}
	}

var keys = require('./keys.js');
var keysList = keys.twitterKeys;
var request = require('request');
var fs = require('fs');

// switch statement to determine action
switch (operator) {
	case 'my-tweets':
		twitter();
		break;
	case 'spotify-this-song':
		spotify();
		break;
	case 'movie-this':
		movie();
		break;
	case 'do-what-it-says':
		random();
		break;
}


// functions for 'my-tweets', 'spotify-this-song', 'movie-this', and 'do-what-it-says'


// 'my-tweets': 20 most recent tweets and date/time
function twitter() {
	var Twitter = require('twitter');
	var client = new Twitter({
		consumer_key: keysList.consumer_key,
		consumer_secret: keysList.consumer_secret,
		access_token_key: keysList.access_token_key,
		access_token_secret: keysList.access_token_secret
	});
	var params = {
		screen_name: 'ttweettest',
		count: 20
	};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			console.log('----------------------------------------');
			console.log('User: @' + params.screen_name);
			console.log('20 most recent tweets');
			console.log('----------------------------------------');
			for (var i=0; i<tweets.length; i++) {
				console.log('Tweet: ' + tweets[i].text);
				console.log('Date/Time: ' + tweets[i].created_at);
				console.log('----------------------------------------');
			}
		}
	});
}


// spotify-this-song: 

// return song information
function spotify() {
	var spotify = require('spotify');

	switch (searchItem) {
		case '':
			spotify.search({type: 'track', query: 'come+together'}, function(err, data) {
				if (err) {
					console.log('Error occurred: ' + err);
					return;
				}
				var songObject = data.tracks.items[0];
				songInfo(songObject);
			})
			break;
		default:
			spotify.search({ type: 'track', query: searchItem }, function(err, data) {
				if (err) {
					console.log('Error occurred: ' + err);
					return;
				}
				var songObject = data.tracks.items[0];
				songInfo(songObject);
			})
	}
}

// display song information
function songInfo(songObject) {
	console.log('----------------------------------------');
	console.log('Artist(s): ' + songObject.artists[0].name);
	console.log('Song: ' + songObject.name);
	console.log('Album: ' + songObject.album.name);
	console.log('Preview: ' + songObject.preview_url);
	console.log('----------------------------------------');
}


// movie-this:

// return movie information
function movie() {
	switch ( searchItem ) {
		case '':
			request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&tomatoes=true&r=json", function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var movieObject = JSON.parse(body);
					movieInfo(movieObject);
				}
			});
			break;
		default:
			request("http://www.omdbapi.com/?t=" + searchItem + "&y=&plot=short&tomatoes=true&r=json", function (error, response, body) {
				if (!error && response.statusCode == 200) {
					var movieObject = JSON.parse(body);
					movieInfo(movieObject);
				}
			});
	}
}

// display movie information
function movieInfo(movieObject) {
	console.log('----------------------------------------');
	console.log('Title: ' + movieObject.Title);
	console.log('Year: ' + movieObject.Year);
	console.log('IMBD Rating: ' + movieObject.imdbRating);
	console.log('Country: ' + movieObject.Country);
	console.log('Language: ' + movieObject.Language);
	console.log('Plot: ' + movieObject.Plot);
	console.log('Actors: ' + movieObject.Actors);
	console.log('Rotten Tomatoes Rating: ' + movieObject.tomatoRating);
	console.log('Rotten Tomatoes Link: ' + movieObject.tomatoURL);
	console.log('----------------------------------------');
}



































