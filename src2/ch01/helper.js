/**
 * Helper objects/functions
 * Author: Luis Atencio
 */
var User = require('../model/User.js').User;

var _students = {
	'444-44-4444': new User('444-44-4444', 'Alonzo', 'Church')
};

module.exports = {
	// helper functions	  	
};

// Helper objects
module.exports.db = {
	find: function (ssn) {
		return _students[ssn];
  	}
};