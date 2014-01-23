/**
====================
* App Dependencies *
====================
*/

/**
* Mongoose Setup
*/

require("./db");

/**
* Models Setup
*/

require("./models/Content");

/**
* App Setup
*/

var 
  express     = require("express"),
  api         = require("./controllers/api"),
  routes      = require("./controllers/routes"),
  http        = require("http"),
  path        = require("path"),
  fs          = require("fs"),
  engine      = require("consolidate"),
  app         = express(),
  hbs         = require("handlebars"),
  partials    = "./views/partials/",
  env         = app.get("env");

/**
* App Configuration
*/

app.configure(function () {
  app.set("port", process.env.PORT || 3000);
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "html");
  app.engine(".html", engine.handlebars);
  app.use(express.favicon());
  app.use(express.logger("dev"));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(api.setCurrentUser);
  app.use(app.router);
  app.use(express.static(path.join(__dirname, "files")));
});

/**
* Register Partials
*/

fs.readdirSync(partials).forEach(function (file) {
  var 
    source = fs.readFileSync(partials + file, "utf8"),
    partial = /(.+)\.html/.exec(file).pop();

  hbs.registerPartial(partial, source);
});

/**
* Register Handlebars Helpers
*/

hbs.registerHelper("ifDist", function (options) {
  if (env == "distribution") {
    return options.fn(this);
  }
  return options.inverse(this);
});

hbs.registerHelper("each", function (context, options) {
  var ret = "";

  for(var i=0, j=context.length; i<j; i++) {
    ret = ret + options.fn(context[i]);
  }

  return ret;
});

/**
* Environment Setup
*/

if (env == "development") {
  app.use(express.errorHandler());
}

/**
* Controllers - Routes
*/

app.get("/", routes.index);

/**
* Controllers - API
*/

app.get("/api/getContents", api.getContents);
app.post("/api/create", api.create);
app.get("/api/destroy/:id", api.destroy);
app.get("/api/edit/:id", api.edit);
app.post("/api/update/:id", api.update);

/**
* Create Server
*/

http.createServer(app).listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});