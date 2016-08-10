/**
 * Identity Monad
 */
function Id(value) {
    this.value = value;
}

// Setoid
Id.prototype.equals = function(b) {
    return typeof this.value.equals === "function" ? this.value.equals(b.value) : this.value === b.value;
};

// Semigroup (value must also be a Semigroup)
Id.prototype.concat = function(b) {
    return Id.of(this.value.concat(b.value));
};

// Flatten
Id.prototype.join = function () {
    if(!(this.value instanceof Id)) {
        return this;
    }
    return this.value.extract().join();
};

// Monoid (value must also be a Monoid)
Id.prototype.empty = function() {
    return Id.of(this.value.empty ? this.value.empty() : this.value.constructor.empty());
};

// Foldable
Id.prototype.reduce = function(f, acc) {
    return f(acc, this.value);
};

// Functor
Id.prototype.map = function(f) {
    return Id.of(f(this.value));
};

// Applicative
Id.prototype.ap = function(b) {
    return new Identity(this.value(b.value));
};

// Traversable
Id.prototype.traverse = function(f, of) {
    return f(this.value).map(function(y){ return new Identity(y); });
};

// Chain
Id.prototype.chain = function(f) {
    return f(this.value);
};

// Extend
Id.prototype.extend = function(f) {
    return Id.of(f(this));
};

// Monad
Id.of = function(a) {
    return new Id(a);
};

// Comonad
Id.prototype.extract = function() {
    return this.value;
};

Id.prototype.toString = function () {
    return 'Id [' + this.value + ']';
};