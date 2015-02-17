buster.testCase("Backbone.Mastermind", {
  setUp: function(){
    this.localMastermind = Mastermind.noConflict();
  },
  "No conflict works": function(){
    assert(this.localMastermind);
  },
  tearDown: function(){
    window.Mastermind = this.localMastermind;
    window.Mm = this.localMastermind;
  }
});