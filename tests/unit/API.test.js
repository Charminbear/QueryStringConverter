'use strict';
/**
 * Created by dave on 07.03.15.
 */

const chai = require("chai"),
	sinon = require("sinon"),
	sinonChai = require("sinon-chai"),
	expect = chai.expect,
	proxyquire = require('proxyquire'),
	_ = require('lodash');

chai.use(sinonChai);

const errors = require('../../src/errors');

describe('API', function () {
	var qsConverterFactory,
		QSConverterStub;

	const defaultOptions = {
		silentErrors : false,
		adapter      : 'sequelize'
	};

	const sequelizeAdapterMock = {
		'limit' : {}
	};
	beforeEach(function () {
		QSConverterStub = sinon.stub();
		qsConverterFactory = proxyquire('../../src/', {
			'./QueryStringConverter' : QSConverterStub,
			'./sequelizeAdapter'     : sequelizeAdapterMock
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

		it('should put custom options object if given', function () {
			let customOptions = {
				silentErrors : true,
				adapter      : {}
			};
			qsConverterFactory.createInstance(customOptions);
			expect(QSConverterStub).to.have.been.calledWith(customOptions);
		});

		it('should merge default and custom options if custom options are incomplete', function () {
			let customOptions = {
				adapter : {}
			};
			let expectedOptions = {
				silentErrors : false,
				adapter      : {}
			};
			qsConverterFactory.createInstance(customOptions);
			expect(QSConverterStub).to.have.been.calledWith(expectedOptions);
		});

		it('should resolve string based adapter-options to actual adapter', function () {
			let customOptions = {
				adapter : 'sequelize'
			};
			let expectedOptions = _.defaults({
				adapter : sequelizeAdapterMock
			}, defaultOptions);
			qsConverterFactory.createInstance(customOptions);
			expect(QSConverterStub).to.have.been.calledWith(expectedOptions);
		});

		it('should load sequelize as default option', function () {
			let expectedOptions = _.defaults({
				adapter : sequelizeAdapterMock
			}, defaultOptions);
			qsConverterFactory.createInstance();
			expect(QSConverterStub).to.have.been.calledWith(expectedOptions);
		});

		it('should throw "MissingAdapter" if adapter option string doesnt match existing adapter', function () {
			let customOptions = {
				adapter : 'nonExisting'
			};
			let errorMessage = 'Specified Adapter "nonExisting" could not be found. If it is a custom adapter, register it first with #registerAdapter().';
			let createInstanceCall = qsConverterFactory.createInstance.bind(qsConverterFactory, customOptions);
			expect(createInstanceCall).to.throw(errors.MissingAdapter, errorMessage);
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