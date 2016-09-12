/**
 * Custom Maybe Monad used in FP in JS book written in ES6
 * Author: Luis Atencio
 */ 
exports.Maybe = class Maybe {
	static just(a) {
		return new exports.Just(a);
	}
	static nothing() {
		return new exports.Nothing();
	}
	static fromNullable(a) {
		return a !== null ? Maybe.just(a) : Maybe.nothing();
	}
	static of(a) {
		return Maybe.just(a);
	}
	get isNothing() {
		return false;
	}
	get isJust() {
		return false;
	}
};


// Derived class Just -> Presence of a value
exports.Just = class Just extends exports.Maybe {
	constructor(value) {
		super();
		this._value = value;
	}

	get value() {
		return this._value;
	}
	
	map(f) {
		return exports.Maybe.fromNullable(f(this._value));
	}

	chain(f) {
		return f(this._value);
	}

	getOrElse() {
		return this._value;
	}

	filter(f) {
		exports.Maybe.fromNullable(f(this._value) ? this._value : null);
	}

	get isJust() {
		return true;
	}

	toString () {
		return `Maybe.Just(${this._value})`;
	}
};

// Derived class Empty -> Abscense of a value
exports.Nothing = class Nothing extends exports.Maybe {
	map(f) {
		return this;
	}
	
	chain(f) {
		return this;
	}

	get value() {
		throw new TypeError("Can't extract the value of a Nothing.");
	}

	getOrElse(other) {
		return other;
	}

	filter() {
		return this._value;
	}

	get isNothing() {
		return true;
	}	

	toString() {
		return 'Maybe.Nothing';
	}
};