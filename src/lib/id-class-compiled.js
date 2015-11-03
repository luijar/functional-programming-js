/**
 * Identity Monad
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Id = (function () {
    function Id(value) {
        _classCallCheck(this, Id);

        this._value = value;
    }

    _createClass(Id, [{
        key: 'equals',
        value: function equals() {
            return typeof this.value.equals === 'function' ? this.value.equals(b.value) : this.value === b.value;
        }
    }, {
        key: 'concat',

        // Semigroup (value must also be a Semigroup)
        value: function concat(b) {
            return Id.of(this.value.concat(b.value));
        }
    }, {
        key: 'join',

        // Flatten
        value: function join() {
            if (!(this.value instanceof Id)) {
                return this;
            }
            return this.value.extract().join();
        }
    }, {
        key: 'empty',

        // Monoid (value must also be a Monoid)
        value: function empty() {
            return Id.of(this.value.empty ? this.value.empty() : this.value.constructor.empty());
        }
    }, {
        key: 'reduce',

        // Foldable
        value: function reduce(f, acc) {
            return f(acc, this.value);
        }
    }, {
        key: 'map',

        // Functor
        value: function map(f) {
            return Id.of(f(this.value));
        }
    }, {
        key: 'chain',

        // Chain
        value: function chain(f) {
            return f(this.value);
        }
    }, {
        key: 'extend',

        // Extend
        value: function extend(f) {
            return Id.of(f(this));
        }
    }, {
        key: 'extract',

        // Comonad
        value: function extract() {
            return this.value;
        }
    }, {
        key: 'toString',
        value: function toString() {
            return 'Id [' + this.value + ']';
        }
    }, {
        key: 'value',
        get: function get() {
            return this._value;
        }
    }], [{
        key: 'of',

        // Monad
        value: function of(a) {
            return new Id(a);
        }
    }]);

    return Id;
})();

//# sourceMappingURL=id-class-compiled.js.map