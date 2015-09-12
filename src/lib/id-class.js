/**
 * Identity Monad
 */
class Id {
    constructor(value) {
        this._value = value;
    }
    get value() {
        return this._value;
    }

    equals() {
        return typeof this.value.equals === "function" ? this.value.equals(b.value) : this.value === b.value;
    }

// Semigroup (value must also be a Semigroup)
    concat(b) {
        return Id.of(this.value.concat(b.value));
    }

// Flatten
    join() {
        if(!(this.value instanceof Id)) {
            return this;
        }
        return this.value.extract().join();
    };

// Monoid (value must also be a Monoid)
    empty() {
        return Id.of(this.value.empty ? this.value.empty() : this.value.constructor.empty());
}   ;

// Foldable
    reduce(f, acc) {
        return f(acc, this.value);
    };

    // Functor
    map(f) {
        return Id.of(f(this.value));
    };


    // Chain
    chain(f) {
        return f(this.value);
    };

    // Extend
    extend(f) {
        return Id.of(f(this));
    };

    // Monad
    static of(a) {
        return new Id(a);
    };

    // Comonad
    extract() {
        return this.value;
    };

    toString() {
        return 'Id [' + this.value + ']';
    };
}