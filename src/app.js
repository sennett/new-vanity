var Backbone = require('backbone');
var _ = require('underscore');
var moment = require("moment");
var $ = require("jquery");
Backbone.$ = $;

var timelineData = require('./data.js');

var YearModel = Backbone.Model.extend();

var YearView = Backbone.View.extend({
    template: _.template($("#timeline-dateline-year").html()),
    initialize: function(){
      _.bindAll(this, 'render');
      this.render();
    },
    render: function(){
      this.setElement(this.template(this.model.attributes));
    }
});

var ActivityModel = Backbone.Model.extend({
    parse: function(data, options){
      data.start = moment(data.start);
      data.end = data.end ? moment(data.end) : moment();
      return data;
    }
});

var ActivityView = Backbone.View.extend({
    tagName: "li",
    template: _.template($("#timeline-row").html()),
    
    initialize: function(options){
      this.timelineStart = options.timelineStart;
      _.bindAll(this, 'render');
      this.render();
    },
    
    render: function(){
      var viewData = Object.create(this.model.attributes);
      viewData.leftOffset = this.model.attributes.start.diff(this.timelineStart) / moment().diff(this.timelineStart) * 100 + '%';
      viewData.width = this.model.attributes.end.diff(this.model.attributes.start) / moment().diff(this.timelineStart) * 100 + '%';
      this.$el.html(this.template(viewData));
    }
});

var createActivity =  function(activityData){
    var timelineStart = moment(timelineData.start);
    var activityView = new ActivityView({
      model: new ActivityModel(activityData, { parse:true }),
      timelineStart: timelineStart
    });
    $("timeline ol").append(activityView.el);
};

var createDateline = function(){
    for (var i = 2004; i < 2015; i++){
      var yearView = new YearView({
        model: new YearModel({year: i})
      });
      $("timeline dateline").append(yearView.el);
}
};

// run
_.each(timelineData.activities, createActivity);
createDateline();