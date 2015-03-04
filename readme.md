##THIS IS A WORK IN PROGRESS CONCEPT AS WELL AS APP
I got the idea for this while developing my first real RESTful API and not being able to find an easy Library for
handling of QueryStrings. So I decided to put this as a side-project. As im also diving into the awesome world of
TDD, im doing my best to develop this whole Library in TDD Style. This of course also means that im prefering a more
agile development - so the API and especially the given Names described below are most likely to change a lot. I put it
there to have some basic requirements and an Idea of what I actaully have to test and then develop.

Im always open for Input, so feel free to leave an Issue!

#QueryStringConverter (working name)

Helping you to easily convert Querystrings from a **REST**ful URI into whatever format you need, for example a valid
query-object for the awesome **sequelize** library! The idea is to have a very simple and dynamic abstract layer
between your requests and your Controllers and/or DB-Calls. Yay - Separation of Concerns!


##API
**QueryStringConverterFactory**
The QueryStringConerterFactory is what you get when you require('QSConverter') inside your app.

* createInstance(options) - create a new QueryStringConverter, options can be:
    * silentErrors {boolean} - if set to true, no errors will be thrown, invalid keys or values are ignored
    * adapter {String} - specify the adapter to be used by this instance (defaults to 'sequelize')
    * customAdapterElements {Array} - Array of custom adapter-elements to be used
* registerAdapter(adapter) - Add a new adapter which can then be used by createInstance
* setDefaultOptions(options) - takes in the same Options as the *createInstance* Methods. All further calls to
**createInstance** will use those options to create an instance.

**Adapter**
An adapter is basically an key-value store where the key is a QueryParameterKey, the value is a AdapterElement.

**AdapterElement**
The Adapter-Element has up to 3 properties:

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
* include - Comma-separated relation-objects to include in the Answer-Object

##Adapters:
**Sequelize**
The standard Query-API transforms to these sequelize values:

* limitTo --> {limit : INTEGER}
* offset --> {offset: INTEGER}
* orderBy --> [['field1', 'ASC'], ['field2', 'DESC']]
* fields --> tdb.
* include --> tbd.
