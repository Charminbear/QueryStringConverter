'use strict';

const _ = require('lodash');

var QueryStringConverterFactory = require('./QueryStringConverterFactory'),
	allErrors = require('./errors');

module.exports = _.extend(QueryStringConverterFactory, allErrors);
