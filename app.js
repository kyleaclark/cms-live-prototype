
/**
 * Module dependencies.
 */

var express = require('express');
var fs = require('fs');
var hbs = require('handlebars');
var engines = require('consolidate');
var controllers = require('./controllers');
var partials = "./views/partials/";
var http = require('http');
var path = require('path');

var app = express();

var env = app.get('env');

// Configuration
app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'html');
  app.engine('.html', engines.handlebars);
  app.use(app.router);
});

// Register partials
fs.readdirSync(partials).forEach(function (file) {
  var 
    source = fs.readFileSync(partials + file, "utf8"),
    partial = /(.+)\.html/.exec(file).pop();

  hbs.registerPartial(partial, source);
});

// Register helpers
hbs.registerHelper('ifDist', function (options) {
  if (env == 'distribution') {
    return options.fn(this);
  }
  return options.inverse(this);
});

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'files')));

// development only
if (env == 'development') {
  app.use(express.errorHandler());
}

// Output files
app.get('/', controllers.index);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
