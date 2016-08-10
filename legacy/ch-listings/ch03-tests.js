/**
 * Functional Programming in JavaScript
 *
 * Unit tests for Chapter 03 code
 *
 * Chains with Map, Reduce, and Filter
 *
 * Author: Luis Atencio
 */
"use strict";
QUnit.module( "Chapter 3" );
QUnit.test("Polymorphic functions", function (assert) {

    function Person(first, last, born, nationality) {
        this.firstname = first;
        this.lastname = last;
        this.born = born;
        this.nationality = nationality;
    }
    Person.prototype.getFullName = function () {
        return [this.firstname, this.lastname].join(' ');
    };
    Person.prototype.getBirthYear = function () {
        return this.born;
    };
    Person.prototype.toString = function () {
        return this.getFullName();
    };
    Person.prototype.getNationality = function () {
        return this.nationality;
    };

    function Student(first, last, born, nationality, studentId) {

        Person.call(this, first, last, born, nationality);

        this.studentId = studentId || '';
    }

    Student.prototype = Object.create(Person.prototype);
    Student.prototype.constructor = Student;
    Student.prototype.getStudentId = function () {
        return this.studentId;
    };

    var s1 = new Student('Alonzo', 'Church', 1903, 'American');
    var p1 = new Person('Haskell', 'Curry', 1900, 'American');
    var s2 = new Student('John', 'von Neumann', 1903, 'Hungarian');
    var p2 = new Person('Barkley', 'Rosser', 1907, 'Greek');

    var getFullName = function (p) {
        return p.getFullName();
    };

    var isAmerican = function (p) {
        return p.getNationality() === 'American';
    };

    var result = Lazy([s1, p1, s2, p2]).filter(isAmerican).map(getFullName).join(' and ');
    assert.equal(result, 'Alonzo Church and Haskell Curry');
});


QUnit.test("Pair", function (assert) {

    function Pair(a, b) {

        var _left = a;
        var _right = b;

        return {
            cons: function (a, b) {
                return Pair(a, b);
            },
            left: function () {
                return _left;
            },
            right: function () {
                return _right;
            },
            toArray: function () {
                return [_left, _right];
            }
        }
    }

    assert.ok(Pair().cons(2, 3).left(), 2);
    assert.ok(Pair(2, 3).left(), 2);
    assert.ok(Pair(2, 3).right(), 3);


    function Person(ssn, first, last) {
        this.social = ssn;
        this.firstname = first;
        this.lastname = last;
    }

    Person.prototype.getFullName = function () {
        return [this.firstname, this.lastname].join(' ');
    };
    Person.prototype.getSocial = function () {
        return this.social;
    };

    var p1 = new Person('123456781', 'Haskell', 'Curry');
    var p2 = new Person('123456782', 'Barkley', 'Rosser');

    var arr = [p1, p2];

    function findPersonWithSsn(arr, ssn) {
        for (var i = 0; i < arr.length; i++) {
            var person = arr[i];
            if (arr[i].social === ssn) {
                return Pair(ssn, person.getFullName());
            }
        }
        return null;
    }

    assert.equal(findPersonWithSsn(arr, '123456781').right(), 'Haskell Curry');
    assert.equal(findPersonWithSsn(arr, '123456782').right(), 'Barkley Rosser');
});


QUnit.test("Map 1", function (assert) {

    function Person(ssn, first, last) {
        this.social = ssn;
        this.firstname = first;
        this.lastname = last;
    }

    Person.prototype.getFullName = function () {
        return [this.firstname, this.lastname].join(' ');
    };
    Person.prototype.getSocial = function () {
        return this.social;
    };

    var p1 = new Person('123456781', 'Haskell', 'Curry');
    var p2 = new Person('123456782', 'Barkley', 'Rosser');
    var p3 = new Person('123456783', 'John', 'von Neumann');
    var p4 = new Person('123456784', 'Alonzo', 'Church');

    var result = [p1, p2, p3, p4].map(function (person) {
        return person.getFullName();
    });

    assert.equal(result[0], 'Haskell Curry');

});

