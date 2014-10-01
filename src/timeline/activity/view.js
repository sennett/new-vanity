var Backbone = require('backbone');
var _ = require('underscore');
var moment = require("moment");

var template = require("./template.html");

module.exports = Backbone.View.extend({
    tagName: "li",
    
    initialize: function(options){
      this.timelineStart = options.timelineStart;
      _.bindAll(this, 'render');
      this.render();
    },
    
    render: function(){
      var viewData = Object.create(this.model.attributes);
      viewData.leftOffset = this.model.attributes.start.diff(this.timelineStart) / moment().diff(this.timelineStart) * 100 + '%';
      viewData.width = this.model.attributes.end.diff(this.model.attributes.start) / moment().diff(this.timelineStart) * 100 + '%';
      this.$el.html(template(viewData));
    }
});