/**
* API Setup
*/

var 
  utils    = require("../utils"),
  mongoose = require("mongoose"),
  Content  = mongoose.model("Content");

/**
* Get Contents of Content
*/

exports.getContents = function (req, res) {
  var 
    userId = req.cookies ? req.cookies.userId : undefined,
    userIdObj = {userId : userId},
    contentSortStr = "-updateStamp";

  Content
    .find(userIdObj)
    .sort(contentSortStr)
    .exec(function (err, contents) {
      if (err) return next(err);

      res.send({
        contents : contents
      });
    });
};

/**
* Create Content
*/

exports.create = function (req, res, next) {
  var 
    content,
    contentConfig;

  contentConfig = {
    userId : req.cookies.userId,
    content : req.body.title,
    updateStamp : Date.now()
  };

  content = new Content(contentConfig);

  console.log(content);

  content.save(function (err, content, count) {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
};

/**
* Edit Content
*/

exports.edit = function (req, res, next) {
  var 
    userId = req.cookies ? req.cookies.userId : undefined,
    userIdObj = {userId : userId},
    contentSortStr = "-updateStamp";

  Content.
    find(userIdObj).
    sort(contentSortStr).
    exec(function (err, contents) {
      if (err) {
        return next(err);
      }

      res.send({
        contents : contents,
      });
    });
};

/**
* Update Content
*/

exports.update = function (req, res, next) {
  Content.findById(req.params.id, function (err, content) {
    var userId = req.cookies ? req.cookies.userId : undefined;

    /*if (content.userId !== userId) {
      return utils.forbidden(res);
    }*/

    content.content = req.body.title;
    content.updateStamp = Date.now();

    content.save(function (err, content, count) {
      if (err) {
        return next(err);
      }

      res.redirect("/");
    });
  });
};

/**
* Destroy Content
*/

exports.destroy = function (req, res, next) {
  Content.findById( req.params.id, function (err, content) {
    var userId = req.cookies ?
      req.cookies.userId : undefined;

    /*if (content.userId !== req.cookies.userId) {
      return utils.forbidden( res );
    }*/

    content.remove(function (err, content) {
      if (err) {
        return next(err);
      }

      res.redirect("/");
    });
  });
};

/**
* Set Current User
*/

exports.setCurrentUser = function (req, res, next) {
  var userId = req.cookies ? req.cookies.userId : undefined;

  if (!userId) {
    res.cookie("userId", utils.uid(32));
  }

  next();
};