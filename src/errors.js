'use strict';
/**
 * Created by David on 24.02.15.
 */
const util = require('util');

var InvalidQueryParameter = function (message) {
	this.name = 'InvalidQueryParameter';
	this.message = message;
	this.statusCode = 400;
};
util.inherits(InvalidQueryParameter, Error);

var InvalidQueryValue = function (message) {
	this.name = 'InvalidQueryValue';
	this.message = message;
};
util.inherits(InvalidQueryValue, Error);

var MissingAdapter = function (message) {
	this.name = 'MissingAdapter';
	this.message = message;
};
util.inherits(MissingAdapter, Error);

var InvalidInstanceName = function (message) {
	this.name = 'InvalidInstanceName';
	this.message = message;
};
util.inherits(InvalidInstanceName, Error);



exports.InvalidQueryParameter = InvalidQueryParameter;
exports.InvalidQueryValue = InvalidQueryValue;
exports.MissingAdapter = MissingAdapter;
exports.InvalidInstanceName = InvalidInstanceName;