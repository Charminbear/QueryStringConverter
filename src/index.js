'use strict';
/**
 * Created by dave on 02.01.15.
 */
const _ = require('lodash'),
	util = require('util');

var QueryStringConverter = require('./QueryStringConverter'),
	allErrors = require('./errors');

/**
 * @constant options
 * @type {{silentErrors: boolean, adapter: string}}
 */
var defaultOptions = {
		silentErrors : false,
		adapter      : 'sequelize'
	};

var QueryStringConverterFactory = {
	createInstance : function (customOptions) {
		let options = _.defaults({}, customOptions, defaultOptions);
        options.adapter = resolveAdapter(options.adapter);
		return new QueryStringConverter(options);
	}
};

function resolveAdapter(adapter) {
	if (!util.isString(adapter)) {
		return adapter;
	} else {
		try {
			return require('./' + adapter + 'Adapter');
		} catch (e) {
			throw new allErrors.MissingAdapter('Specified Adapter "' + adapter + '" could not be found. If it is a custom adapter, register it first with #registerAdapter().');
		}
	}
}

module.exports = _.extend(QueryStringConverterFactory, allErrors);
