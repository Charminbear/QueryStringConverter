'use strict';
/**
 * Created by dave on 02.01.15.
 */


const expect = require('chai').expect;

const QueryStringConverter = require('../../src/QueryStringConverter'),
	errors = require('../../src/errors');

describe('QueryStringConverter', function () {
	describe('#instance', function () {
		it('should throw error if no options object given', function () {
			var instanceWrapper = function () {
				new QueryStringConverter();
			};
			expect(instanceWrapper).to.throw('Missing Options Object');
		});

		it('should throw if no adapter in options', function () {
			var instanceWrapper = function () {
				new QueryStringConverter({});
			};
			var errorMessage = 'No Adapter defined. Define it within the Options-Object.';
			expect(instanceWrapper).to.throw(errors.MissingAdapter, errorMessage);
		});
	});


	describe('#convertQuery()', function () {
		var convertQuery,
			qsConverterInstance;

		var testAdapter = new Map();
		testAdapter.set('limitTo',
			{
				key          : 'limit',
				convertValue : function (value) {
					return parseInt(value);
				},
				validInputs  : /^[0-9]*$/
			});

		beforeEach(function () {
			qsConverterInstance = new QueryStringConverter({
				adapter : testAdapter
			});
			convertQuery = qsConverterInstance.convertQuery;
		});

		it('should exist', function () {
			expect(convertQuery).to.exist;
		});

		it('should be a function', function () {
			expect(convertQuery).to.be.a('function');
		});

		describe('special cases', function () {
			it('should throw "InvalidQueryParameter" on invalid query Parameter', function () {
				var invalidQuery = 'invalidKey=invalidValue';
				var expectedError = errors.InvalidQueryParameter;
				expect(convertQuery.bind(qsConverterInstance, invalidQuery)).to.throw(expectedError);
			});
		});
	});

//	fields  : 'attributes', // --> Comma separated like fields=name,id,createdAt
//	where   : 'where', // --> Comma separated field:values pairs like field1:value1,field2:value2 (flat) - maybe
// allow keywords? include : 'include' // --> model1(fieldName1,fieldName2),model2

});
