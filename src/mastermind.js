/* Mastermind */

(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'underscore', 'backbone.radio'], function (Backbone, _) {
      return (root.Mastermind = root.Mm = factory(root, Backbone, _));
    });
  } else if (typeof exports !== 'undefined') {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var Radio = require('backbone.radio');
    module.exports = factory(root, Backbone, _);
  } else {
    root.Mastermind = root.Mm = factory(root, root.Backbone, root._);
  }

}(this, function (root, Backbone, _) {
  'use strict';

  var previousMastermind = root.Mastermind;
  var previousMm = root.Mm;

  var Mastermind = Backbone.Mastermind = {};

  Mastermind.VERSION = '0.0.1';

  Mastermind.noConflict = function () {
    root.Mastermind = previousMastermind;
    root.Mm = previousMm;
    return this;
  };

  //Declare index of models
  Mastermind.Models = {};
  Mastermind.Views = {};

  //Wrap extend to add new extended objects to indexes
  var extend = function (properties, classProperties) {
    var props = properties || {}, indexKey;
    if (props.indexName) {
      if (this.prototype instanceof Backbone.Model) {
        indexKey = 'Models';
      } else if (this.prototype instanceof Backbone.View) {
        indexKey = 'Views';
      } else if (this.prototype instanceof Backbone.Collection) {
        indexKey = 'Collections';
      }

      if (indexKey) {
        Mastermind[indexKey][props.indexName] = this;
      }
    }
    return Backbone.Model.extend.apply(this, arguments);
  };

  Mastermind.Model = Backbone.Model.extend({
      constructor: function (options) {
        Backbone.Model.apply(this, arguments);
      }
    });

  Mastermind.View = Backbone.View.extend({
      constructor: function (options) {
        Backbone.View.apply(this, arguments);
      }
    });

  Mastermind.Model.extend = Mastermind.View.extend = extend;

  return Mastermind;

}))
;