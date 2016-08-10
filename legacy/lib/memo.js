/*

 Enhances functions with the capability of "Memoization".

 Author: Luis Atencio
 */
"use strict";

(function () {

    Function.prototype.memoized = function () { // #A
        var key = JSON.stringify(arguments); // #B
        this._cache = this._cache || {};   // #C
        var val = this._cache[key];  // #D

        if (val === undefined || val === null) {
            val = this.apply(this, arguments); // #E
            this._cache[key] = val;  // #F
        }
        return val;
    };

    Function.prototype.memoize = function () {  // #G
        var fn = this;

        if (fn.length === 0 || fn.length > 1) {
            return fn; // #H
        }
        return function () {
            return fn.memoized.apply(fn, arguments); // #I
        };
    };

}).call(this);
