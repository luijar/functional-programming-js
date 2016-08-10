/**
 * Helper objects/functions
 * Author: Luis Atencio
 */
// var Person = require('../model/Person.js').Person;

// var _students = {
// 	'444-44-4444': new Person('444-44-4444', 'Alonzo', 'Church')
// };

var isObject = (val) => val && typeof val === 'object';

function deepFreeze(obj) {
	if(isObject(obj) && !Object.isFrozen(obj)) {
		Object.keys(obj).forEach(name => deepFreeze(obj[name]));
		Object.freeze(obj);
	}
	return obj;
}	

module.exports = {
	deepFreeze: deepFreeze	
};

// Helper objects
// module.exports.db = {
// 	find: function (ssn) {
// 		return _students[ssn];
//   	}
// };