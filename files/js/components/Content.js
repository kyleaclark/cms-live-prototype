define([
  "jquery",
  "js/utils/CallsUtil"
], function ($, CallsUtil) {
  "use strict";

  function Content() {
    this.bindEvents();
  }

  /* Accessors and Mutators */

  Content.prototype = {
    getContentUpdate: function () {
      return this.contentUpdate;
    },
    setContentUpdate: function (value) {
      this.contentUpdate = value;
    }
  };

  Content.prototype.bindEvents = function () {
    var self = this;

    $("[data-content=create]").on("click", function (ev) {
      ev.preventDefault();
      self.create();
    });

    $("[data-name]").on("keydown", function (event) {
      self.edit(event);
    });
  };

  Content.prototype.fetchContents = function () {
    var 
      self = this,
      fetchCall = new $.Deferred(),
      postUrl = "/api/getContents";

    fetchCall = CallsUtil.fetchGet(postUrl);

    CallsUtil.fetchDeferred(fetchCall, successCallback);

    function successCallback(data, status, xhr) {
      console.log(data);
      self.contentsData = data;
    };
  };

  Content.prototype.create = function () {
    var 
      self = this,
      fetchCall = new $.Deferred(),
      postUrl = "/api/create",
      postData = {
        title: "New Content - Click to Edit and press Enter to save"
      };

    fetchCall = CallsUtil.fetchPost(postUrl, postData);

    CallsUtil.fetchDeferred(fetchCall, successCallback);

    function successCallback() {
      self.fetchContents();
      location.reload();
    };
  };

  Content.prototype.edit = function (event) {
    var 
      esc = event.which == 27,
      nl = event.which == 13,
      el = event.target,
      input = el.nodeName != 'INPUT' && el.nodeName != 'TEXTAREA';

    if (input) {
      if (esc) {
        document.execCommand('undo');
        el.blur();
      } else if (nl) {

        this.setContentUpdate(el.innerHTML);

        this.update(el);

        el.blur();
        event.preventDefault();
      }
    }
  }

  Content.prototype.update = function (el) {
    var 
      postUrl = "/api/update/" + $(el).attr("data-name"),
      postData = this.getContentUpdate();

    console.log(postUrl);
    console.log(postData);

    CallsUtil.fetchPost(postUrl, postData);
  };

  return Content;
});