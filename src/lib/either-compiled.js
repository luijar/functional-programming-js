'use strict';

var clone = Object.create;
var unimplemented = function unimplemented() {
    throw new Error('Not implemented.');
};
var noop = function noop() {
    return this;
};

// -- Implementation ---------------------------------------------------

/**
 * The `Either(a, b)` structure represents the logical disjunction between `a`
 * and `b`. In other words, `Either` may contain either a value of type `a` or
 * a value of type `b`, at any given time. This particular implementation is
 * biased on the right value (`b`), thus projections will take the right value
 * over the left one.
 *
 * This class models two different cases: `Left a` and `Right b`, and can hold
 * one of the cases at any given time. The projections are, none the less,
 * biased for the `Right` case, thus a common use case for this structure is to
 * hold the results of computations that may fail, when you want to store
 * additional information on the failure (instead of throwing an exception).
 *
 * Furthermore, the values of `Either(a, b)` can be combined and manipulated by
 * using the expressive monadic operations. This allows safely sequencing
 * operations that may fail, and safely composing values that you don't know
 * whether they're present or not, failing early (returning a `Left a`) if any
 * of the operations fail.
 *
 * While this class can certainly model input validations, the [Validation][]
 * structure lends itself better to that use case, since it can naturally
 * aggregate failures — monads shortcut on the first failure.
 *
 * [Validation]: https://github.com/folktale/data.validation
 *
 *
 * @class
 * @summary
 * Either[α, β] <: Applicative[β]
 *               , Functor[β]
 *               , Chain[β]
 *               , Show
 *               , Eq
 */
function Either() {}

Left.prototype = clone(Either.prototype);
function Left(a) {
    this.value = a;
}

Right.prototype = clone(Either.prototype);
function Right(a) {
    this.value = a;
}

// -- Constructors -----------------------------------------------------

/**
 * Constructs a new `Either[α, β]` structure holding a `Left` value. This
 * usually represents a failure due to the right-bias of this structure.
 *
 * @summary a → Either[α, β]
 */
Either.Left = function (a) {
    return new Left(a);
};
Either.prototype.Left = Either.Left;

/**
 * Constructs a new `Etiher[α, β]` structure holding a `Right` value. This
 * usually represents a successful value due to the right bias of this
 * structure.
 *
 * @summary β → Either[α, β]
 */
Either.Right = function (a) {
    return new Right(a);
};
Either.prototype.Right = Either.Right;

// -- Conversions ------------------------------------------------------

/**
 * Constructs a new `Either[α, β]` structure from a nullable type.
 *
 * Takes the `Left` case if the value is `null` or `undefined`. Takes the
 * `Right` case otherwise.
 *
 * @summary α → Either[α, α]
 */
Either.fromNullable = function (a) {
    return a != null ? this.Right(a) : /* otherwise */this.Left(a);
};
Either.prototype.fromNullable = Either.fromNullable;

/**
 * Constructs a new `Either[α, β]` structure from a `Validation[α, β]` type.
 *
 * @summary Validation[α, β] → Either[α, β]
 */
Either.fromValidation = function (a) {
    return a.fold(this.Left.bind(this), this.Right.bind(this));
};

// -- Predicates -------------------------------------------------------

/**
 * True if the `Either[α, β]` contains a `Left` value.
 *
 * @summary Boolean
 */
Either.prototype.isLeft = false;
Left.prototype.isLeft = true;

/**
 * True if the `Either[α, β]` contains a `Right` value.
 *
 * @summary Boolean
 */
Either.prototype.isRight = false;
Right.prototype.isRight = true;

// -- Applicative ------------------------------------------------------

/**
 * Creates a new `Either[α, β]` instance holding the `Right` value `b`.
 *
 * `b` can be any value, including `null`, `undefined` or another
 * `Either[α, β]` structure.
 *
 * @summary β → Either[α, β]
 */
Either.of = function (a) {
    return this.Right(a);
};
Either.prototype.of = Either.of;

// -- Functor ----------------------------------------------------------

/**
 * Transforms the `Right` value of the `Either[α, β]` structure using a regular
 * unary function.
 *
 * @method
 * @summary (@Either[α, β]) => (β → γ) → Either[α, γ]
 */
Either.prototype.map = unimplemented;
Left.prototype.map = noop;

Right.prototype.map = function (f) {
    return this.of(f(this.value));
};

// -- Chain ------------------------------------------------------------

/**
 * Transforms the `Right` value of the `Either[α, β]` structure using an unary
 * function to monads.
 *
 * @method
 * @summary (@Either[α, β], m:Monad[_]) => (β → m[γ]) → m[γ]
 */
