/*global require: true*/

'use strict';

const express = require("express");
const path = require("path");
const serveStatic = require('serve-static');
const home = require("./routes/home");
const feeds = require("./routes/feeds");
const feed = require("./routes/feed");
const morgan = require('morgan')
const  app = express();

app.use(serveStatic('public'))

// development is the default. Can be set by an environment variable i.e. set NODE_ENV=production
app.use(morgan('combined'));

app.get('/', home.index);
app.get('/feeds', feeds.get);
app.get('/feeds/:id', feed.get);
app.get('/feeds/:feedId/:storyId', feed.summary);


var port = process.env.PORT || 3000;

console.log("Starting server on port " + port);

app.listen(port);