QUnit.test("Map 1", function (assert) {

    var arr = [1, 2, 3, 4];

    function processArr() {
        function multipleBy10(val) {
            i = 10;
            return val * i;
        }

        for (var i = 0; i < arr.length; i++) {
            arr[i] = multipleBy10(arr[i]);
        }
    }

    var result = [1, 2, 3, 4].map(function (val) {
        return val * 10;
    });
    assert.equal(result[0], 10);
    assert.equal(result[1], 20);
    assert.equal(result[2], 30);
});

QUnit.test("Method Chaining 1", function (assert) {

    var person = new Person().setFirstname('Luis').setLastname('Atencio').setGender('M').setBirth(31);
    assert.equal(person.getFullName(), 'Luis Atencio');
    assert.equal(person.getBirth(), 31);
});

QUnit.test("Map 2", function (assert) {

    function Person(ssn, first, last) {
        this.social = ssn;
        this.firstname = first;
        this.lastname = last;
    }

    Person.prototype.getFullName = function () {
        return [this.firstname, this.lastname].join(' ');
    };
    Person.prototype.getSocial = function () {
        return this.social;
    };

    var p1 = new Person('123456781', 'Haskell', 'Curry');
    var p2 = new Person('123456782', 'Barkley', 'Rosser');
    var p3 = new Person('123456783', 'John', 'von Neumann');
    var p4 = new Person('123456784', 'Alonzo', 'Church');

    var toFullName = function (person) {
        return person.getFullName();
    };

    var result = [p1, p2, p3, p4].map(toFullName);

    assert.equal(result[0], 'Haskell Curry');

    result = [p1, p2, p3, p4].reverse().map(toFullName);

    assert.equal(result[0], 'Alonzo Church');

});


QUnit.test("Map 3", function (assert) {

    var getLetterGrade = function (grade) {
        if (grade >= 90) return 'A';
        if (grade >= 80) return 'B';
        if (grade >= 70) return 'C';
        if (grade >= 60) return 'D';
        return 'F';
    };

    var toLetterGrades = function (grades) {
        return _.map(grades, getLetterGrade);
    };

    var result = toLetterGrades([20, 98, 100, 73, 85, 50]);

    assert.equal(result[0], 'F');
});


QUnit.test("Reduce 1", function (assert) {

    function Person(first, last, nationality) {
        this.firstname = first;
        this.lastname = last;
        this.nationality = nationality;
    }

    Person.prototype.getFullName = function () {
        return [this.firstname, this.lastname].join(' ');
    };
    Person.prototype.toString = function () {
        return this.getFullName();
    };
    Person.prototype.getNationality = function () {
        return this.nationality;
    };

    var p1 = new Person('Alonzo', 'Church', 'American');
    var p2 = new Person('Haskell', 'Curry', 'American');
    var p3 = new Person('John', 'von Neumann', 'Hungarian');
    var p4 = new Person('Barkley', 'Rosser', 'Greek');

    var stats = [p1, p2, p3, p4].reduce(function (stat, person) {
        var nationality = person.getNationality();
        if (_.isUndefined(stat[nationality])) {
            stat[nationality] = 0;
        }
        stat[nationality] = stat[nationality] + 1;
        return stat;
    }, {});

    assert.equal(stats['American'], 2);
    assert.equal(stats['Greek'], 1);
});


QUnit.test("The Unix Philosophy", function (assert) {

    //tr 'A-Z' 'a-z' <names.in | uniq | sort
    var words = ['Functional', 'Programming', 'Curry', 'Memoization', 'Partial', 'Curry', 'Programming'];

    var tr = function (word) {
        return word.toLowerCase();
    };

    var unique = function (acc, value) {
        if (!_.includes(acc, value)) {
            acc.push(value);
        }
        return acc;
    };

    var result = _.chain(words).map(tr).uniq().sort().value();

    assert.equal(result[0], 'curry');
    assert.equal(result[1], 'functional');
});

