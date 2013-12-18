cms-live-prototype
==================

CMS Live Editing Prototype

##Authored Date

December 2013

(last edit: December 2013)

##Overview

Created as a personal application.  The application is a prototype for a live-editable CMS on the web.

##Setup

Install Express dependencies [Node via nodejs.org] - refer to http://expressjs.com/guide.html.

Install Grunt depdencies [npm install -g grunt-cli] - refer to http://gruntjs.com/getting-started.

Install Bower dependencies [npm install -g bower, Git via http://git-scm.com] - refer to http://bower.io/.

##Build

Clone repo to local.

Use npm v0.10.* e.g. "nvm use v0.10.17" (may require installation of nvm via https://npmjs.org/package/nvm)

Run "npm install" from repo directory to install project dependencies from package.json.

Run "grunt build" from repo directory to install project dependencies from bower.json.

##Run

Run "grunt run" from repo directory and follow console instructions to open default localhost:3000 port to view site.

Run "grunt watch" from repo directory to file watch and follow console instructions to open default localhost:3000 port to view site. (Recommended for development)

Run "grunt dist" from repo directory to jshint, compile js and css into disbrution-ready, minified code, and file watch by following console instructions to open default localhost:3000 port to view site. (Recommended for production disbrution)
