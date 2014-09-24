var Backbone = require('backbone');
var _ = require('underscore');

var template = require("./template.html");

module.exports = Backbone.View.extend({
    initialize: function(){
      _.bindAll(this, 'render');
      this.render();
    },
    render: function(){
      this.setElement(template(this.model.attributes));
    }
});