buster.testCase("Backbone.Mastermind", {
  setUp: function(){
    this.View1 = Mastermind.View.extend({
      indexName: 'View1'
    });
    this.view = new this.View1();
  },
  "View does exist": function(){
    assert(this.view);
  },
  "View is indexed": function(){
    assert(this.view instanceof Mastermind.Views.View1);
  }
});