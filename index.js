'use strict';

const _ = require('lodash');

var QueryStringConverterFactory = require('./src/QueryStringConverterFactory'),
	allErrors = require('./src/errors');

module.exports = _.extend(QueryStringConverterFactory, allErrors);
