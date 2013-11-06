<<<<<<< HEAD
'use strict';
=======
'use strict'
>>>>>>> 090e7e93afe39823dd37c5f9ccfa17734da21eba

var CACHE_TIMEOUT = 1000 * 60 * 60; // 1 hour cache duration for each feed 

var FeedParser = require('feedparser'),
	request = require('request'),
	feeds = require("./feeds"),
	feedCache = {};

exports.get = function (req, res) {

<<<<<<< HEAD
	var index = Number(req.params.id),
		feedData = feeds.find(index);
=======
	var index = Number(req.params.id);
	var feedData = feeds.find(index);
>>>>>>> 090e7e93afe39823dd37c5f9ccfa17734da21eba
	
	if (!feedData) {
		res.send(404);
		return;
	}

<<<<<<< HEAD
	var cached = feedCache[feedData.id],
		sent = false;
=======
	var cached = feedCache[feedData.id];
	var sent = false;
>>>>>>> 090e7e93afe39823dd37c5f9ccfa17734da21eba
	
	res.set('Content-Type', 'application/json');

	// Check the cache and ensure it is not stale
	if (cached && cached.timestamp > (new Date().getTime() - CACHE_TIMEOUT)) {
		res.send(200, cached);
	} else {
		feedCache[feedData.id] = {
			timestamp: new Date().getTime(),
			id: feedData.id,
<<<<<<< HEAD
			data: {
				items: []
=======
			data: { 
				items: [] 
>>>>>>> 090e7e93afe39823dd37c5f9ccfa17734da21eba
			}
		};

		var buffer = feedCache[feedData.id];

		request(feedData.url)
			.pipe(new FeedParser())
			.on('error', function (error) {
				console.error('Parsing error: ', error);
				res.send(500);
				sent = true;
			})
			.on('meta', function (meta) {
				buffer.title = meta.title;
				buffer.description = meta.description;
			})
			.on('readable', function () {
				var stream = this, item;
				while (item = stream.read()) {
					buffer.data.items.push({
						title: item.title || item.description,
						summary: item.summary || item.description,
						href: item.link,
						index: buffer.data.items.length,
						url: "/feeds/" + buffer.id + "/" + buffer.data.items.length
					});
				}
			})
			.on('end', function () {
<<<<<<< HEAD
				if (!sent) { res.send(200, buffer); }
=======
				if (!sent) {
					res.send(200, buffer);
				}
>>>>>>> 090e7e93afe39823dd37c5f9ccfa17734da21eba
			});
	}
}

exports.summary = function (req, res) {

	var feedId = req.params.feedId,
		storyId = req.params.storyId,
		feed = feedCache[feedId];

	if (!feed) {
		res.send(404, {message: "Unknown feed id: " + feedId});
	} else {
		var story = feed.data.items[storyId];
		if (!story) {
			res.send(404, {message: "Unknown story id: " + storyId});
		} else {
			res.set('Content-Type', 'text/html');
			res.send(200, "<html>" +
						  "  <head>" +
<<<<<<< HEAD
						  "    <link rel='stylesheet' href='/lib/bootstrap-3/css/bootstrap.css'>" +
=======
						  "    <link rel='stylesheet' href='/lib/bootstrap-3/css/bootstrap.css'>"+
>>>>>>> 090e7e93afe39823dd37c5f9ccfa17734da21eba
						  "  </head>"+
						  "  <body>" +
						  		story.summary +
						  "  </body>" +
						  "</html>");
		}
	}
};