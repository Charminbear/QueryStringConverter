const expect = require("chai").expect,
	Sequelize = require('sequelize'),
	QueryStringConverterFactory = require('../../src/index');


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
		name     : 'Roger',
		lastName : 'Rabbit'
	},
	{
		name     : 'Bruce',
		lastName : 'Wayne'
	}
];

describe('System Test', function () {
	var Person,
		queryStringConverter;

	this.timeout(10000);
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
		it('orderBy=name should order by name', function () {

		});
	});


	function sendQuery(query, callback) {
		Person.findAll(query)
			.then(callback)
			.catch(function (err) {
				throw err;
			});
	}
});

