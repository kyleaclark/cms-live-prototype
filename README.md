cms-live-prototype
==================

CMS Live Editing Prototype

##Authored Date

December 2013

(last edit: January 2014)

##Overview

Created as a personal application.  The application is a prototype for a live-editable CMS on the web.

##Technologies

JavaScript

NodeJS

ExpressJS

MongoDB

Mongoose

Grunt

Bower

RequireJS

jQuery

Handlebars

HTML5

CSS

##Setup

Install Express dependencies [Node via nodejs.org] - refer to http://expressjs.com/guide.html.

Install MongoDB dependencies [compatible version to v2.4.8 utilized in development of cms-live-prototype] - http://docs.mongodb.org/manual/installation/

Install Grunt depdencies [npm install -g grunt-cli] - refer to http://gruntjs.com/getting-started.

Install Bower dependencies [npm install -g bower, Git via http://git-scm.com] - refer to http://bower.io/.

##Build

Clone repo to local.

Use npm v0.10.* e.g. "nvm use v0.10.17" (may require installation of nvm via https://npmjs.org/package/nvm)

Run "npm install" from repo directory to install project dependencies from package.json.

Run "grunt build" from repo directory to install project dependencies from bower.json.

##Run

Run "mongod" in a separate instance in order to execute cms-live-prototype program - [refer to http://docs.mongodb.org/manual/tutorial/manage-mongodb-processes/]

Run "grunt serve" from repo directory to file watch and follow console instructions to open default localhost:3000 port to view site. (Recommended for development)

Run "grunt dist" from repo directory to jshint, compile js and css into disbrution-ready, minified code, and file watch by following console instructions to open default localhost:3000 port to view site. (Recommended for production disbrution)
