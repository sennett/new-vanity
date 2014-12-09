var Backbone = require('backbone');
var moment = require("moment");

module.exports = Backbone.Model.extend({
	parse: function (data, options) {
		data.start = moment(data.start);
		data.end = data.end ? moment(data.end) : moment();
		return data;
	}
});