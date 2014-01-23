/**
* Routes Setup
*/

var 
  mongoose = require("mongoose"),
  Content = mongoose.model("Content");

/**
* Get Index
*/

exports.index = function (req, res) {
  var 
    userId = req.cookies ? req.cookies.userId : undefined,
    userIdObj = {userId : userId},
    contentSortStr = "-updateStamp";

  Content
    .find(userIdObj)
    .sort(contentSortStr)
    .exec(function (err, contents) {
      if (err) {
        return next(err);
      }

      res.render("index", {
        contents : contents
      });
    });
};