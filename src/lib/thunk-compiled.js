/**
 *
 *
 */
"use strict";

var __slice = Array.prototype.slice,
    __map = Array.prototype.map,
    __hasProp = Array.prototype.hasOwnProperty,
    __filter = Array.prototype.filter;

function variadic(fn) {
    var fnLength = fn.length;

    if (fnLength < 1) {
        return fn;
    } else if (fnLength === 1) {
        return function () {
            return fn.call(this, __slice.call(arguments, 0));
        };
    } else {
        return function () {
            var numberOfArgs = arguments.length,
                namedArgs = __slice.call(arguments, 0, fnLength - 1),
                numberOfMissingNamedArgs = Math.max(fnLength - numberOfArgs - 1, 0),
                argPadding = new Array(numberOfMissingNamedArgs),
                variadicArgs = __slice.call(arguments, fn.length - 1);

            return fn.apply(this, namedArgs.concat(argPadding).concat([variadicArgs]));
        };
    }
};

function Thunk(closure) {
    if (!(this instanceof Thunk)) return new Thunk(closure);

    this.closure = closure;
};
Thunk.prototype.force = function () {
    return this.closure();
};

function trampoline(fn) {
    var trampolined = variadic(function (args) {
        var result = fn.apply(this, args);

        while (result instanceof Thunk) {
            result = result.force();
        }

        return result;
    });
    trampolined.__trampolined_fn = fn;
    return trampolined;
};

var thunk = variadic(function (fn, args) {
    var context = this;
    if (fn.__trampolined_fn instanceof Function) {
        return new Thunk(function () {
            return fn.__trampolined_fn.apply(context, args);
        });
    } else return new Thunk(function () {
        return fn.apply(context, args);
    });
});

// ================================

//var thunk = function (fn) {
//    return function () {
//        var args = Array.prototype.slice.apply(arguments);
//        return function() { fn.apply(this, args); };
//    };
//};
//
//var trampoline = function(fun) {
//    return function( /*, args */) {
//        var args = Array.prototype.slice.apply(arguments);
//        var result = fun.apply(fun, args);
//        while (_.isFunction(result)) {
//            result = result();
//        }
//        return result;
//    };
//};

//var trampoline = function(fun) {
//    return function(args) {
//        var result = fun.apply(fun, args);
//        while (_.isFunction(result)) {
//            result = result();
//        }
//        return result;
//    }
//};

//var tailCall = function (fn, args) {
//    var context = this;
//    if (fn.__trampolined_fn instanceof Function) {
//        return new Thunk( function () {
//            return fn.__trampolined_fn.apply(context, args);
//        });
//    }
//    else return new Thunk( function () {
//        return fn.apply(context, args);
//    });
//};

//# sourceMappingURL=thunk-compiled.js.map