QUnit.test("The Unix Philosophy (imperative version)", function (assert) {

    var words = ['Functional', 'Programming', 'Curry', 'Memoization', 'Partial', 'Curry', 'Programming'];
    var result = [];
    for (var i = 0; i < words.length; i++) {
        var w = words[i];
        if (w !== undefined && w !== null) {
            var lcw = w.toLowerCase();
            if (result.indexOf(lcw) < 0) {
                result.push(lcw);
            }
        }
    }
    result.sort();
    assert.equal(result[0], 'curry');
    assert.equal(result[1], 'functional');
});

QUnit.test("Group by", function (assert) {

    function Person(first, last, nationality) {
        this.firstname = first;
        this.lastname = last;
        this.nationality = nationality;
    }

    Person.prototype.getFullName = function () {
        return [this.firstname, this.lastname].join(' ');
    };
    Person.prototype.toString = function () {
        return this.getFullName();
    };
    Person.prototype.getNationality = function () {
        return this.nationality;
    };

    var p1 = new Person('Alonzo', 'Church', 'American');
    var p2 = new Person('Haskell', 'Curry', 'American');
    var p3 = new Person('John', 'von Neumann', 'Hungarian');
    var p4 = new Person('Barkley', 'Rosser', 'Greek');

    var stats = _.groupBy([p1, p2, p3, p4], function (person) {
        return person.getNationality();
    });

    assert.equal(stats['American'].length, 2);
    assert.equal(stats['Greek'].length, 1);
});

QUnit.test("Some", function (assert) {

    function isNotValid(val) {
        return _.isUndefined(val) || _.isNull(val);
    }

    var validate = function (args) {
        return !(Lazy(args).some(isNotValid));
    };

    assert.ok(!validate(['string', 0, null, undefined]));
    assert.ok(validate(['string', 0, {}]));
});


QUnit.test("Every", function (assert) {

    function isValid(val) {
        return !_.isUndefined(val) && !_.isNull(val);
    }

    var validate = function (args) {
        return Lazy(args).every(isValid);
    };

    assert.ok(!validate(['string', 0, null]));
    assert.ok(validate(['string', 0, {}]));
});

QUnit.test("Map/Reduce 1", function (assert) {

    function Person(first, last, nationality) {
        this.firstname = first;
        this.lastname = last;
        this.nationality = nationality;
    }

    Person.prototype.getFullName = function () {
        return [this.firstname, this.lastname].join(' ');
    };
    Person.prototype.toString = function () {
        return this.getFullName();
    };
    Person.prototype.getNationality = function () {
        return this.nationality;
    };

    var p1 = new Person('Alonzo', 'Church', 'American');
    var p2 = new Person('Haskell', 'Curry', 'American');
    var p3 = new Person('John', 'von Neumann', 'Hungarian');
    var p4 = new Person('Barkley', 'Rosser', 'Greek');


    var getNationality = function (person) {
        return person.getNationality();
    };

    var gatherStats = function (stat, nationality) {
        stat[nationality] = _.isUndefined(stat[nationality]) ? 1 : stat[nationality] + 1;
        return stat;
    };

    var stats = [p1, p2, p3, p4].map(_.property('nationality')).reduce(gatherStats, {});

    assert.equal(stats['American'], 2);
    assert.equal(stats['Greek'], 1);
});

QUnit.test("Lift with Every", function (assert) {

    function isValid(val) {
        return !_.isUndefined(val) && !_.isNull(val);
    }

    assert.ok(!(function () {
        return _(arguments).flatten().every(isValid);
    })(['string', 0, null]));

    assert.ok((function () {
        return _(arguments).flatten().every(isValid);
    })('string', 0, {}));
});

