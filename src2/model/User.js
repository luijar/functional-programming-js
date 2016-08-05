class User {
	constructor(ssn,firstname, lastname) {
		this._ssn = ssn;
		this._firstname = firstname;
		this._lastname = lastname;
	}

	get ssn() {
		return this._ssn;
	}

	get firstname() {
		return this._firstname;
	}

	get lastname() {
		return this._lastname;
	}
}

exports.User = User;