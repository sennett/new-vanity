var Backbone = require('backbone');
var _ = require('underscore');
var moment = require("moment");
var $ = require("jquery");

module.exports = Backbone.View.extend({
    template: _.template($("#timeline-dateline-year").html()),
    initialize: function(){
      _.bindAll(this, 'render');
      this.render();
    },
    render: function(){
      this.setElement(this.template(this.model.attributes));
    }
});