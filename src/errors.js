'use strict';

const util = require('util');

/**
 * @name InvalidQueryParameter
 * @type error
 * @param message
 * @constructor
 *
 * Thrown if a key within the QueryString doesnt exist as Key within the specified Adapter.
 * Not Thrown if Option silentErrors = true.
 */
var InvalidQueryParameter = function (message) {
	this.name = 'InvalidQueryParameter';
	this.message = message;
	this.statusCode = 400;
};
util.inherits(InvalidQueryParameter, Error);

/**
 * @name InvalidQueryValue
 * @type error
 * @param message
 * @constructor
 *
 * Thrown if a Value of a Query-Parameter doesnt match the "validInputs"-Validation of the Adapter-Element matched
 * by the QueryKey. Not Thrown if Option silentErrors = true.
 */
var InvalidQueryValue = function (message) {
	this.name = 'InvalidQueryValue';
	this.message = message;
};
util.inherits(InvalidQueryValue, Error);

/**
 * @name MissingAdapter
 * @type error
 * @param message
 * @constructor
 *
 * Thrown on instantiation if the specified Adapter doesn't exist or can not be found.
 */
var MissingAdapter = function (message) {
	this.name = 'MissingAdapter';
	this.message = message;
};
util.inherits(MissingAdapter, Error);

/**
 * @name InvalidInstanceName
 * @type error
 * @param message
 * @constructor
 *
 * Thrown by "QueryStringConvert.getInstance(name)" if there was no Instance with the specified name created.
 */
var InvalidInstanceName = function (message) {
	this.name = 'InvalidInstanceName';
	this.message = message;
};
util.inherits(InvalidInstanceName, Error);

exports.InvalidQueryParameter = InvalidQueryParameter;
exports.InvalidQueryValue = InvalidQueryValue;
exports.MissingAdapter = MissingAdapter;
exports.InvalidInstanceName = InvalidInstanceName;