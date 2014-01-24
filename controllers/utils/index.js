module.exports = {

  generateRandNum: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  uid: function (length) {
    var 
      str = "",
      src = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      srcLength = src.length,
      i = length;

    for (; i--;) {
      str += src.charAt(this.generateRandNum(0, srcLength - 1));
    }

    return str;
  },

  forbidden: function (res) {
    var body = "Forbidden";

    res.statusCode = 403;

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Content-Length", body.length);
    res.end(body);
  }
};