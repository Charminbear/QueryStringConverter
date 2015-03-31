'use strict';
/**
 * Created by David on 01.03.15.
 */


const expect = require('chai').expect,
	util = require('util');

const qsErrors = require('../../src/errors');
describe('Errors', function () {

	describe('InvalidQueryParameter', function () {
		var InvalidQueryParameter = qsErrors.InvalidQueryParameter;

		it('should exist', function () {
			expect(InvalidQueryParameter).to.exist;
		});

		it('should be type error', function () {
			expect(util.isError(new InvalidQueryParameter)).to.be.true;
		});

		it('should have message property', function () {
			expect(new InvalidQueryParameter('')).to.have.property('message');
		});

		it('should set message property correctly', function () {
			var myErrorMessage = 'Test-Error-Message';
			var errorInstance = new InvalidQueryParameter(myErrorMessage);
			expect(errorInstance.message).to.equal(myErrorMessage);
		});

		it('should have name property', function () {
			expect(new InvalidQueryParameter()).to.have.property('name');
			expect(new InvalidQueryParameter().name).to.equal('InvalidQueryParameter');
		});

		it('should have statusCode property', function () {
			expect(new InvalidQueryParameter()).to.have.property('statusCode');
		});

		it('should have 400 as statusCode property', function () {
			expect(new InvalidQueryParameter().statusCode).to.equal(400);
		});
	});

	describe('InvalidQueryValue', function () {
		var errorInstance;

		before(function () {
			errorInstance = new qsErrors.InvalidQueryValue();
		});
		it('should exist', function () {
			var InvalidArgument = qsErrors.InvalidQueryValue;
			expect(InvalidArgument).to.exist;
		});

		it('should be type error', function () {
			expect(util.isError(new qsErrors.InvalidQueryValue)).to.be.true;
		});

		it('should have message property', function () {
			var myErrorMessage = 'Test-Error-Message';
			var errorInstance = new qsErrors.InvalidQueryValue(myErrorMessage);
			expect(errorInstance.message).to.equal(myErrorMessage);
		});

		it('should have name property', function () {
			expect(errorInstance).to.have.property('name');
			expect(errorInstance.name).to.equal('InvalidQueryValue');
		});
	});

	describe('MissingAdapter', function () {
		it('should exist', function () {
			let MissingAdapter = qsErrors.MissingAdapter;
			expect(MissingAdapter).to.exist;
		});

		it('should be type error', function () {
			expect(util.isError(new qsErrors.MissingAdapter)).to.be.true;
		});

		it('should have name "MissingAdapter"', function () {
			expect(new qsErrors.MissingAdapter().name).to.equal('MissingAdapter');
		});

		it('should have message property', function () {
			var myErrorMessage = 'Test-Error-Message';
			var errorInstance = new qsErrors.MissingAdapter(myErrorMessage);
			expect(errorInstance.message).to.equal(myErrorMessage);
		});
	});
});