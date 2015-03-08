'use strict';
/**
 * Created by dave on 02.01.15.
 */
const _ = require('lodash');

var QueryStringConverter = require('./QueryStringConverter'),
	allErrors = require('./errors'),
	defaultOptions = {
		silentErrors : false,
		adapter      : 'sequelize'
	};

var QueryStringConverterFactory = {
	createInstance : function (customOptions) {
		var options = _.defaults({}, customOptions, defaultOptions);
		return new QueryStringConverter(options);
	}
};

module.exports = _.extend(QueryStringConverterFactory, allErrors);