QUnit.test("Reduce Left-Right vs Right-Left", function (assert) {

    var result = _([1, 3, 4, 5]).reduce(_.add);
    var result2 = _([1, 3, 4, 5]).reduceRight(_.add);
    assert.equal(result, result2);

    function divide(a, b) {
        return a / b;
    }

    result = _([1, 3, 4, 5]).reduce(divide);
    result2 = _([1, 3, 4, 5]).reduceRight(divide);
    assert.ok(result !== result2);
});


QUnit.test("Filter 1", function (assert) {

    function Person(first, last, birthYear) {
        this.firstname = first;
        this.lastname = last;
        this.birthYear = birthYear;
    }

    Person.prototype.getFullName = function () {
        return [this.firstname, this.lastname].join(' ');
    };
    Person.prototype.toString = function () {
        return this.getFullName();
    };
    Person.prototype.getBirthYear = function () {
        return this.birthYear;
    };

    var p1 = new Person('Alonzo', 'Church', 1903);
    var p2 = new Person('Haskell', 'Curry', 1900);
    var p3 = new Person('John', 'von Neumann', 1903);
    var p4 = new Person('Barkley', 'Rosser', 1907);

    var wasBornIn = function (p, year) {
        return p.getBirthYear() === year;
    };

    var wasBornIn1903 = _.bind(wasBornIn, null, _, 1903);

    assert.equal(_([p1, p2, p3, p4]).filter(wasBornIn1903).size(), 2);
});


QUnit.test("Lodash chain", function (assert) {

    function Person(first, last, nationality) {
        this.firstname = first;
        this.lastname = last;
        this.nationality = nationality;
    }

    Person.prototype.getFullName = function () {
        return [this.firstname, this.lastname].join(' ');
    };
    Person.prototype.toString = function () {
        return this.getFullName();
    };
    Person.prototype.getNationality = function () {
        return this.nationality;
    };


    var p1 = new Person('Alonzo', 'Church', 'American');
    var p2 = new Person('Haskell', 'Curry', 'American');
    var p3 = new Person('John', 'von Neumann', 'Hungarian');
    var p4 = new Person('Barkley', 'Rosser', 'Greek');
    var p5 = new Person('David', 'Hilbert', 'German');
    var p6 = new Person('Alan', 'Turing', 'British');
    var p7 = new Person('Stephen', 'Kleene', 'American');

    var getNationality = function (person) {
        return person.nationality;
    };

    var gatherStats = function (stat, nationality) {
        if (_.isUndefined(stat[nationality])) {
            stat[nationality] = {'name': nationality, 'count': 0};
        }
        stat[nationality].count++;
        return stat;
    };

    var nationality = _.chain([p1, p2, p3, p4, p5, p6, p7])
        .map(getNationality)
        .reduce(gatherStats, {})
        .values()
        .sortBy('count')
        .reverse()
        .first()
        .value()
        .name;

    assert.equal(nationality, 'American');
});


QUnit.test("Lodash SQL", function (assert) {

    function Person(first, last, nationality, birth) {
        this.firstname = first;
        this.lastname = last;
        this.nationality = nationality;
        this.birth = birth;
    }

    Person.prototype.getFullName = function () {
        return [this.firstname, this.lastname].join(' ');
    };
    Person.prototype.toString = function () {
        return this.getFullName();
    };
    Person.prototype.getNationality = function () {
        return this.nationality;
    };
    Person.prototype.getBirth = function () {
        return this.birth;
    };

    var p1 = new Person('Alonzo', 'Church', 'American', 1903);
    var p2 = new Person('Haskell', 'Curry', 'American', 1900);
    var p3 = new Person('John', 'von Neumann', 'Hungarian', 1903);
    var p4 = new Person('Barkley', 'Rosser', 'Greek', 1907);
    var p5 = new Person('David', 'Hilbert', 'German', 1862);
    var p6 = new Person('Alan', 'Turing', 'British', 1912);
    var p7 = new Person('Stephen', 'Kleene', 'American', 1909);


    // SELECT p.firstname FROM Person
    // WHERE p.birth > 1903 and p.nationality IS NOT 'American'
    // GROUP BY p.firstname, p.birth

    _.mixin({
        'select': _.pluck,
        'from': _.chain,
        'where': _.filter,
        'groupBy': _.sortByOrder
    });

    var result =
        _.from([p1, p2, p3, p4, p5, p6, p7])
            .where(function (p) {
                return p.getBirth() > 1900 && p.getNationality() !== 'American'
            })
            .groupBy(['firstname', 'birth'])
            .select('firstname')
            .value();

    assert.ok(result.length > 0);

});


