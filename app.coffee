express = require "express"
path = require "path"
home = require "./routes/home"
feeds = require "./routes/feeds"
feed = require "./routes/feed"

app = express()

console.log "Starting server"

app.configure () ->
    app.use express.favicon()
    app.use express.static(path.join(__dirname, "/public"))

# development is the default. Can be set by an environment variable i.e. set NODE_ENV=production
app.configure "development", () ->
    app.use(express.logger('dev'))

app.configure "production", () ->
    app.use(express.logger('prod'))

app.get '/', home.index
app.get '/feeds', feeds.get
app.get '/feeds/:id', feed.get

app.listen 3000