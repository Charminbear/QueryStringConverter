'use strict';
/**
 * Created by dave on 02.01.15.
 */

const _ = require('lodash'),
  queryString = require('querystring'),
  qsErrors = require('./errors');

/**
 * @param options
 * @constructor QueryStringConverter
 */
var QueryStringConverter = function (options) {
  if (!options) {
    throw new Error('Missing Options Object');
  }
  else if (!options.adapter) {
    throw new qsErrors.MissingAdapter('No Adapter defined. Define it within the Options-Object.');
  }

  var adapter = options.adapter;

  this.convertQuery = function (query) {
    var parsedQuery = queryString.parse(query);
    var result = {};

    _.each(parsedQuery, function (queryElementValue, queryElementKey) {
      let adapterElement = adapter.get(queryElementKey);
      try {
        validateQueryElement(adapterElement, queryElementKey, queryElementValue);
        result[adapterElement.key] = adapterElement.convertQueryValue(queryElementValue);
      } catch (error) {
        if (!options.silentErrors) {
          throw error;
        }
      }
    });

    return result;
  };

  function validateQueryElement(adapterElement, queryElementKey, queryElementValue) {
    if (!adapterElement) {
      throw new qsErrors.InvalidQueryParameter('Invalid query parameter with key "' + queryElementKey + '"!');
    } else if (!queryElementValue.match(adapterElement.validInputs)) {
      throw new qsErrors.InvalidQueryValue('Validation failed for Query-Value "' + queryElementValue + '"!');
    }
  }
};


module.exports = QueryStringConverter;

