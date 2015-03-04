'use strict';
/**
 * Created by David on 24.02.15.
 */
const util = require('util');

var InvalidQueryParameter = function (message) {
	Error.call(this);
	this.name = 'InvalidQueryParameter';
	this.message = message;
	this.statusCode = 400;
};
util.inherits(InvalidQueryParameter, Error);

var InvalidQueryValue = function (message) {
	Error.call(this);
	this.name = 'InvalidArgument';
	this.message = message;
};
util.inherits(InvalidQueryValue, Error);

exports.InvalidQueryParameter = InvalidQueryParameter;
exports.InvalidQueryValue = InvalidQueryValue;