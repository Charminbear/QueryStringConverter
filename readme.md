#QueryStringConverter

Helping you to easily convert Querystrings from a **REST**ful URI into whatever format you need, for example a valid
query-object for the awesome **sequelize** library! The idea is to have a very simple and dynamic abstract layer
between your requests and your Controllers and/or DB-Calls. Yay - Separation of Concerns!

##EXAMPLE
tbd

##API
**QueryStringConverterFactory**
The QueryStringConverterFactory is what you get when you require('QueryStringConverter') inside your app. It has the following methods:

* createInstance({String} name, [{Object} options]) - create a new QueryStringConverter with a string-based nam. Possible Options are:
    * silentErrors {boolean} - if set to true, no errors will be thrown, invalid keys or values are ignored
    * adapter {String} - specify the adapter to be used by this instance (defaults to 'sequelize')
    * ~customAdapterElements {Map} - Map of custom adapter-elements to be used~
* getInstance(name) - receive a previously created adapter by the given name.
* ~registerAdapter(name, adapter) - Add a new adapter which can then be used within the adapter-option passed to
createInstance identified by the name~ *NOT YET IMPLEMENTED*
* ~setDefaultOptions(options) - takes in the same Options as the *createInstance* Methods. All further calls to
**createInstance** will use those options to create an instance.~

**Adapter**
An adapter is basically a key-value store where the key is a QueryParameterKey, the value is an AdapterElement.

**AdapterElement**
The Adapter-Element needs 3 properties:

* key {String} - This is the key used within the result-object of the converter
* convertQueryValue {function(queryParameterValue)} - the actual conversion function for this AdapterElement. The value
passed in this function is the one taken from the QueryParameter with the AdapterKey. The function must return a
new value which will be added to the overall result Object with the AdatperElements property key
* validInputs {Regex|Function} - used to validate the input-values before passing them to the
convertQueryValue-Function. If Regex, it will be used with *queryValue.match(regex)*. If Function, the return value
will be used and checked for a true or falsy value.

**QueryStringConvert**

* convertAll(queryString) - takes in a non-encoded QueryString and converts all QueryParameters with the specified
Adapter. Returns an {Object} with the AdapterElement's keys as properties and the results of the AdapterElement's
*convertQueryValue* results as values.

##Standard Query-API

* limitTo - valid inputs: Numbers
* offset - valid inputs: Numbers
* orderBy - valid inputs: +field & field for Ascending, -field for Descending sortOrder of the Field. Comma-separated
 for multiple sort fields in the order given.
* fields - Comma-separated fields to include in the Answer-Object.

##Adapters:
**Sequelize**
The standard Query-API transforms to these sequelize values:

* limitTo --> {limit : INTEGER}
* offset --> {offset: INTEGER}
* orderBy --> [['field1', 'ASC'], ['field2', 'DESC']]
* columns --> {attributes : ['column1', 'column2']}

##License
Copyright (c) \<2014\> \<David Losert\>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

