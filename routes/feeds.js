'use strict';
var fs = require('fs'),
	sax = require('sax'),
	strict = true,
	saxStream = sax.createStream(strict),
	feeds = [],
	currentEntry;

saxStream.onerror = function (e) {
	console.error("Error!", e);
};

saxStream.on("opentag", function (node) {
	if (node.name === "Module") {
		currentEntry = {};
		currentEntry.name = node.name;
		currentEntry.id = feeds.length;
		feeds.push(currentEntry);
	}
});

saxStream.on("attribute", function (attr) {
	if (currentEntry) {
		currentEntry[attr.name] = attr.value;
	}
});

fs.createReadStream("igoogle.xml").pipe(saxStream);

exports.find = function (index) {
	return feeds[index] || {};
}

exports.get = function (req, res) {
	res.send(JSON.stringify(feeds));
}
