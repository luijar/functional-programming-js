function Rectangle(w, h) {

    var _height = h;
    var _width = w;

    return {
        getHeight: function () {
            return _height;
        },
        getWidth: function () {
            return _width;
        },
        toString: function () {
            return "Rectangle [height: " + _height + " width: " + _width + "] ";
        }
    }
}

function area(w, h) {
    return w * h;
}

function perimeter(w, h) {
    return 2 * (w + h);
}

// A person's address
var Address = function (st, city, zip, state, country) {
    var _city = city;
    var _country = country;
    var _zip = zip;

    this.getCity = function () {
        return _city;
    };
    this.getCountry = function () {
        return _country;
    };
    this.getZip = function () {
        return _zip;
    };
    this.toString = function () {
        return 'Address [city: ' + _city + ' country: ' + _country + ']';
    };
};

// A person object (has Address)
var Person = function (first, last, gender, birth) {
    // private instance variables
    this.ssn = 0;
    this.firstname = first;
    this.lastname = last;
    this.gender = gender;
    this.friends = [];
    this.address = null;
    this.birth = birth || 0;

    // Exposed (privileged) methods
    this.toString = function () {
        return 'Person [firstname: ' + this.firstname + '| lastname: ' + this.lastname +
            '| gender: ' + this.gender + '| address: ' + this.address + '| friends: ' + this.friends.length + ']';
    };
};

// Public methods
Person.prototype.getSsn = function () {
    return this.ssn;
};
Person.prototype.setSsn = function(ssn) {
    var p = new Person(this.firstname, this.lastname, this.gender, this.birth);
    p.ssn = ssn;
    return p;
};
Person.prototype.getFirstname = function () {
    return this.firstname;
};
Person.prototype.setFirstname = function (fname) {
    return new Person(fname, this.lastname, this.gender, this.birth);
};
Person.prototype.getLastName = function () {
    return this.lastname;
};
Person.prototype.setLastname = function (lname) {
    return new Person(this.firstname, lname, this.gender, this.birth);
};
Person.prototype.getFullName = function () {
    return [this.firstname, this.lastname].join(" ");
};
Person.prototype.getAddress = function () {
    return this.address;
};
Person.prototype.setAddress = function (city, country) {
    var p = new Person(this.firstname, this.lastname, this.gender, this.birth);
    p.address = new Address(null, city, null, null, country);
    return p;
};
Person.prototype.getFriends = function () {
    return this.friends;
};
Person.prototype.isLonely = function () {
    return this.friends.length === 0;
};
Person.prototype.countFriends = function () {
    return this.friends.length;
};
Person.prototype.addFriend = function (f) {
    this.friends.push(f);
};
Person.prototype.getFriendsBy = function (pred) {
    return this.friends.filter(pred, this);
};
Person.prototype.getBirth = function () {
    return this.birth;
};
Person.prototype.setBirth = function (b) {
    return new Person(this.firstname, this.lastname, this.gender, b);
};
Person.prototype.getGender = function () {
    return this.gender;
};
Person.prototype.setGender = function (g) {
    return new Person(this.firstname, this.lastname, g, this.birth);
};

function Student(first, last, school) {
    Person.call(this, first, last);
    this.school = school;
    this.major = 'Undeclared';
}
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.getSchool = function() {
  return this.school;
};
Student.prototype.setMajor = function (m) {
    return this.major = m;
};
Student.prototype.getMajor = function () {
  return this.major;
};
Student.prototype.getId = function () {
    return this.id;
};

function ZipCode(code, location) {
    var _code = code;
    var _location = location || '';

    return {
        code: function () {
            return _code;
        },
        location: function () {
            return _location;
        },
        fromString: function (str) {
            var parts = str.split('-');
            return ZipCode(parts[0], parts[1]);
        },
        toString: function () {
            return _code + '-' + _location;
        }
    };
}


function Coordinate(lat, long) {
    var _lat = lat;
    var _long = long;

    return {
        latitude: function () {
            return _lat;
        },
        longitude: function () {
            return _long;
        },
        translate: function (dx, dy) {
            return Coordinate (_lat + dx, _long + dy);
        },
        toString: function () {
            return '(' + _lat + ',' + _long + ')';
        }
    };
}


/**
 * Pair class
 *
 * @param a Left side
 * @param b Right side
 * @constructor
 */

"use strict";
function Pair(a, b) {

    this.left = a;
    this.right = b;

    this.asArray = function () {
        return [this.left, this.right];
    };
}
Pair.prototype.getLeft = function () {
    return this.left;
};
Pair.prototype.getRight = function () {
    return this.right;
};

/**
 * Either class for error handling.
 *
 * It has a private constructor, so use functions Either.left(..) or Either.right(..) to instantiate it.
 *
 * Downside is that 'instanceof' and 'typeof' don't return 'Either'
 */
var Either = (function () {

    // private constructor
    function Either(a, b) {
        var _left = a;
        var _right = b;

        // Either will inherit getLeft and getRight from Pair
        Pair.call(this, _left, _right);

        // public methods
        this.isLeft = function () {
            return _left !== undefined && _left !== null;
        };

        this.isRight = function () {
            return _right !== undefined && _right !== null;
        };
    }

    Either.prototype = Object.create(Pair.prototype);
    Either.prototype.constructor = Either;

    // Static Factory methods
    return {
        left: function (a) {
            return Object.freeze(new Either(a, null));
        },
        right: function (b) {
            return Object.freeze(new Either(null, b));
        }
    }
})();

