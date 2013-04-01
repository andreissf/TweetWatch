var Watcher = require('./TweetWatcher/Watcher');
var fs = require('fs');
var util = require("util");

Watcher.init('javascript or #javascript');

Watcher.on("data", function(data){
	var tweetsText = "\n################ ONLY THE TEXT ################\n";
	for(var i = 0; i < data.results.length; i++)
	{
		tweetsText = tweetsText + (data.results[i].text) + "\n";
	}

	fs.writeFile("./tweetsJSON", (util.inspect(data) + tweetsText), function(err){
		if(err)
		{
			console.log(err);
		}	
		else
		{
			console.log("SAVED");
		}	
	})

});