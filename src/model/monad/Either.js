/**
 * ES6 versions of Either monad used in FP in JS
 * Author: Luis Atencio
 */ 
exports.Either = class Either {
	constructor(value) {
		this._value = value;
	}
	
	get value() {
		return this._value;
	}
	
	static left(a) {
		return new exports.Left(a);
	}
	
	static right(a) {
		return new exports.Right(a);
	}
	
	static fromNullable(val) {
		return val !== null && val !== undefined ? Either.right(val) : Either.left(val);
	}
	
	static of(a){
		return Either.right(a);
	}
};

exports.Left = class Left extends exports.Either {
	
	map(_) {		
		return this; // noop
	}
	
	get value() {
		throw new TypeError("Can't extract the value of a Left(a).");
	}
	
	getOrElse(other) {
		return other;
	}
	
	orElse(f) {
		return f(this._value);
	}
	
	chain(f) {
		return this;
	}

	getOrElseThrow(a) {
		throw new Error(a);
	}
	
	filter(f) {
		return this;
	}
	
	get isRight() {
		return false;
	}

	get isLeft() {
		return true;
	}

	toString() {
		return `Either.Left(${this._value})`;
	}
};

exports.Right = class Right extends exports.Either {
	
	map(f) {		
		return exports.Either.of(f(this._value));
	}
	
	getOrElse(other) {
		return this._value;
	}
	
	orElse() {
		return this;
	}
	
	chain(f) {		
		return f(this._value);
	}
	
	getOrElseThrow(_) {
		return this._value;
	}
	
	filter(f) {		
		return exports.Either.fromNullable(f(this._value) ? this._value : null);
	}

	get isRight() {
		return true;
	}

	get isLeft() {
		return false;
	}
	
	toString() {
		return `Either.Right(${this._value})`;
	}
};
