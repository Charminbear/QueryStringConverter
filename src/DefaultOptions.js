'use strict';

/**
 * @name DefaultOptions
 * @type {{silentErrors: boolean, adapter: string}}
 */
var DefaultOptions = {
	/**
	 * @name silentErrors
	 * @type {boolean}
	 * If set to true, no Errors are thrown unless they cause QueryStringConverter to not work anymore. You can use
	 * this if you have Query-Parameters that you don't want to be converted / that are not part of the used
	 * adapter and thus let QueryStringConverter only convert the known queries without any errors.
	 */
	silentErrors : false,

	/**
	 * @name adapter
	 * @type {string | map}
	 *
	 * Specifiy the Adapter for the QueryStringConverter-Instance. Can be either a String for an already existing adapter
	 * referenced by that key, or a Map with Key - AdapterElements.
	 */
	adapter : 'sequelize'
};

module.exports = DefaultOptions;



