/*

 Enhances functions with the capability of "Memoization".

 Author: Luis Atencio
 */
"use strict";

(function () {

    // Helper functions //
    var isNumeric = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n) && (n - parseFloat(n) + 1) > 0;
    };

    var isString = function (s) {
        return toString.call(s) == '[object String]';
    };

    Function.prototype.memoized = function (key) {

        if (this.length === 0) {
            console.log("Cannot memoize function call with empty arguments");
            return;
        }
        else {
            // Handle identifiable objects
            if (key.getId && (typeof key.getId === 'function')) {
                // Extract objs ID
                key = key.getId();
            }
            else {
                // Last resort, handle objects by JSON-stringifying them
                if (!isNumeric(key) && !isString(key)) {
                    // stringify key
                    key = JSON.stringify(key);
                }
            }
        }

        // Create a local cache
        this._cache = this._cache || {};
        var val = this._cache[key];

        if (val === undefined || val === null) {
            //alert("Cache miss, apply function");
            console.log("Cache miss");
            val = this.apply(this, arguments);
            this._cache[key] = val;
        }
        else {
            console.log("Cache hit");
        }
        return val;
    };

    // Enhance Function prototypes

    // Provide ability for functions to memoize (or be proxied)
    Function.prototype.memoize = function () {

        var fn = this;

        if (fn.length === 0 || fn.length > 1)
            return fn;  // only handle functions with a single formal argument

        return function () {
            return fn.memoized.apply(fn, arguments);
        };
    };
}).call(this);
