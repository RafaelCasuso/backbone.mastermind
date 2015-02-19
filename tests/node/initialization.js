var buster = require('buster');

buster.testCase("Backbone.Mastermind", {
  setUp: function() {
    this.Mastermind = require("../../src/mastermind");
  },
  "Mastermind exists": function(){
    buster.assert(this.Mastermind);
  }
});
