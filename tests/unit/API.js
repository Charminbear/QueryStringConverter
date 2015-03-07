'use strict';
/**
 * Created by dave on 07.03.15.
 */

const expect = require('chai').expect;

const qsConverterFactory = require('../../src/');
describe('API', function () {
	it('should exist', function () {
		expect(qsConverterFactory).to.exist;
	});

	it('should have "createInstance"-Function', function () {
		expect(qsConverterFactory.createInstance).to.exist;
		expect(qsConverterFactory.createInstance).to.be.a.function;
	});

	it('should populate Error "InvalidQueryParameter"', function () {
		expect(qsConverterFactory.InvalidQueryParameter).to.exist;
	});

	it('should populate Error "InvalidArgument', function () {
		expect(qsConverterFactory.InvalidQueryValue).to.exist;
	});
});