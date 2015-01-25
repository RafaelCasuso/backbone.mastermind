/* Mastermind */

(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'underscore', 'backbone.wreqr', 'backbone.babysitter'], function(Backbone, _) {
      return (root.Marionette = root.Mn = factory(root, Backbone, _));
    });
  } else if (typeof exports !== 'undefined') {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var Wreqr = require('backbone.wreqr');
    module.exports = factory(root, Backbone, _);
  } else {
    root.Mastermind = root.Mm = factory(root, root.Backbone, root._);
  }

}(this, function(root, Backbone, _) {
  'use strict';

  var previousMastermind = root.Mastermind;
  var previousMm = root.Mm;

  var Mastermind = Backbone.Mastermind = {};

  Marionette.VERSION = '2.3.1';

  Marionette.noConflict = function () {
    root.Marionette = previousMarionette;
    root.Mn = previousMn;
    return this;
  };

  return Mastermind;

}));