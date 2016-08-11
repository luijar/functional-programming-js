/**
 * Custom IO Monad class used in FP in JS book
 * Author: Luis Atencio
 */
class IO {
  constructor(effect) {
    if (!_.isFunction(effect)) {
      throw 'IO Usage: function required';
    }  
    this.effect = effect;
  }

  static of(a) {
    return new IO( () => a );
  }
  
  static from(fn) {
    return new IO(fn);
  }
  
  map(fn) {
    var self = this;
    return new IO(function () {
      return fn(self.effect());
    });
  }

   chain(fn) {
    return fn(this.effect());
  }
  
  run() {
    return this.effect();
  }
}

// Helper functions
const read = function (document, id) {
  return function () {
    return document.querySelector(`${id}`).innerHTML;
  };
};

const write = function(document, id) {
  return function(val) {
    return document.querySelector(`${id}`).innerHTML = val;
  };
};

const readDom = _.partial(read, document);
const writeDom = _.partial(write, document);

// Run program
const changeToStartCase =
  IO.from(readDom('#student-name')).
    map(_.startCase).
    map(writeDom('#student-name'));

changeToStartCase.run(); // this will start case the content within the DOM element

