"use strict";

function Rectangle(w, h) {

    var _height = h;
    var _width = w;

    return {
        getHeight: function getHeight() {
            return _height;
        },
        getWidth: function getWidth() {
            return _width;
        },
        toString: function toString() {
            return "Rectangle [height: " + _height + " width: " + _width + "] ";
        }
    };
}

function area(w, h) {
    return w * h;
}

function perimeter(w, h) {
    return 2 * (w + h);
}

var School = function School(name, address) {
    this.name = name;
    this.address = address;
};
School.prototype.getName = function () {
    return this.name;
};
School.prototype.getAddress = function () {
    return this.address;
};

var School2 = function School2(name, address) {
    this.name = Optional.ofNullable(name);
    this.address = Optional.ofNullable(address);
};
School2.prototype.getName = function () {
    return this.name;
};
School2.prototype.getAddress = function () {
    return this.school;
};

// A person's address (using optional)
var Address2 = function Address2(city, country) {

    this.city = city;
    this.country = country;

    this.getCity = function () {
        return this.city;
    };
    this.getCountry = function () {
        return this.country;
    };
    this.toString = function () {
        return "Address [city: " + this.city + " country: " + this.country + "]";
    };
};

// A person's address
var Address = function Address(st, city, zip, state, country) {
    this.street = st;
    this.city = city;
    this.country = country;
    this.zip = zip;
    this.state = state;

    this.getCity = function () {
        return this.city;
    };
    this.getCountry = function () {
        return this.country;
    };
    this.getZip = function () {
        return this.zip;
    };
    this.getStreet = function () {
        return this.street;
    };
    this.toString = function () {
        return "Address [city: " + this.city + " country: " + this.country + "]";
    };
};

// A person object (has Address)
var Person = function Person(first, last, gender, birth) {
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
        return "Person [firstname: " + this.firstname + "| lastname: " + this.lastname + "| gender: " + this.gender + "| address: " + this.address + "| friends: " + this.friends.length + "]";
    };
};

// Public methods
Person.prototype.getSsn = function () {
    return this.ssn;
};
Person.prototype.setSsn = function (ssn) {
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
    this.major = "Undeclared";
}
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.getSchool = function () {
    return this.school;
};
Student.prototype.setSchool = function (school) {
    this.school = school;
};
Student.prototype.getSchool = function () {
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
    var _location = location || "";

    return {
        code: function code() {
            return _code;
        },
        location: function location() {
            return _location;
        },
        fromString: function fromString(str) {
            var parts = str.split("-");
            return ZipCode(parts[0], parts[1]);
        },
        toString: function toString() {
            return _code + "-" + _location;
        }
    };
}

function Coordinate(lat, long) {
    var _lat = lat;
    var _long = long;

    return {
        latitude: function latitude() {
            return _lat;
        },
        longitude: function longitude() {
            return _long;
        },
        translate: function translate(dx, dy) {
            return Coordinate(_lat + dx, _long + dy);
        },
        toString: function toString() {
            return "(" + _lat + "," + _long + ")";
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
                throw new Error("NoSuchElementError");
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
            if (typeof fn == "function") {
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
                return "Optional<" + _value.constructor.name + ":" + typeof _value + "> " + _value;
            }
            return "Optional<null>";
        };
    }

    return {
        /**
         * Returns an empty Optional instance.
         */
        empty: function empty() {
            return Object.freeze(new Option());
        },
        /**
         * Returns an Optional with the specified present non-null value.
         * @param val
         */
        of: function of(val) {
            if (val === null) {
                throw new Error("NoSuchElementError");
            }
            return Object.freeze(new Option(val));
        },
        /**
         * Returns an Optional describing the specified value, if non-null, otherwise returns an empty Optional
         * @param val
         */
        ofNullable: function ofNullable(val) {
            var inst = val !== null ? this.of(val) : this.empty();
            return Object.freeze(inst);
        }
    };
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
        };
    }

    return {
        pack: function pack(value) {
            return new Just(value);
        }
    };
})();

var FunctionLogger = (function () {

    function isNative(fn) {
        return /\{\s*\[native code\]\s*\}/.test("" + fn);
    }

    function Just(value) {
        this.container = value;

        this.get = function () {
            return this.container;
        };
        this.map = function (fn) {
            var name = fn.name || "function";
            console.log("Function called: " + name);
            return FunctionLogger.pack(fn.call(isNative(fn) ? null : this, this.container));
        };
    }

    return {
        pack: function pack(value) {
            return new Just(value);
        }
    };
})();

