buster.testCase("Backbone.Mastermind", {
  setUp: function(){
    this.Model1 = Mastermind.Model.extend({
      indexName: 'Model1'
    });
    this.model = new this.Model1();
  },
  "Model exists": function(){
    assert(typeof this.model === 'object');
  },
  "Model is included in Index": function(){
    assert(this.model instanceof Mastermind.Models.Model1);
  }
});