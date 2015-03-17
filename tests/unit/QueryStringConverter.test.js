'use strict';
/**
 * Created by dave on 02.01.15.
 */


const chai = require("chai"),
	sinon = require("sinon"),
	sinonChai = require("sinon-chai"),
	expect = chai.expect,
	_ = require('lodash');

chai.use(sinonChai);

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
			qsConverterInstance,
			testAdapter;

		beforeEach(function () {
			testAdapter = new Map();
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

		describe('adapter values', function () {
			let testQuery;
			let adapterElementMock;

			beforeEach(function () {
				testQuery = 'limitTo=42';
				adapterElementMock = {
					key               : 'limit',
					convertQueryValue : sinon.stub().returns(42)
				};
				testAdapter.set('limitTo', adapterElementMock);
			});

			it('should call the #convertQueryValue-Method of a matching adapter-element with query value as argument', function () {
				convertQuery(testQuery);
				expect(adapterElementMock.convertQueryValue).to.have.been.calledWith('42');
			});

			it('should combine key and result of #convertQueryValue to result-object', function () {
				let expectedResult = {'limit' : 42};
				var result = convertQuery(testQuery);
				expect(result).to.deep.equal(expectedResult);
			});
		});

        describe('validation', function () {
            let adapterElementMock;
            beforeEach(function () {
                adapterElementMock = {
                    key : 'test',
                    convertQueryValue: sinon.stub().returns(42),
                    validate: /^a$/
                };
                testAdapter.set('testKey', adapterElementMock);
            });

            it('should throw "InvalidQueryValue" if value doesnt match regex', function () {
                var funcWrapper = function(){convertQuery('testKey=b')};
                expect(funcWrapper).to.throw(errors.InvalidQueryValue, 'Validation failed for Query-Value "b"!');
            });

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
