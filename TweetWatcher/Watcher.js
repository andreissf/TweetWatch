var http = require('http');
var fs = require('fs');
var util = require('util');

var events = require('events');
var Twitter = require('twitter');

var cjson   = require('cjson');
var config  = cjson.load(__dirname + '/../config.json');

var Tweet = new Twitter({
	consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_secret,
    access_token_key: config.twitter.access_token_key,
    access_token_secret: config.twitter.access_token_secret
});

var Watcher = function ()
{
	events.EventEmitter.call(this);	
}

util.inherits(Watcher, events.EventEmitter);

Watcher.prototype.write = function (data)
{
	var self = this;
	self.emit('data', data);
} 

Watcher.prototype.init = function(hashtag)
{
	this.hashtag = hashtag;
	http.createServer(function (req, res) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
	}).listen(8000, '127.0.0.1');

	this.getTweets();
}

Watcher.prototype.getTweets = function (hashtag)
{
	var self = this;
	Tweet.search(this.hashtag, function(data) {
    		self.write(data);
		});
	
	setInterval(function(){
		self.getTweets();
	}, 10000);
}

module.exports = new Watcher();