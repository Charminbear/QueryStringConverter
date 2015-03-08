'use strict';
/**
 * Created by dave on 07.03.15.
 */

const chai = require("chai"),
	sinon = require("sinon"),
	sinonChai = require("sinon-chai"),
	expect = chai.expect,
	proxyquire = require('proxyquire');

chai.use(sinonChai);


describe('API', function () {
	var qsConverterFactory,
		QSConverterStub;
	const defaultOptions = {
		silentErrors : false,
		adapter: 'sequelize'
	};


	beforeEach(function () {
		QSConverterStub = sinon.stub();
		qsConverterFactory = proxyquire('../../src/', {
			'./QueryStringConverter' : QSConverterStub
		});
	});


	it('should exist', function () {
		expect(qsConverterFactory).to.exist;
	});

	describe('#createInstance()', function () {
		it('should exist', function () {
			expect(qsConverterFactory.createInstance).to.exist;
			expect(qsConverterFactory.createInstance).to.be.a.function;
		});
		it('should instantiate QueryStringConverter on call', function () {
			qsConverterFactory.createInstance();
			expect(QSConverterStub).to.have.been.called;
		});
		it('should put default options if no arguments given', function () {
			qsConverterFactory.createInstance();
			expect(QSConverterStub).to.have.been.calledWith(defaultOptions);
		});
		it('should put custom options object if given', function () {
			let customOptions = {
				silentErrors : true,
				adapter : 'sequelize'
			};
			qsConverterFactory.createInstance(customOptions);
			expect(QSConverterStub).to.have.been.calledWith(customOptions);
		});
		it('should merge default and custom options if custom options are incomplete', function () {
			let customOptions = {
				silentErrors : true
			};
			let expectedOptions = {
				silentErrors : true,
				adapter: 'sequelize'
			};
			qsConverterFactory.createInstance(customOptions);
			expect(QSConverterStub).to.have.been.calledWith(expectedOptions);
		});
	});


	describe('#errors', function () {
		it('should populate Error "InvalidQueryParameter"', function () {
			expect(qsConverterFactory.InvalidQueryParameter).to.exist;
		});

		it('should populate Error "InvalidArgument', function () {
			expect(qsConverterFactory.InvalidQueryValue).to.exist;
		});
	});
});