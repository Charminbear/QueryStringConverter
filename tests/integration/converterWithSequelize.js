'use strict';
/**
 * Created by dave on 07.03.15.
 */
const expect = require('chai').expect,
	queryString = require('querystring');

const QueryStringConverter = require('../../src/QueryStringConverter'),
	errors = require('../../src/errors');

describe('#limitTo', function () {
	it('should convert "limitTo=1" => {limit:1}', function () {
		var query = 'limitTo=1';
		var expectClause = {limit : 1};

		var returnedClause = convertQuery(query);
		expect(returnedClause).to.deep.equal(expectClause);
	});

	it('should throw InvalidQueryValue Exception if limitTo is not a number', function () {
		var query = 'limitTo=abc';
		expect(convertQuery.bind(qsConverterInstance, query)).to.throw(errors.InvalidQueryValue);
	});
});

describe('#offset', function () {
	it('should convert "offset=10" => {offset:10}', function () {
		var query = 'offset=10';
		var expectClause = {offset : 10};

		expect(convertQuery(query)).to.deep.equal(expectClause);
	});

	it('should throw InvalidQueryValue Exception if offest is not a number', function () {
		var queryString = 'offset=abc';
		expect(convertQuery.bind(qsConverterInstance, queryString)).to.throw(errors.InvalidQueryValue);
	});
});

describe('#orderBy', function () {
	it('should convert orderBy=+field1 => [["field1", "asc"]]', function () {
		let query = 'orderBy=' + queryString.escape('+field1');
		expect(convertQuery(query)).to.deep.equal({order : [['field1', 'ASC']]});
	});

	it('should convert orderBy without + to ascending field', function () {
		let query = 'orderBy=field1';
		expect(convertQuery(query)).to.deep.equal({order : [['field1', 'ASC']]});
	});

	it('should convert orderBy=-field1 => [["field1", "desc"]]"', function () {
		let query = 'orderBy=' + queryString.escape('-field1');
		expect(convertQuery(query)).to.deep.equal({order : [['field1', 'DESC']]});
	});

	it('should convert multiple orderBy-Fields', function () {
		let orderField1 = queryString.escape('-field1');
		let orderField2 = queryString.escape('+field2');
		let query = 'orderBy=' + orderField1 + ',' + orderField2;
		expect(convertQuery(query)).to.deep.equal({order : [['field1', 'DESC'], ['field2', 'ASC']]});
	});
});

describe('special cases', function () {
	it('should convert multiple fields', function () {
		var query = 'offset=10&limitTo=1';
		var expectClause = {offset : 10, limit : 1};
		expect(convertQuery(query)).to.deep.equal(expectClause);
	});
});