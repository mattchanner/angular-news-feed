'use strict'

CACHE_TIMEOUT = 1000 * 60 * 60 # 1 hour cache duration for each feed 

FeedParser = require 'feedparser'
request = require 'request'
feeds = require "./feeds"
feedCache = {}

exports.get = (req, res) ->

	index = Number(req.params.id)
	feedData = feeds.find index
	
	if feedData is false
		res.send(404)
		return

	cached = feedCache[feedData.id]
	sent = false
	
	res.set 'Content-Type', 'application/json'

	# Check the cache and ensure it is not stale
	if cached && cached.timestamp > (new Date().getTime() - CACHE_TIMEOUT) 
		res.send 200, cached
	else
		feedCache[feedData.id] = 
			timestamp: new Date().getTime()
			data: 
			 	items: []

		buffer = feedCache[feedData.id]

		request(feedData.url)
			.pipe new FeedParser()
			.on 'error', (error) ->
				console.error 'Parsing error: ', error
				res.send 500
				sent = true
			.on 'meta', (meta) ->
				buffer.title = meta.title
				buffer.description = meta.description
			.on 'readable', () ->
				stream = this
				while item = stream.read()
					buffer.data.items.push
						title: item.title || item.description,
						summary: item.summary || item.description,
						href: item.link,
						index: buffer.data.items.length
			.on 'end', () ->
				if !sent
					res.send 200, buffer