/**
 * A container object which may or may not contain a non-null value. If a value is present, isPresent() will return true and get() will return the value.
 * Additional methods that depend on the presence or absence of a contained value are provided, such as getOrElse() (return a default value if value not present) and ifPresent() (execute a block of code if the value is present).
 * @type {Optional|*}
 */
var Optional = (function () {

    // private constructor
    function Option(val) {
        var _value = val || null;

        // public methods
        /**
         * If a value is present, and the value matches the given predicate,
         * return an Optional describing the value, otherwise return an empty Optional.
         */
        this.filter = function (pred) {

            if (!this.isPresent()) {
                return this;
            }
            return pred(_value) ? this : Optional.empty();
        };

        /**
         * If a value is present in this Optional, returns the value, otherwise throws NoSuchElementException.
         */
        this.get = function () {
            if (!this.isPresent()) {
                throw new Error('NoSuchElementError');
            }
            return _value;
        };

        /**
         * Return true if there is a value present, otherwise false.
         */
        this.isPresent = function () {
            return _value !== null;
        };

        /**
         * If a value is present, apply the provided mapping function to it,
         * and if the result is non-null, return an Optional describing the result.
         */
        this.map = function (fn) {
            if (!this.isPresent()) {
                return Optional.empty();
            }
            if (typeof fn == 'function') {
                return Optional.ofNullable(fn.call(_value));
            }
            return Optional.ofNullable(_value[fn].call(_value));
        };

        /**
         * Return the value if present, otherwise invoke other and return the result of that invocation.
         */
        this.getOrElse = function (other) {
            return _value !== null ? _value : other;
        };

        /**
         * Return the contained value, if present, otherwise throw an exception to be created by the provided supplier.
         */
        this.orElseThrow = function (e) {
            if (_value !== null) {
                return _value;
            }
            throw e;
        };

        /**
         * String representation of the Optional's value
         * @returns {string}
         */
        this.toString = function () {
            if (_value !== null) {
                return 'Optional<' + _value.constructor.name + ':' + typeof _value + '> ' + _value;
            }
            return 'Optional<null>';
        };
    }

    return {
        /**
         * Returns an empty Optional instance.
         */
        empty: function () {
            return Object.freeze(new Option());
        },
        /**
         * Returns an Optional with the specified present non-null value.
         * @param val
         */
        of: function (val) {
            if (val === null) {
                throw new Error('NoSuchElementError');
            }
            return Object.freeze(new Option(val));
        },
        /**
         * Returns an Optional describing the specified value, if non-null, otherwise returns an empty Optional
         * @param val
         */
        ofNullable: function (val) {
            var inst = val !== null ? this.of(val) : this.empty();
            return Object.freeze(inst);
        }
    }
})();



/**
 * Optional Pair. Derives from Pair but provides Optional left and right values
 * @param a
 * @param b
 * @constructor
 */
function OptionalPair(a, b) {
    Pair.call(this, Optional.of(a), Optional.of(b));
}
OptionalPair.prototype = Object.create(Pair.prototype);
OptionalPair.prototype.constructor = OptionalPair;

/**
 * Null-safe pair class
 * @param a
 * @param b
 * @constructor
 */
function SafePair(a, b) {
    Pair.call(this, Optional.ofNullable(a), Optional.ofNullable(b));
}
SafePair.prototype = Object.create(Pair.prototype);
SafePair.prototype.constructor = SafePair;


var Only = (function () {

    function Just(value) {
        this.container = value;

        this.get = function () {
            return this.container;
        };
        this.map = function (fn) {
            return fn.call(this, this.container);
        }
    }

    return {
        pack: function (value) {
            return new Just(value);
        }
    }
})();


var FunctionLogger = (function () {

    function isNative(fn) {
        return (/\{\s*\[native code\]\s*\}/).test('' + fn);
    }

    function Just(value) {
        this.container = value;

        this.get = function () {
            return this.container;
        };
        this.map = function (fn) {
            var name = fn.name || 'function';
            console.log('Function called: ' + name);
            return FunctionLogger.pack(fn.call(isNative(fn) ? null : this,
                this.container));
        }
    }

    return {
        pack: function (value) {
            return new Just(value);
        }
    }
})();

var Tuple = function( /* types */ ) {
    var prototype = Array.prototype.slice.call(arguments, 0);

    var _T =  function( /* values */ ) {

        var values = Array.prototype.slice.call(arguments, 0);

        // Check nulls
        if(values.some(function(val){ return val === null || val === undefined})) {
            throw new ReferenceError('Tuples may not have any null values');
        }

        // Check arity
        if(values.length !== prototype.length) {
            throw new TypeError('Tuple arity does not math its prototype');
        }

        // Check types
        values.map(function(val, index) {
            this['_' + (index + 1)] = typeOf(prototype[index])(val);
        }, this);
        Object.freeze(this);
    };

    _T.prototype.toString = function() {
        return '(' + Object.keys(this).map(function(k) {
                return this[k];
            }, this).join(', ') + ')';
    };
    return _T;
};


// Type Checks (curry it)
var typeOf = function(type) {
    return function(t) {
        var _type =({}).toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        if(_type === type) {
            return t;
        }
        else {
            throw new TypeError('Type mismatch. Expected [' + type + '] but found [' + _type + ']');
        }
    }
};

function log(str) {
    if(console.log) {
        console.log(str);
    }
}
