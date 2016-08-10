/**
 * Helper objects/functions for chapter 4
 * Author: Luis Atencio
 */
const R = require('ramda');

// checkType :: Type -> Type -> Type | TypeError
const checkType = R.curry(function(typeDef, obj) {
	if(!R.is(typeDef, obj)) {
		let type = typeof obj;
		throw new TypeError(`Type mismatch. Expected [${typeDef}] but found [${type}]`);
	}
	return obj;
});

// Helper functions
module.exports = {
	checkType: checkType	
};

const Tuple = function( /* types */ ) {
	const typeInfo = Array.prototype.slice.call(arguments, 0);
	const _T = function( /* values */ ) {
		const values = Array.prototype.slice.call(arguments, 0);
		if(values.some(val => val === null || val === undefined)) {
			throw new ReferenceError('Tuples may not have any null values');
		}
		if(values.length !== typeInfo.length) {
			throw new TypeError('Tuple arity does not match its prototype');
		}	
		values.map((val, index) => {			
			this['_' + (index + 1)] = checkType(typeInfo[index],val);			
		}, this);		
		Object.freeze(this);
	};
	_T.prototype.values = function () {				
		return Object.keys(this).map(k => this[k], this);
	};	
	return _T;
};

// Export the Tuple class
module.exports.Tuple = Tuple;