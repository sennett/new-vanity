var Backbone = require('backbone');
var _ = require('underscore');
var moment = require("moment");

var template = require("./template.html");
require('./styles.css');

module.exports = Backbone.View.extend({
	tagName: "li",

	attributes: {
		class: 'activityRow'
	},
	events: {
		'mouseover': 'highlightActivity',
		'mouseout': 'deHighlightActivity'
	},
	initialize: function (options) {
		this.timelineStart = options.timelineStart;
		_.bindAll(this, 'render', 'highlightActivity', 'deHighlightActivity', 'postRender');
		this.render();
	},

	render: function () {
		var viewData = Object.create(this.model.attributes);
		viewData.leftOffset = this.model.attributes.start.diff(this.timelineStart) / moment().diff(this.timelineStart) * 100 + '%';
		viewData.width = this.model.attributes.end.diff(this.model.attributes.start) / moment().diff(this.timelineStart) * 100 + '%';
		viewData._ = _;
		this.$el.html(template(viewData));
		_.defer(this.postRender); // no calculated styles on FF unless deferred
	},

	postRender: function(){
		this.activity = this.$el.find('activity');
		this.blurredBackgroundColour = this.activity.css('background-color');
		console.log(this.blurredBackgroundColour);
		this.blurredColour = this.activity.css('color');
		this.line = this.activity.siblings('.line');
		this.blurredLineColour = this.line.css('border-color');
	},

	highlightActivity: function(){
		this.$el.addClass('hover');
		this.activity.css({
			backgroundColor: this.model.attributes.colour,
			color: this.model.attributes.highlightsColor
		});
		this.line.css({borderColor: this.model.attributes.colour});
	},

	deHighlightActivity: function(){
		this.$el.removeClass('hover');
		this.activity.css({
			backgroundColor: this.blurredBackgroundColour,
			color: this.blurredColour
		});
		this.line.css({borderColor: this.blurredLineColour});
	}
});