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
    var qsConverterInstance,
      testAdapter;

    beforeEach(function () {
      testAdapter = new Map();
      qsConverterInstance = new QueryStringConverter({
        adapter : testAdapter
      });
    });

    it('should exist', function () {
      expect(qsConverterInstance.convertQuery).to.exist;
    });

    it('should be a function', function () {
      expect(qsConverterInstance.convertQuery).to.be.a('function');
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
        qsConverterInstance.convertQuery(testQuery);
        expect(adapterElementMock.convertQueryValue).to.have.been.calledWith('42');
      });

      it('should combine key and result of #convertQueryValue to result-object', function () {
        let expectedResult = {'limit' : 42};
        let result = qsConverterInstance.convertQuery(testQuery);
        expect(result).to.deep.equal(expectedResult);
      });
    });

    describe('validation', function () {
      let adapterElementMock;
      beforeEach(function () {
        adapterElementMock = {
          key               : 'test',
          convertQueryValue : sinon.stub().returns(42),
          validInputs          : /^a$/
        };
        testAdapter.set('testKey', adapterElementMock);
      });

      it('should throw "InvalidQueryValue" if value doesnt match regex', function () {
        var funcWrapper = function () {
          qsConverterInstance.convertQuery('testKey=b')
        };
        expect(funcWrapper).to.throw(errors.InvalidQueryValue, 'Validation failed for Query-Value "b"!');
      });

      it('should throw "InvalidQueryParameter" on invalid query Parameter', function () {
        let invalidQuery = 'invalidKey=invalidValue';
        let expectedError = errors.InvalidQueryParameter;
        expect(qsConverterInstance.convertQuery.bind(qsConverterInstance, invalidQuery)).to.throw(expectedError);
      });
    });

    describe('silentErrors=true', function () {
      let adapterElementMock;
      beforeEach(function () {
        adapterElementMock = {
          key               : 'test',
          convertQueryValue : sinon.stub().returns(42),
          validInputs          : /^a$/
        };
        testAdapter.set('testKey', adapterElementMock);
        qsConverterInstance = new QueryStringConverter({
          adapter      : testAdapter,
          silentErrors : true
        });

      });
      it('should not throw "InvalidQueryValue"', function () {
        let invalidQuery = 'testKey=invalidValue';
        var funcWrapper = function () {
          qsConverterInstance.convertQuery(invalidQuery)
        };
        expect(funcWrapper).not.to.throw();
      });

      it('should not throw "InvalidQueryParemeter"', function () {
        let invalidQuery = 'invalidKey=invalidValue';
        var funcWrapper = function () {
          qsConverterInstance.convertQuery(invalidQuery)
        };
        expect(funcWrapper).not.to.throw();
      });

      it('should still convert valid queries', function () {
        let adapterElementMock2 = {
          key               : 'valid',
          convertQueryValue : sinon.stub().returns(42),
          validInputs          : /^valid$/
        };
        testAdapter.set('valid', adapterElementMock2);
        let mixedQuery = 'invalidKey=invalidValue&valid=valid';
        let result = qsConverterInstance.convertQuery(mixedQuery);
        expect(result).to.deep.equal({valid: 42});
      });
    });
  });
});