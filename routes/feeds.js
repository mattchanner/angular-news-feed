<<<<<<< HEAD
'use strict';
=======
'use strict'
>>>>>>> 090e7e93afe39823dd37c5f9ccfa17734da21eba
var fs = require('fs'),
	sax = require('sax'),
	strict = true,
	saxStream = sax.createStream(strict),
	feeds = [],
	currentEntry = null;

<<<<<<< HEAD
saxStream.onerror = function (e) {
	console.error("Error!", e);	
};
=======
saxStream.onerror = function (e) { console.error("Error!", e); };
>>>>>>> 090e7e93afe39823dd37c5f9ccfa17734da21eba

saxStream.on("opentag", function (node) {
	if (node.name === "Module") {
		currentEntry = {};
		currentEntry.id = feeds.length;
		feeds.push(currentEntry);
	}
});

saxStream.on("attribute", function (attr) {
<<<<<<< HEAD
	if (currentEntry) {
		if (attr.name === 'xmlUrl') {
			currentEntry['url'] = attr.value;
		} else if (attr.name === 'title') {
			currentEntry['title'] = attr.value;
		}
=======
	if (currentEntry && attr.name === 'xmlUrl') {
		currentEntry['url'] = attr.value;
>>>>>>> 090e7e93afe39823dd37c5f9ccfa17734da21eba
	}
});

fs.createReadStream("igoogle.xml").pipe(saxStream);

exports.find = function (index) {
<<<<<<< HEAD
	return feeds[index] || {};
=======
	return feeds[index] || {} ;
>>>>>>> 090e7e93afe39823dd37c5f9ccfa17734da21eba
};

exports.get = function (req, res) {
	res.send(200, feeds);
};