var Tuple = function Tuple() {
    var prototype = Array.prototype.slice.call(arguments, 0);

    var _tuple = function _tuple() {

        var values = this.values = Array.prototype.slice.call(arguments, 0);

        // Check nulls
        if (values.some(function (val) {
            return val === null || val === undefined;
        })) {
            throw new ReferenceError("Tuples may not have any null values");
        }

        // Check arity
        if (values.length !== prototype.length) {
            throw new TypeError("Tuple arity does not math its prototype");
        }

        // Check types
        values.map(function (val, index) {
            this["_" + (index + 1)] = typeOf(prototype[index])(val);
        }, this);
        Object.freeze(this);
    };

    _tuple.prototype.toString = function () {
        return "(" + Object.keys(this).map(function (k) {
            return this[k];
        }, this).join(", ") + ")";
    };

    _tuple.prototype.values = function () {
        return this.values;
    };
    return _tuple;
};

var Money = Tuple(Number, String);

// Type Checks (curry it)
var typeOf = function typeOf(type) {
    return function (t) {
        if (R.is(type, t)) {
            return t;
        } else {
            throw new TypeError("Type mismatch. Expected [" + type + "] but found [" + typeof t + "]");
        }
    };
};

function log(obj) {
    if (console.log && obj) {
        console.log(obj.toString());
    }
    return obj; // good for composition
}

function curry2(fn) {
    return function (firstArg) {
        return function (secondArg) {
            return fn(firstArg, secondArg);
        };
    };
}

var logger = function logger(appender, layout, name, level, message) {
    var appenders = {
        "alert": new Log4js.JSAlertAppender(),
        "console": new Log4js.BrowserConsoleAppender()
    };
    var layouts = {
        "basic": new Log4js.BasicLayout(),
        "json": new Log4js.JSONLayout(),
        "xml": new Log4js.XMLLayout()
    };
    var appender = appenders[appender];
    appender.setLayout(layouts[layout]);
    var logger = new Log4js.getLogger(name);
    logger.addAppender(appender);
    logger.log(level, message, null);
};

var Store = function Store(setter, getter) {
    this.set = setter;
    this.get = getter;
    this.map = function (f) {
        return new Store(R.compose(f, this.set), this.get);
    };
};

var Lens = function Lens(f) {
    this.run = function (obj) {
        return f(obj);
    };
};
Lens.prototype.compose = function (b) {
    var a = this;
    return new Lens(function (target) {
        var c = b.run(target),
            d = a.run(c.get());
        return new Store(R.compose(c.set, d.set), d.get);
    });
};

Lens.prototype.andThen = function (b) {
    return b.compose(this);
};

function objectLens(prop) {
    return new Lens(function (o) {
        return new Store(function (s) {
            var r = {},
                k;
            for (k in o) {
                r[k] = o[k];
            }
            r[prop] = s;
            return r;
        }, function () {
            return o[prop];
        });
    });
}

function splat(fn) {
    return function (list) {
        return Array.prototype.map.call(list, fn);
    };
}

var Wrapper = function Wrapper(val) {
    this.val = val;

    this.get = function () {
        return this.val;
    };
};
Wrapper.prototype.map = function (f) {
    if (this.val !== null) {
        return f(this.val);
    }
};
Wrapper.prototype.fmap = function (f) {
    if (this.val !== null) {
        return wrap(f(this.val));
    }
};

// helper function
var wrap = function wrap(val) {
    return new Wrapper(val);
};

function arrayEquals(arr1, arr2) {
    return !arr1.some(function (val, idx) {
        return arr2[idx] !== val;
    });
}

//
//
//// Methods
//Lens.id = function() {
//return Lens(function(target) {
//return Store(
//C.identity,
//function() {
//return target;
//}
//);
//});
//};
//Lens.prototype.compose = function(b) {
//var a = this;
//return Lens(function(target) {
//var c = b.run(target),
//d = a.run(c.get());
//return Store(
//C.compose(c.set)(d.set),
//d.get
//);
//});
//};
//Lens.prototype.andThen = function(b) {
//return b.compose(this);
//};
//Lens.prototype.toPartial = function() {
//var self = this;
//return PartialLens(function(target) {
//return Option.Some(self.run(target));
//});
//};
//Lens.objectLens = function(property) {
//return Lens(function(o) {
//return Store(
//function(s) {
//var r = {},
//k;
//for(k in o) {
//r[k] = o[k];
//}
//r[property] = s;
//return r;
//},
//function() {
//return o[property];
//}
//);
//});
//};
//Lens.arrayLens = function(index) {
//return Lens(function(a) {
//return Store(
//function(s) {
//var r = a.concat();
//r[index] = s;
//return r;
//},
//function() {
//return a[index];
//}
//);
//});
//};
//*/
/* types */ /* values */

//# sourceMappingURL=common-compiled.js.map