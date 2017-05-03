/**
 * IO Monad class
 * Author: Luis Atencio
 */
const _ = require('lodash');

exports.IO = class IO {

  constructor(effect) {
    if (!_.isFunction(effect)) {
      throw 'IO Usage: function required';
    }  
    this.effect = effect;
  }

  static of(a) {    
    return new exports.IO( () => a );
  }
  
  static from(fn) {
    return new exports.IO(fn);
  }
  
  map(fn) {
    return new IO(() => fn(this.effect()));
  }

   chain(fn) {
    return fn(this.effect());
  }
  
  run() {    
    return this.effect();
  }
};