QUnit.test("Recursion 1", function (assert) {

    var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    var acc = 0;
    for (var i = 0; i < nums.length; i++) {
        acc += nums[i];
    }
    assert.equal(acc, 45);

    var result = _(nums).reduce(function (acc, curr) {
        return acc + curr;
    }, 0);
    assert.equal(acc, result);

    function add(arr) {
        var col = _(arr);
        if (col.isEmpty()) {
            return 0;
        }
        return col.first() + add(col.rest());
    }

    assert.equal(add(nums), 45);
});

QUnit.test("Lift function", function (assert) {

    var getLetterGrade = function (grade) {
        if (grade >= 90) return 'A';
        if (grade >= 80) return 'B';
        if (grade >= 70) return 'C';
        if (grade >= 60) return 'D';
        return 'F';
    };

    var arrayize = function (callback) {
        return function (arr) {
            return _.map(arr, callback);
        }
    };

    var toLetterGrades = arrayize(getLetterGrade);

    var result = toLetterGrades([20, 98, 100, 73, 85, 50]);

    assert.equal(result[0], 'F');
    assert.equal(result[1], 'A');
});


QUnit.test("Lift function", function (assert) {


    Array.prototype.customFilter = function (predicate, thisArg) {
        var idx = -1,
            len = this.length,
            result = [];

        while (++idx < len) {
            var value = this[idx];
            if (predicate.call(thisArg, value, idx, this)) {
                result.push(value);
            }
        }
        return result;
    };

    var result = [20, 98, 100, 73, 85, 50].customFilter(function (v) {
        return v < 50
    });

    assert.equal(result.length, 1);
});

QUnit.test("Chain 1", function (assert) {

    var names = ['alonzo church', 'alonzo church', 'stephen_kleene', 'Haskell curry', 'John Von Neumann'];
    var result = [];
    for (var i = 0; i < names.length; i++) {
        var n = names[i];
        if (n !== undefined && n !== null) {
            var ns = n.replace(/_/, ' ').split(' ');
            for (var j = 0; j < ns.length; j++) {
                var p = ns[j];
                p = p.charAt(0).toUpperCase() + p.slice(1);
                ns[j] = p;
            }
            if (result.indexOf(ns.join(' ')) < 0) {
                result.push(ns.join(' '));
            }
        }
    }
    result.sort();

    assert.equal(result[0], 'Alonzo Church');
    assert.equal(result[1], 'Haskell Curry');


    var result2 = _.chain(names).map((s) => s.replace(/_/, ' ')).uniq().map(_.startCase).sort().value();
    assert.equal(result2[0], 'Alonzo Church');
    assert.equal(result2[1], 'Haskell Curry');

    assert.equal(result2.length, 4);
    assert.ok(arrayEquals(result, result2));
});


