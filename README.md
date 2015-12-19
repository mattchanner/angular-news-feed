#  Angular News Feed

A node.js application with an Angular.js front end to show a number of news feeds.

The news feed format is based on the exported iGoogle xml format (the project came about when iGoogle was killed off).

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
