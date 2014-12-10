var Backbone = require('backbone');
var _ = require('underscore');
var moment = require("moment");
var $ = require("jquery");

var timelineData = require('./data.js');
require("./styles.css");

var ActivityModel = require('./activity/model.js');
var ActivityView = require('./activity/view.js');

var YearModel = require('./year/model.js');
var YearView = require("./year/view.js");

var createActivity = function (activityData) {
	var timelineStart = moment(timelineData.start);
	var activityView = new ActivityView({
		model: new ActivityModel(activityData, {
			parse: true,
			imagePath: 'images/'
		}),
		timelineStart: timelineStart
	});
	$("timeline ol").append(activityView.el);
};

var createDateline = function () {
	for (var i = 2004; i < 2015; i++) {
		var yearView = new YearView({
			model: new YearModel({year: i})
		});
		$("timeline dateline").append(yearView.el);
	}
};

module.exports = function () {
	_.each(timelineData.activities, createActivity);
	createDateline();
};