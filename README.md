#  Angular News Feed

A node.js application with a responsive Angular.js front end showing a number of news feeds.

The news feed format is based on the exported iGoogle xml format (the project came about when iGoogle was killed off).

![Screen shot](https://github.com/mattchanner/angular-news-feed/blob/master/screenshot.png)

## Requirements

- [sax](https://github.com/isaacs/sax-js)
- [express](http://expressjs.com/)
- [feedparser](https://github.com/danmactough/node-feedparser)
- [request](https://github.com/mikeal/request)

# Usage

- Export your iGoogle settings and save in the root directory as igoogle.xml
- Run the server:
    node app.js
- Access the home page [here](http://localhost:3000)
