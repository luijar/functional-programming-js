/**
 * Secure Value Monad
 */
function Secure(value) {
    this.value = value;
}

// Setoid
Secure.prototype.equals = function(b) {
    return typeof this.value.equals === "function" ? this.value.equals(b.value) : this.value === b.value;
};

// Semigroup (value must also be a Semigroup)
Secure.prototype.concat = function(b) {
    return Secure.of(this.value.concat(b.value));
};

// Flatten
Secure.prototype.join = function () {
    if(!(this.value instanceof Id)) {
        return this;
    }
    return this.value.extract().join();
};

// Monoid (value must also be a Monoid)
Secure.prototype.empty = function() {
    return Secure.of(this.value.empty ? this.value.empty() : this.value.constructor.empty());
};

// Foldable
Secure.prototype.reduce = function(f, acc) {
    return f(acc, this.value);
};

// Functor
Secure.prototype.map = function(f) {
    return Secure.of(f(this.value));
};

// Applicative
Secure.prototype.ap = function(b) {
    return new Identity(this.value(b.value));
};

// Traversable
Secure.prototype.traverse = function(f, of) {
    return f(this.value).map(function(y){ return new Identity(y); });
};

// Chain
Secure.prototype.chain = function(f) {
    return f(this.value);
};

// Extend
Secure.prototype.extend = function(f) {
    return Secure.of(f(this));
};

// Monad
Secure.of = function(a) {
    return new Id(a);
};

// Comonad
Secure.prototype.extract = function() {
    return this.value;
};

Secure.prototype.toString = function () {
    return 'Id [' + this.value + ']';
};