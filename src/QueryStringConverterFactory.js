'use strict';
/**
 * Created by dave on 07.04.15.
 */
const _ = require('lodash'),
	util = require('util');

const QueryStringConverter = require('./QueryStringConverter'),
	allErrors = require('./errors');

var defaultOptions = require('./DefaultOptions');

var instances = new Map();
/**
 * @class QueryStringConverterFactory
 */
var QueryStringConverterFactory = {
	/**
	 * @name createInstance
	 * @param {string} name
	 * @param {DefaultOptions} customOptions
	 * @returns {QueryStringConverter}
	 *
	 * Creates a QueryStringConverter and stores it with the given name. If no custom options given, it will be created
	 * with the defaults.
	 */
	createInstance : function (name, customOptions) {
		let options = _.defaults({}, customOptions, defaultOptions);
		options.adapter = resolveAdapter(options.adapter);

		var createdInstance = new QueryStringConverter(options);
		instances.set(name, createdInstance);
		return createdInstance;
	},
	/**
	 * @name getInstance
	 * @param {string} name
	 * @returns {QueryStringConverter}
	 *
	 * Get a previously created instance by its name
	 */
	getInstance    : function (name) {
		var instance = instances.get(name);
		if (!instance) {
			throw new allErrors.InvalidInstanceName('No Instance with name "' + name + '" found. Please make sure you created it with #createInstance().');
		}
		return instances.get(name);
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

module.exports = QueryStringConverterFactory;
