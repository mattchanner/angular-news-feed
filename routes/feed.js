'use strict';

var CACHE_TIMEOUT = 1000 * 60 * 60; /* 1 hour cache duration for each feed */

var FeedParser = require('feedparser'),
	request = require('request'),
	feeds = require("./feeds"),
	feedCache = {};	

exports.get = function (req, res) {

	var index = Number(req.params.id);
	var feedData = feeds.find(index);
	
	if (!feedData) {
		res.send(404);
		return;
	}

	var cached = feedCache[feedData.id], sent = false;

	
	// Check the cache and ensure it is not stale
	if (cached && cached.timestamp > ((new Date().getTime()) - CACHE_TIMEOUT))
	{
		res.set('Content-Type', 'application/json');
		res.send(200, cached.data);	
	}
	else
	{
		feedCache[feedData.id] = { timestamp: new Date().getTime(), data: {items: [] } };
		var buffer = feedCache[feedData.id];

		request(feedData.url)
			.pipe(new FeedParser())
			.on('error', function (error) {
				console.error('Parsing error: ', error)
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
						index: buffer.data.items.length
					})
				}
			})
			.on('end', function () {
				if (!sent) {
					res.set('Content-Type', 'application/json');
					res.send(200, buffer);	
				}				
			});
	}	
}