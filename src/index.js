'use strict';
/**
 * Created by dave on 02.01.15.
 */
const _ = require('lodash');

var QueryStringConverter = require('./QueryStringConverter'),
	AllErrors = require('./errors');

var API = {
	createInstance        : function () {
		return new QueryStringConverter();
	}
};

module.exports = _.extend(API, AllErrors);
