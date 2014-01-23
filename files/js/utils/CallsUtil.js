define([
  "jquery"
], function ($) {
  "use strict";

  var CallsUtil = {};

  CallsUtil.fetchGet = function (url, dataType, data) {
    this.dataType = dataType || "json";
    this.data = data || null;

    return $
      .ajax({
        url: url,
        type: "GET",
        dataType: this.dataType,
        data: this.data   
      });
  };

  CallsUtil.fetchPost = function (url, data, cache, contentType) {
    this.cache = cache || true;
    this.contentType = contentType || "application/x-www-form-urlencoded; charset=UTF-8";

    return $
      .ajax({
        url: url,
        type: "POST",
        cache: this.cache,
        contentType: this.contentType,
        data: data   
      });
  };

  CallsUtil.fetchDeferred = function (fetchCall, thenCallback, failCallback) {
    var self = this;

    this.failCallback = failCallback || function () {};

    $
      .when(fetchCall)
      .then(function (data, textStatus, xhr) {
        thenCallback(data, textStatus, xhr);
      })
      .fail(function (xhr, textStatus, error) {
        self.failCallback(xhr, textStatus, error);
      });
  };

  return CallsUtil;
});