'use strict';

const expect = require("chai").expect,
	Sequelize = require('sequelize'),
	querystring = require('querystring'),
	QueryStringConverterFactory = require('../../index');


var sequelize = new Sequelize('database', 'username', 'password', {
	dialect : 'sqlite',
	//storage : __dirname + '/tempDatabase.sqlite'
});

var data = [
	{
		name     : 'Max',
		lastName : 'Payne'
	},
	{
		name     : 'John',
		lastName : 'Wayne'
	},
	{
		name     : 'Bruce',
		lastName : 'Wayne'
	}
];

describe('System Test', function () {
	var Person,
		queryStringConverter;

	this.timeout(2000);
	before(function (done) {
		Person = sequelize.define('Person', {name : Sequelize.STRING, lastName : Sequelize.STRING});
		sequelize.sync()
			.then(function () {
				return Person.bulkCreate(data);
			})
			.then(function () {
				console.log('Person created!');
				done();
			})
			.catch(function (err) {
				console.error('Error: ', err);
			});
	});

	before(function () {
		queryStringConverter = QueryStringConverterFactory.createInstance();
	});

	describe('limitTo', function () {
		it('limitTo = 1 should only return one result', function (done) {
			var queryObject = queryStringConverter.convertQuery('limitTo=1');
			sendQuery(queryObject, function (result) {
				expect(result.length).to.equal(1);
				done();
			});
		});

		it('limitTo = 2 should only return one result', function (done) {
			var queryObject = queryStringConverter.convertQuery('limitTo=2');
			sendQuery(queryObject, function (result) {
				expect(result.length).to.equal(2);
				done();
			});
		});
	});

	describe('offset', function () {
		it('offset = 2 should return only last result', function (done) {
			var queryObject = queryStringConverter.convertQuery('offset=2');
			sendQuery(queryObject, function (result) {
				expect(result.length).to.equal(1);
				expect(result[0].name).to.equal(data[2].name);
				done();
			});
		});
	});

	describe('orderBy', function () {
		it('orderBy=name should order by name ascending', function (done) {
			var queryObject = queryStringConverter.convertQuery('orderBy=name');
			sendQuery(queryObject, function (result) {
				expect(result[0].name).to.equal('Bruce');
				expect(result[1].name).to.equal('John');
				expect(result[2].name).to.equal('Max');
				done();
			});
		});

		it('orderBy=+name should order by name ascending', function (done) {
			let queryString = "orderBy=" + querystring.escape('+name');
			let queryObject = queryStringConverter.convertQuery(queryString);
			sendQuery(queryObject, function (result) {
				expect(result[0].name).to.equal('Bruce');
				expect(result[1].name).to.equal('John');
				expect(result[2].name).to.equal('Max');
				done();
			});
		});

		it('orderBy=-name should order by name descending', function (done) {
			var queryObject = queryStringConverter.convertQuery('orderBy=-name');
			sendQuery(queryObject, function (result) {
				expect(result[0].name).to.equal('Max');
				expect(result[1].name).to.equal('John');
				expect(result[2].name).to.equal('Bruce');
				done();
			});
		});

		it('orderBy=lastName,name should order by both', function (done) {
			var queryObject = queryStringConverter.convertQuery('orderBy=-lastname,name');
			sendQuery(queryObject, function (result) {
				expect(result[0].name).to.equal('Bruce');
				expect(result[1].name).to.equal('John');
				expect(result[2].name).to.equal('Max');
				done();
			});
		})
	});


	function sendQuery(query, callback) {
		Person.findAll(query)
			.then(callback)
			.catch(function (err) {
				throw err;
			});
	}
});

