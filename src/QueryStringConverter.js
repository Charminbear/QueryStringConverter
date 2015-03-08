'use strict';
/**
 * Created by dave on 02.01.15.
 */

const _ = require('lodash'),
	util = require('util'),
	queryString = require('querystring'),
	qsErrors = require('./errors');

var QueryStringConverter = function (options) {
	if(!options){
		throw new Error('Missing Options Object');
	} else if(!options.adapter){
		throw new qsErrors.MissingAdapter('No Adapter defined. Define it within the Options-Object.');
	}

	var adapter = options.adapter;

	this.convertQuery = function (query) {
		var parsedQuery = queryString.parse(query);
		var result = {};

		_.each(parsedQuery, function (value, key) {
			let adapterElement = adapter.get(key);
			if (!adapterElement) {
				throw new qsErrors.InvalidQueryParameter('Invalid query parameter with key "' + key + '"!');
			}

			result[adapterElement.key] = adapterElement.convertQueryValue(value);
		});

		return result;
	};
};

module.exports = QueryStringConverter;
