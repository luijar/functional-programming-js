"use strict";

function IO(IoEffectFn) {
    if (!_.isFunction(IoEffectFn)) {
        throw "IO Usage: function required";
    }
    this.effectFn = IoEffectFn;
}
IO.of = function (a) {
    return new IO(function () {
        return a;
    });
};
IO.from = function (fn) {
    return new IO(fn);
};
IO.prototype.map = function (fn) {
    var self = this;
    return new IO(function () {
        return fn(self.effectFn());
    });
};
IO.prototype.chain = function (f) {
    return f(this.effectFn());
};
IO.prototype.run = function () {
    return this.effectFn();
};

//# sourceMappingURL=io-compiled.js.map