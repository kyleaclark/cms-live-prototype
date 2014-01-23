var
  mongoose = require("mongoose"),
	Schema = mongoose.Schema,
  Content = new Schema({
    userId    	: String,
    content     : String,
    updateStamp : Date
  });

module.exports = mongoose.model("Content", Content);