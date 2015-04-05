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

var instances = new Map();
/**
 * @type {{createInstance: Function}}
 * @class QueryStringConverterFactory
 */
var QueryStringConverterFactory = {
	/**
	 * Creates a QueryStringConverter and stores it with the given name. If no custom options given, it will be created
	 * with the defaults.
	 * @param name
	 * @param customOptions
	 * @returns {QueryStringConverter}
	 */
	createInstance : function (name, customOptions) {
		let options = _.defaults({}, customOptions, defaultOptions);
        options.adapter = resolveAdapter(options.adapter);

		var createdInstance = new QueryStringConverter(options);
		instances.set(name, createdInstance);
		return createdInstance;
	},
	/**
	 * Get a previously created instance by its name
	 * @param name
	 * @returns {QueryStringConverter}
	 */
	getInstance : function (name) {
		var instance = instances.get(name);
		if(!instance){
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

module.exports = _.extend(QueryStringConverterFactory, allErrors);
