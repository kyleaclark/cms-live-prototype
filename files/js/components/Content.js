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
    getContentUpdateObj: function () {
      return this.contentUpdateObj;
    },
    setContentUpdateObj: function (value) {
      this.contentUpdateObj = {content: value};
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
      esc = event.which == 27, //esc
      tab = event.which == 9, //tab
      el = event.target,
      content = el.innerHTML,
      input = el.nodeName != 'INPUT' && el.nodeName != 'TEXTAREA';

    if (input) {
      if (esc) {
        document.execCommand('undo');
        el.blur();
      } else if (tab) {

        this.setContentUpdateObj(el.innerHTML);

        this.update(el);

        el.blur();
        event.preventDefault(); 
      }
    }
  }

  Content.prototype.update = function (el) {
    var 
      postUrl = "/api/update/" + $(el).attr("data-name"),
      postData = this.getContentUpdateObj();

    CallsUtil.fetchPost(postUrl, postData);
  };

  return Content;
});