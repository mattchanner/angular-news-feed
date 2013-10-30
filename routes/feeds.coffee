'use strict'
fs = require 'fs'
sax = require 'sax'
strict = true
saxStream = sax.createStream strict
feeds = []
currentEntry = null

saxStream.onerror = (e) -> console.error("Error!", e)

saxStream.on "opentag", (node) ->
	if node.name is "Module"
		currentEntry = {}
		currentEntry.id = feeds.length
		feeds.push currentEntry

saxStream.on "attribute", (attr) ->
	if currentEntry && attr.name is 'xmlUrl'
		currentEntry['url'] = attr.value

fs.createReadStream("igoogle.xml").pipe(saxStream)

exports.find = (index) -> feeds[index] || {}

exports.get = (req, res) -> res.send 200, feeds