QUnit.test("Recursion trees", function (assert) {

    function Person(first, last) {
        this.firstname = first;
        this.lastname = last;
    }

    Person.prototype.getFullName = function () {
        return [this.firstname, this.lastname].join(' ');
    };
    Person.prototype.toString = function () {
        return this.getFullName();
    };

    Array.prototype.copy = function () {
        return _.map(this, _.identity);
    };


    //var Node = function (val) {
    //    this.val = val;
    //    this.parent = null;
    //    this.children = [];
    //};
    //Node.prototype.isRoot = function () {
    //    return _.isUndefined(this.parent);
    //};
    //Node.prototype.getChildren = function () {
    //    return this.children;
    //};
    //Node.prototype.hasChildren = function () {
    //    return this.children.length > 0;
    //};
    //Node.prototype.get = function () {
    //    return this.val;
    //};
    //Node.prototype.append = function (child) {
    //    child.parent = this;
    //    this.children.push(child);
    //    return this;
    //};

    class Node {
        constructor(val) {
            this._val = val;
            this._parent = null;
            this._children = [];
        }

        isRoot() {
            return _.isUndefined(this._parent);
        }

        get children() {
            return this._children;
        }

        hasChildren() {
            return this._children.length > 0;
        }

        get value() {
            return this._val;
        }

        append(child) {
            child._parent = this;
            this._children.push(child);
            return this;
        };
    }

    var Tree = function (root) {
        this.root = root;

        var _visit = function (node, callback) {

            callback(node.value);

            if (!node.hasChildren()) {
                return; // end of path
            }

            _.map(node.children, function (c) {
                _visit(c, callback);
            });
        };

        var _arr = function (arr, node) {

            arr.push(node);

            _.map(node.children, function (n) {
                _arr(arr, n);
            });
            return arr;
        };

        this.traverse = function (f) {
            _visit(this.root, f);
        };

        this.traverseRoot = _.bind(_visit, this, this.root);

        this.flatten = function () {
            return _arr([], this.getRoot());
        };
    };
    Tree.prototype.getRoot = function () {
        return this.root;
    };

    var node = function (p) {
        return new Node(p);
    };
    var tree = function (r) {
        return new Tree(r);
    };

    var church = node(new Person('Alonzo', 'Church'));
    var rosser = node(new Person('Barkley', 'Rosser'));
    var kleene = node(new Person('Stephen', 'Kleene'));
    var turing = node(new Person('Alan', 'Turing'));
    var nelson = node(new Person('Nels', 'Nelson'));
    var constable = node(new Person('Robert', 'Constable'));
    var gandy = node(new Person('Robert', 'Gandy'));
    var mendelson = node(new Person('Elliot', 'Mendelson'));
    var sacks = node(new Person('Gerald', 'Sacks'));

    church = church.append(rosser).append(turing).append(kleene);
    kleene = kleene.append(nelson).append(constable);
    rosser = rosser.append(mendelson).append(sacks);
    turing = turing.append(gandy);

    var apprenticeship = tree(church);
    var result = false;
    apprenticeship.traverseRoot(function (p) {
        result = p !== null;
        console.log(p.getFullName());
    });

    var callback = _.bind(function (p, arr) {
        arr.push(p);
    }, null, _, []);

    var arr = apprenticeship.flatten();

    assert.equal(arr.length, 9);
});

QUnit.test("Lodash SQL", function (assert) {

    function Person(first, last, nationality, birth) {
        this.firstname = first;
        this.lastname = last;
        this.nationality = nationality;
        this.birth = birth;
    }

    Person.prototype.getFullName = function () {
        return [this.firstname, this.lastname].join(' ');
    };
    Person.prototype.toString = function () {
        return this.getFullName();
    };
    Person.prototype.getNationality = function () {
        return this.nationality;
    };
    Person.prototype.getBirth = function () {
        return this.birth;
    };

    var p1 = new Person('111-11-1234', 'Alonzo', 'Church', 'American');
    var p2 = new Person('111-11-1235', 'Haskell', 'Curry', 'American');
    var p3 = new Person('111-11-1236', 'John', 'von Neumann', 'Hungarian');
    var p4 = new Person('111-11-1237', 'Barkley', 'Rosser', 'Greek');

    var result = false;
    [p1, p2, p3, p4].forEach(function (person) {
        result = true;
        console.log(person.getFullName());
        assert.ok(result);
    });
});


QUnit.test("Map skips null", function (assert) {

    var result = _.map([1,undefined,3,null,5], _.identity);
    assert.equal(result.length, 5);
    assert.equal(result[3], null);
    assert.equal(result[1], null);
});
