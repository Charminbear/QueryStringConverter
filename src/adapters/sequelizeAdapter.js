'use strict';
/**
 * Created by David on 02.03.15.
 */

const _ = require('lodash');

const numberRegex = /^[0-9]*$/,
	WHITESPACE_REGEX = /\s/g,
	SORT_ASCENDING = 'ASC',
	SORT_DESCENDING = 'DESC';


var sequelizeAdapter = new Map();
sequelizeAdapter.set('limitTo', {
	key               : 'limit',
	convertQueryValue : function (value) {
		return parseInt(value);
	},
	validInputs       : numberRegex
});
sequelizeAdapter.set('offset', {
	key               : 'offset',
	convertQueryValue : function (value) {
		return parseInt(value);
	},
	validInputs       : numberRegex
});
sequelizeAdapter.set('orderBy', {
		key               : 'order',
		convertQueryValue : function (value) {
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
		validInputs       : /.*/
	}
);
sequelizeAdapter.set('columns', {
	key : 'attributes',
	convertQueryValue: function (value) {
		value = value.replace(WHITESPACE_REGEX, '');
		return value.split(',');
	}
});

module.exports = sequelizeAdapter;