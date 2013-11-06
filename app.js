<<<<<<< HEAD
'use strict';

var express = require("express"),
    path = require("path"),
	home = require("./routes/home"),
	feeds = require("./routes/feeds"),
	feed = require("./routes/feed")
=======
var express = require("express"),
	path = require("path"),
	home = require("./routes/home"),
	feeds = require("./routes/feeds"),
	feed = require("./routes/feed");
>>>>>>> 090e7e93afe39823dd37c5f9ccfa17734da21eba

var app = express();

app.configure(function () {
    app.use(express.favicon());
    app.use(express.static(path.join(__dirname, "/public")));
});

// development is the default. Can be set by an environment variable i.e. set NODE_ENV=production
app.configure("development", function () {
    app.use(express.logger('dev'));
});

app.configure("production", function () {
    app.use(express.logger('prod'));
});

app.get('/', home.index);
app.get('/feeds', feeds.get);
app.get('/feeds/:id', feed.get);
app.get('/feeds/:feedId/:storyId', feed.summary);

<<<<<<< HEAD
var port = process.env.PORT || 3000;
console.log("Starting server on port " + port);
app.listen(port);
=======
console.log("Starting server on port " + (process.env.PORT || 3000));
app.listen(process.env.PORT || 3000);
>>>>>>> 090e7e93afe39823dd37c5f9ccfa17734da21eba
