/**
 * Functional Programming in JavaScript
 *
 * Unit tests for Chapter 08 generators code
 *
 * Promises and Event Handling
 *
 * Author: Luis Atencio
 */
"use strict";
QUnit.module( "Chapter 8");

QUnit.test("Generator 1", function (assert) {

    function *addGenerator() {
        var i = 0;
        while (true) {
            i += yield i;
        }
    }
    var adder = addGenerator();
    assert.equal(adder.next().value, 0)
    assert.equal(adder.next(5).value, 5);
});

QUnit.test("Generator 2", function (assert) {

    function *range(start, finish) {
        for(let i = start; i < finish; i++) {
            yield i;
        }
    }

    var r = range(0, Number.POSITIVE_INFINITY);
    assert.equal(r.next().value, 0)
    assert.equal(r.next().value, 1);
    assert.equal(r.next().value, 2);


});

QUnit.test("Recursion trees with generators", function (assert) {


    var Scheduler = (function () {
        var delayedFn = _.bind(setTimeout, undefined, _, _);

        return {
            delay5:  _.partial(delayedFn, _, 5),
            delay10: _.partial(delayedFn, _, 10),
            delay:   _.partial(delayedFn, _, _)
        };
    })();

    var promiseDemo = new Promise(function(resolve, reject) {
        Scheduler.delay(function () { //#A
            console.log('Executing long running operation!');
            resolve("Done!");  //#B
        }, 1000);
    });

    promiseDemo.then(function(status) {
        console.log(status);
    });


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

    var Node = function (val) {
        this.val = val;
        this.parent = null;
        this.children = [];
    };
    Node.prototype.isRoot = function () {
        return _.isUndefined(this.parent);
    };
    Node.prototype.getChildren = function () {
        return this.children;
    };
    Node.prototype.hasChildren = function () {
        return this.children.length > 0;
    };
    Node.prototype.get = function () {
        return this.val;
    };
    Node.prototype.append = function (child) {
        child.parent = this;
        this.children.push(child);
        return this;
    };

    var Tree = function (root) {
        this.root = root;

        var _visit = function (node, callback) {

            callback(node.get());

            if (!node.hasChildren()) {
                return; // end of path
            }

            _.map(node.getChildren(), function (c) {
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

    function* TreeTraversal(node) {
        yield node.get();
        if (node.hasChildren()) {
            for(let c of node.getChildren()) {
                yield* TreeTraversal(c);
            }
        }
    }

    for(let person of TreeTraversal(church)) {
        console.log(person.getFullName());
        assert.ok(person !== null);
    }

    apprenticeship.traverseRoot(function (p) {
        result = p !== null;
    });

    var callback = _.bind(function (p, arr) {
        arr.push(p);
    }, null, _, []);

    var arr = apprenticeship.flatten();

    assert.equal(arr.length, 9);
});