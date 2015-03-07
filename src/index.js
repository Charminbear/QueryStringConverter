'use strict';
/**
 * Created by dave on 02.01.15.
 */
const _ = require('lodash');

var QueryStringConverter = require('./QueryStringConverter'),
	allErrors = require('./errors');

var QueryStringConverterFactory = {
	createInstance        : function () {
		return new QueryStringConverter();
	}
};

module.exports = _.extend(QueryStringConverterFactory, allErrors);
