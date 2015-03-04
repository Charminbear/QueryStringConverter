'use strict';
/**
 * Created by David on 02.03.15.
 */

const _ = require('lodash');

const numberRegex = /^[0-9]*$/,
	SORT_ASCENDING = 'ASC',
	SORT_DESCENDING = 'DESC';

module.exports = {
	limitTo : {
		key         : 'limit',
		getValue    : function (value) {
			return parseInt(value);
		},
		validInputs : numberRegex
	},
	offset  : {
		key         : 'offset',
		getValue    : function (value) {
			return parseInt(value);
		},
		validInputs : numberRegex
	},
	orderBy : {
		key         : 'order',
		getValue    : function (value) {
			let allFields = value.split(',');
			return _.map(allFields, function (currentField) {
				let sortOrder = SORT_ASCENDING;
				let sortOrderSign = currentField.substring(0, 1);

				if (sortOrderSign.match(/\+|-/)) {
					sortOrder = sortOrderSign === '+' ? SORT_ASCENDING : SORT_DESCENDING;
					currentField = currentField.substring(1);
				}

				return [currentField, sortOrder];
			});
		},
		validInputs : /.*/
	}
};