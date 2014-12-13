var Backbone = require('backbone');
var _ = require('underscore');
var moment = require("moment");
var tinycolor = require('tinycolor2');

module.exports = Backbone.Model.extend({
	parse: function (data, options) {
		data.start = moment(data.start);
		data.end = data.end ? moment(data.end) : moment();
		_.map(data.images, function(image){
			image.src = options.imagePath + image.src;
			return image;
		});
		data.textColor = data.textColor || tinycolor.mostReadable(data.colour, ['#262626', '#cbcbcb', '#000', '#fff'])
		return data;
	}
});