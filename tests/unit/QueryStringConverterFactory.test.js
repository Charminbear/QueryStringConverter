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

const qsErrors = require('../../src/errors');

describe('QueryStringConverterFactory', function () {
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
		qsConverterFactory = proxyquire('../../src/QueryStringConverterFactory.js', {
			'./QueryStringConverter' : QSConverterStub,
			'./adapters/sequelizeAdapter'     : sequelizeAdapterMock
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
			qsConverterFactory.createInstance('test', customOptions);
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
			qsConverterFactory.createInstance('test', customOptions);
			expect(QSConverterStub).to.have.been.calledWith(expectedOptions);
		});

		it('should resolve string based adapter-options to actual adapter', function () {
			let customOptions = {
				adapter : 'sequelize'
			};
			let expectedOptions = _.defaults({
				adapter : sequelizeAdapterMock
			}, defaultOptions);
			qsConverterFactory.createInstance('test', customOptions);
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
			let createInstanceCall = qsConverterFactory.createInstance.bind(qsConverterFactory, 'test', customOptions);
			expect(createInstanceCall).to.throw(qsErrors.MissingAdapter, errorMessage);
		});
	});

	describe('#getInstance(name)', function () {
		it('should exist', function () {
			expect(qsConverterFactory.getInstance).to.exist;
			expect(qsConverterFactory.getInstance).to.be.a('function');
		});

		it('should return previously created instance', function () {
			var myInstance = qsConverterFactory.createInstance('test');
			expect(qsConverterFactory.getInstance('test')).to.equal(myInstance);
		});

		it('should return only instance if called without arguments', function () {
			var myInstance = qsConverterFactory.createInstance();
			expect(qsConverterFactory.getInstance()).to.equal(myInstance);
		});

		it('should throw "InvalidInstanceName" Error if no instance with this name exists', function () {
			let creationInstanceCall = qsConverterFactory.getInstance.bind(qsConverterFactory, 'nonExisting');
			let errorMessage = 'No Instance with name "nonExisting" found. Please make sure you created it with #createInstance().';
			expect(creationInstanceCall).to.throw(qsErrors.InvalidInstanceName, errorMessage);
		});

	});
});