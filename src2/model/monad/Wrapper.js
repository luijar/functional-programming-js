exports.Wrapper = class Wrapper {
	
	constructor(value) {
		this._value = value;
	}

	static of(a) {
		return new Wrapper(a);
	}

	map(f) {
		return Wrapper.of(f(this._value));
	}
	
	join() {
		if(!(this._value instanceof Wrapper)) {
			return this;
		}
		return this._value.join();
	}

	toString() {
		return `Wrapper (${this._value})`;
	}
}