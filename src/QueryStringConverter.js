'use strict';
/**
 * Created by dave on 02.01.15.
 */

const _ = require('lodash'),
	util = require('util'),
	queryString = require('querystring'),
	qsErrors = require('./errors');

var sequelizeAdapter = require('./sequelizeAdapter');

var QueryStringConverter = function () {
	var adapter = sequelizeAdapter;

	this.convertQuery = function (query) {
		var parsedQuery = queryString.parse(query);
		var result = {};

		_.each(parsedQuery, function (value, key) {
			let adapterElement = adapter[key];
			if (!adapterElement) {
				throw new qsErrors.InvalidQueryParameter('Invalid query parameter with key "' + key + '"!');
			}

			if (!value.match(adapterElement.validInputs)) {
				throw new qsErrors.InvalidQueryValue('Invalid value "' + value + '" for key "' + key + '"');
			}

			result[adapterElement.key] = adapterElement.getValue(value);
		});

		return result;
	};
};

module.exports = QueryStringConverter;
