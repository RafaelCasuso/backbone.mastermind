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
  Mastermind.Screens = {};
  Mastermind.Sections = {};
  Mastermind.Components = {};
  Mastermind.Views = {};
  Mastermind.Apps = {};

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

  var triggerMethod = function (event) {
    var args = [].slice.call(arguments, 1),
      methodName = event.split(":").reduce(function (acc, el) {
        return acc + el[0].toUpperCase() + el.slice(1);
      }, "on");
    this.trigger.apply(this, [event].concat(args));
    if (typeof(this[methodName]) === "function") {
      this[methodName].apply(this, args);
    }
  };

  Mastermind.Class = function () {
    if (this.initialize) {
      this.initialize.apply(this, arguments);
    }
  };

  _.extend(Class.prototype, Backbone.Events);

  Mastermind.Class.extend = extend;

  var Model = Mastermind.Model = Backbone.Model.extend({
    constructor: function (options) {
      Backbone.Model.apply(this, arguments);
    }
  });

  var View = Mastermind.View = Backbone.View.extend({
    constructor: function (options) {
      Backbone.View.apply(this, arguments);
    }
  });

  var Region = Mastermind.Region = Mastermind.Class.extend({
    constructor: function (options) {
      options = options || {};
      this.$el = options.$el;
      Region.__super__.constructor.apply(this, arguments);
    },
    setElement: function ($el) {
      this.$el = $el;
      if (this.currentView) {
        this.currentView.$el.detach();
        this.$el.empty().append(this.currentView.$el);
      } else if (this._pendingView) {
        this.show(this._pendingView);
        this._pendingView = undefined;
      }
    },
    delegateEvents: function () {
      if (this.currentView) {
        this.currentView.delegateEvents();
      }
    },
    show: function (view) {
      if (!this.$el || this.$el.length === 0) {
        this._pendingView = view;
        return;
      }
      if (this.currentView) {
        this.currentView.triggerMethod("remove");
        this.close();
      }
      this.open(view.render());
      view.delegateEvents();
      this.currentView = view;
      this.currentView.triggerMethod("show");
    },
    close: function () {
      if (this.currentView) {
        this.currentView.remove();
      }
    },
    open: function (view) {
      this.$el.empty().append(view.el);
    }
  });

  var Layout = Mastermind.Layout = Mastermind.View.extend({
    constructor: function (options) {
      options = options || {};
      var regions = options.regions || this.regions || {};
      this.regions = {};
      this._regions = [];
      _.each(regions, this.addRegion, this);
      Layout.__super__.constructor.apply(this, arguments);
    },
    regionType: Region,
    addRegions: function (regions) {
      _.each(regions, this.addRegion, this);
    },
    addRegion: function (value, name) {
      var RegionType = value.regionType || this.regionType,
        selector = (typeof(value) === "string") ? value : value.selector,
        region = new RegionType({$el: this.el ? this.$(selector) : null});
      this._regions.push({region: region, selector: selector});
      this.regions[name] = region;
    },
    reattachRegions: function () {
      _.chain(this._regions)
        .map(function (regionData) {
          return {regionData: regionData, $el: this.$(regionData.selector)};
        }, this)
        .each(function (data) {
          data.regionData.region.setElement(data.$el);
        });

    },
    render: function () {
      Layout.__super__.render.apply(this, arguments);
      this.reattachRegions();
      this.trigger("render");
      return this;
    },
    setElement: function () {
      Layout.__super__.setElement.apply(this, arguments);
      this.reattachRegions();
    },
    delegateEvents: function () {
      Layout.__super__.delegateEvents.apply(this, arguments);
      _.each(this._regions, function (regionData) {
        regionData.region.delegateEvents();
      });
    }

  });

  var Activity = Mastermind.Activity = Mastermind.Layout.extend({
    constructor: function (options) {
      Mastermind.Layout.apply(this, arguments);
    }
  });

  var Component = Mastermind.Component = Mastermind.Layout.extend({
    constructor: function (options) {
      Mastermind.Layout.apply(this, arguments);
    }
  });


  var App = Mastermind.Application = Mastermind.Class.extend({
    //App constructor
    constructor: function (options) {
      options = options || {};
      var name = options.name || "App" + (_.size(Mastermind.Apps) + 1);
      Mastermind.Apps[name] = this;
      App.__super__.constructor.apply(this, arguments);
    }
  });

  _.extend(App.prototype, Backbone.Events, {
    //App methods
    _initCommunications: function () {
      this.channels = {};
      this.channels.appData = Backbone.Radio.channel("appData");
    },
    replyGeneralData: function () {
      return this.data;
    }
  });

  Mastermind.Region.extend = Mastermind.Model.extend = Mastermind.View.extend = Mastermind.Layout.extend = extend;

  Mastermind.Class.triggerMethod = Mastermind.Region.triggerMethod = Mastermind.Model.triggerMethod = Mastermind.View.triggerMethod = Mastermind.Layout.triggerMethod = triggerMethod;

  return Mastermind;

}))
;