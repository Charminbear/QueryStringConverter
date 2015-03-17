'use strict';
/**
 * Created by dave on 02.01.15.
 */

const _ = require('lodash'),
    queryString = require('querystring'),
    qsErrors = require('./errors');

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

        _.each(parsedQuery, function (value, key) {
            let adapterElement = adapter.get(key);
            if (!adapterElement && !options.silentErrors) {
                throw new qsErrors.InvalidQueryParameter('Invalid query parameter with key "' + key + '"!');
            } else if(!value.match(adapterElement.validate)){
                throw new qsErrors.InvalidQueryValue('Validation failed for Query-Value "' + value + '"!');
            }

            result[adapterElement.key] = adapterElement.convertQueryValue(value);
        });

        return result;
    };
};


module.exports = QueryStringConverter;
