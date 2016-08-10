exports.Empty = class Empty {
	// map :: (A -> B) -> A -> B
	map(_) {
		return this;
	}

	// fmap :: (A -> B) -> Wrapper[A] -> Wrapper[B]
	fmap (_) {
		return new Empty();
	}

	toString() {
		return 'Empty ()';
	}
};

const empty = () => new exports.Empty();

module.exports = {
	empty: empty
};