Either.prototype.chain = unimplemented;
Left.prototype.chain = noop;

Right.prototype.chain = function (f) {
    return f(this.value);
};

// -- Show -------------------------------------------------------------

/**
 * Returns a textual representation of the `Either[α, β]` structure.
 *
 * @method
 * @summary (@Either[α, β]) => Void → String
 */
Either.prototype.toString = unimplemented;

Left.prototype.toString = function () {
    return 'Either.Left(' + this.value + ')';
};

Right.prototype.toString = function () {
    return 'Either.Right(' + this.value + ')';
};

// -- Eq ---------------------------------------------------------------

/**
 * Tests if an `Either[α, β]` structure is equal to another `Either[α, β]`
 * structure.
 *
 * @method
 * @summary (@Either[α, β]) => Either[α, β] → Boolean
 */
Either.prototype.isEqual = unimplemented;

Left.prototype.isEqual = function (a) {
    return a.isLeft && a.value === this.value;
};

Right.prototype.isEqual = function (a) {
    return a.isRight && a.value === this.value;
};

// -- Extracting and recovering ----------------------------------------

/**
 * Extracts the `Right` value out of the `Either[α, β]` structure, if it
 * exists. Otherwise throws a `TypeError`.
 *
 * @method
 * @summary (@Either[α, β]) => Void → β         :: partial, throws
 * @see {@link module:lib/either~Either#getOrElse} — A getter that can handle failures.
 * @see {@link module:lib/either~Either#merge} — The convergence of both values.
 * @throws {TypeError} if the structure has no `Right` value.
 */
Either.prototype.get = unimplemented;

Left.prototype.get = function () {
    throw new TypeError('Can\'t extract the value of a Left(a).');
};

Right.prototype.get = function () {
    return this.value;
};

/**
 * Extracts the `Right` value out of the `Either[α, β]` structure. If the
 * structure doesn't have a `Right` value, returns the given default.
 *
 * @method
 * @summary (@Either[α, β]) => β → β
 */
Either.prototype.getOrElse = unimplemented;

Left.prototype.getOrElse = function (a) {
    return a;
};

Right.prototype.getOrElse = function (_) {
    return this.value;
};

/**
 * Transforms a `Left` value into a new `Either[α, β]` structure. Does nothing
 * if the structure contain a `Right` value.
 *
 * @method
 * @summary (@Either[α, β]) => (α → Either[γ, β]) → Either[γ, β]
 */
Either.prototype.orElse = unimplemented;
Right.prototype.orElse = noop;

Left.prototype.orElse = function (f) {
    return f(this.value);
};

/**
 * Returns the value of whichever side of the disjunction that is present.
 *
 * @summary (@Either[α, α]) => Void → α
 */
Either.prototype.merge = function () {
    return this.value;
};

// -- Folds and Extended Transformations -------------------------------

/**
 * Applies a function to each case in this data structure.
 *
 * @method
 * @summary (@Either[α, β]) => (α → γ), (β → γ) → γ
 */
Either.prototype.fold = unimplemented;

Left.prototype.fold = function (f, _) {
    return f(this.value);
};

Right.prototype.fold = function (_, g) {
    return g(this.value);
};

/**
 * Catamorphism.
 *
 * @method
 * @summary (@Either[α, β]) => { Left: α → γ, Right: β → γ } → γ
 */
Either.prototype.cata = unimplemented;

Left.prototype.cata = function (pattern) {
    return pattern.Left(this.value);
};

Right.prototype.cata = function (pattern) {
    return pattern.Right(this.value);
};

/**
 * Swaps the disjunction values.
 *
 * @method
 * @summary (@Either[α, β]) => Void → Either[β, α]
 */
Either.prototype.swap = unimplemented;

Left.prototype.swap = function () {
    return this.Right(this.value);
};

Right.prototype.swap = function () {
    return this.Left(this.value);
};

/**
 * Maps the left side of the disjunction.
 *
 * @method
 * @summary (@Either[α, β]) => (α → γ) → Either[γ, β]
 */
Either.prototype.leftMap = unimplemented;
Right.prototype.leftMap = noop;

Left.prototype.leftMap = function (f) {
    return this.Left(f(this.value));
};

Either.prototype.getOrElseThrow = unimplemented;

Left.prototype.getOrElseThrow = function (a) {
    throw new Error(a);
};

Right.prototype.getOrElseThrow = function (_) {
    return this.value;
};

Either.prototype.filter = unimplemented;
Left.prototype.filter = noop;

Right.prototype.filter = function (f) {
    return this.fromNullable(f(this.value) ? this.value : null);
};

//# sourceMappingURL=either-compiled.js.map