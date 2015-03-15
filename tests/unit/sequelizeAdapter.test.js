'use strict';

const chai = require("chai"),
	expect = chai.expect;

const sequelizeAdapter = require('../../src/sequelizeAdapter');

describe('SequelizeAdapter', function () {
	it('should exist', function () {
		expect(sequelizeAdapter).to.exist;
	});

	it('should be a map', function () {
		expect(sequelizeAdapter instanceof Map).to.be.true;
	});

	describe('#limitTo', function () {
		var adapterElement = sequelizeAdapter.get('limitTo');
		it('should exist', function () {
			expect(adapterElement).to.exist;
		});

		it('should be a valid adapterElement', function () {
			assertAdapterElement(adapterElement);
		});

		it('should have key "limit"', function () {
			expect(adapterElement.key).to.equal('limit');
		});

		it('should convert numeric string to integer value', function () {
			var result = adapterElement.convertQueryValue('42');
			expect(result).to.equal(42);
		});
	});

	describe('offset', function () {
		var adapterElement = sequelizeAdapter.get('offset');
		it('should exist', function () {
			expect(adapterElement).to.exist;
		});

		it('should be a valid adapterElement', function () {
			assertAdapterElement(adapterElement);
		});

		it('should have key "offset"', function () {
			expect(adapterElement.key).to.equal('offset');
		});

		it('should convert numeric string to integer value', function () {
			var result = adapterElement.convertQueryValue('42');
			expect(result).to.equal(42);
		});
	});

	describe('orderBy', function () {
		var adapterElement = sequelizeAdapter.get('orderBy');
		it('should exist', function () {
			expect(adapterElement).to.exist;
		});

		it('should be a valid adapterElement', function () {
			assertAdapterElement(adapterElement);
		});

		it('should have key "order"', function () {
			expect(adapterElement.key).to.equal('order');
		});

		it('should convert orderBy=+field1 => [["field1", "asc"]]', function () {
			let queryValue = '+field1';
			let result = adapterElement.convertQueryValue(queryValue);
			expect(result).to.deep.equal([['field1', 'ASC']]);
		});

		it('should convert field without + to ascending field', function () {
			let queryValue = 'field1';
			let result = adapterElement.convertQueryValue(queryValue);
			expect(result).to.deep.equal([['field1', 'ASC']]);
		});

		it('should convert -field1 => [["field1", "desc"]]"', function () {
			let queryValue = '-field1';
			let result = adapterElement.convertQueryValue(queryValue);
			expect(result).to.deep.equal([['field1', 'DESC']]);
		});

		it('should convert multiple, comma-separated orderBy-Fields', function () {
			let queryValue = '-field1,+field2,field3';
			let result = adapterElement.convertQueryValue(queryValue);
			expect(result).to.deep.equal([['field1', 'DESC'], ['field2', 'ASC'], ['field3', 'ASC']]);
		});
	});

	describe('columns', function () {
		var adapterElement = sequelizeAdapter.get('columns');
		it('should exist', function () {
			expect(adapterElement).to.exist;
		});

		it('should be a valid adapterElement', function () {
			assertAdapterElement(adapterElement);
		});

		it('should have key "attributes"', function () {
			expect(adapterElement.key).to.equal('attributes');
		});

		it('should output an array', function () {
			var result = adapterElement.convertQueryValue('column');
			expect(result).to.be.an('Array');
		});

		it('should return array with the field as string', function () {
			var result = adapterElement.convertQueryValue('column');
			expect(result).to.deep.equal(['column']);
		});

		it('should convert comma separated fields as own array properties', function () {
			var result = adapterElement.convertQueryValue('column1,column2');
			expect(result).to.deep.equal(['column1', 'column2']);
		});

		it('should elimnate all white spaces within the queryValue', function () {
			var result = adapterElement.convertQueryValue(' column1, column2');
			expect(result).to.deep.equal(['column1', 'column2']);
		});
	});

});


function assertAdapterElement(adapterElement) {
	expect(adapterElement).to.have.property('key');
	expect(adapterElement.key).to.be.a('String');
	expect(adapterElement).to.have.property('convertQueryValue');
	expect(adapterElement.convertQueryValue).to.be.a('function');
}