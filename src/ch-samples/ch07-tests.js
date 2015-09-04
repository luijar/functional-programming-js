/**
 * Functional Programming in JavaScript
 *
 * Unit tests for Chapter 07 code
 *
 * Optimizations
 *
 * Author: Luis Atencio
 */

"use strict";
QUnit.module( "Chapter 7" );
QUnit.test("Lazy and shortcut fusion", function (assert) {

    var square = (x) => Math.pow(x, 2);
    var even = (x) => x % 2 === 0;

    var result = _.chain(_.range(200))
        .map(R.compose(R.tap(() => console.log('Mapping')), square))
        .filter(R.compose(R.tap(() => console.log('then filtering')), even))
        .take(3)
        .value();

    assert.ok(result.length === 3);
});


var start = function (name) {
    return function () {
        console.time(name);
    }
};

var end = function (name) {
    return function () {
        console.timeEnd(name);
    }
};

QUnit.test("Memoization with recursion", function (assert) {

    var fib = (function (x) {
        if(x < 2) return 1; else return fib(x-1) + fib(x-2);
    }).memoize();
    var runFib = IO.of(200).map(R.tap(start('fib'))).map(fib).map(R.tap(end('fib')));
    assert.equal(runFib.run(), 4.53973694165308e+41);  // 7.341ms
    assert.equal(runFib.run(), 4.53973694165308e+41);  // 0.016ms
});

QUnit.test("Memoization with md5", function (assert) {

    var m_md5 = md5.memoize();

    var runMd5 = IO.of('Hello Haskell!').map(R.tap(start('md5'))).map(m_md5).map(R.tap(end('md5')));
    assert.equal(runMd5.run(), '6aa2f515697acb872ea5c84fadb79c96');
    assert.equal(runMd5.run(), '6aa2f515697acb872ea5c84fadb79c96');
});

QUnit.test("Memoization with md5 2", function (assert) {

    var m_md5 = md5.memoize();

    var runMd5 = IO.of('We should forget about small efficiencies, say about 97% of the time... premature optimization ' +
        'is the root of all evil. Yet we should not pass up our opportunities in that critical 3%')
            .map(R.tap(start('md5_2'))).map(m_md5).map(R.tap(end('md5_2')));
    assert.equal(runMd5.run(), '3112dc6f7b13d8a5cba99a9b7064f3ca');
    assert.equal(runMd5.run(), '3112dc6f7b13d8a5cba99a9b7064f3ca');
});


QUnit.test("Memoization with performance API", function (assert) {

    var m_md5 = md5.memoize();

    var call = function (fn, input) {
        return () => fn(input);
    };

    var p_start = function () {
        return performance.now();
    };


    var p_end = function (start) {
        const end = performance.now();
        return (end - start).toFixed(3);
    };

    console.log('Measuring with performance API');
    var runMd5 = IO.of(p_start())
        .map(R.tap(call(m_md5, 'We should forget about small efficiencies, say about 97% of the time... premature optimization ' +
                 'is the root of all evil. Yet we should not pass up our opportunities in that critical 3%')))
        .map(p_end);

    assert.ok(runMd5.run()  > 0);
});


QUnit.test("Memoization Test (isPrime)", function (assert) {

    var isPrime = (function (num) {
        var prime = num !== 1;
        for (var i = 2; i < num; i++) {
            if (num % i == 0) {
                prime = false;
                break;
            }
        }
        return prime;
    }).memoize();

    assert.ok(isPrime(2), '2 is prime!');
    assert.ok(isPrime(3), '3 is prime!');
    assert.ok(isPrime(5), '5 is prime!');
    assert.ok(isPrime(17), '17 is prime!');
    assert.ok(!isPrime(6), '6 is not prime!');
});

QUnit.test("Memoization Test (factorial)", function (assert) {


    //var factorial = (n) => n === 0 ? 1 : (n * factorial(n - 1));
    function factorial(num)
    {
        // If the number is less than 0, reject it.
        if (num < 0) {
            return -1;
        }
        // If the number is 0, its factorial is 1.
        else if (num == 0) {
            return 1;
        }
        // Otherwise, call this recursive procedure again.
        else {
            return (num * factorial(num - 1));
        }
    }

    start('factorial')();
    var result = factorial(100);
    end('factorial')();
    assert.equal(result, 9.33262154439441e+157);
});


QUnit.test("Memoization Test (factorial) 2", function (assert) {

    var factorial = ((n) => {
        if(n === 0)  return 1; else { return (n * factorial(n - 1))}
    }).memoize();

    start('factorial no memo')();
    var result = factorial(100);
    end('factorial no memo')();
    assert.equal(result, 9.33262154439441e+157);

    start('factorial with memo')();
    result = factorial(101);
    end('factorial with memo')();
    assert.equal(result, 9.425947759838354e+159);
});


QUnit.test("Factorial TCO", function (assert) {

    var factorial = (n, current = 1) => (n === 0) ? current : factorial(n - 1, n * current);

    var result = factorial(100);
    assert.equal(result, 9.332621544394418e+157);

    result = factorial(101);
    assert.equal(result, 9.42594775983836e+159);
});

QUnit.test("Sum TCO", function (assert) {

    function sum(arr) {
        var list = _(arr);
        if(list.isEmpty()) {
            return 0;
        }
        return list.head() + sum(list.tail());
    }


    var result = sum([1,2,3]);
    assert.equal(result, 6);


    var sum2 =  function (arr, acc = 0) {
        var list = _(arr);
        if(list.isEmpty()) {
            return acc;
        }
        return sum2(list.tail(), acc +  list.head());
    };

    var result2 = sum2([1,2,3,4,5,6,7,8,9]);
    assert.equal(result2, 45);
});


QUnit.test("Factorial TCO looping", function (assert) {

    var factorial = function (n, current = 1) {
        if(n === 0) return 1;
        return factorial(n - 1, n * current); // it will eliminated
    };

    var result = factorial(100);
    assert.equal(result, 1);

    var factorial2 = function (n) {
        var result = 1;
        for(let x = n; x > 1; x--) {
            result *= x;
        }
        return result;
    }
    result = factorial2(5);
    assert.equal(result, 120);

    result = factorial2(0);
    assert.equal(result, 1);
});


QUnit.test("Lazy eval", function (assert) {

    var student = {};
    var createNewStudent = function () {

    };
    Either.of(student).getOrElse(createNewStudent());

    assert.equal([2+1, 3*2, 1/0 , 5-4].length, 4);
});

QUnit.test("Trampoline and thunk", function (assert) {

    function factorial (n) {

        var factorial_t = trampoline(function myself (n, acc) {
            return n === 0 ? acc : thunk(myself, n - 1, acc * n);
        });
        return factorial_t(n, 1);
    };

    var result = factorial(5);
    assert.equal(result, 120);
});

//QUnit.test("Curried vs non-curried", function (assert) {
//
//    function curry2(fn) {
//        return function(secondArg) {
//            return function(firstArg) {
//                return fn(firstArg, secondArg);
//            };
//        };
//    }
//
//    var add = function (a, b) {
//        return a + b;
//    };
//
//    var c_add = R.curry(add);
//    var input = _.range(80000);
//
//    start('non_curried_add')();
//    var result = addAll(input, add); //->511993600000000
//    end('non_curried_add')();
//
//    //start('curried_add')();
//    //addAll(input, c_add); //-> browser halts
//    //end('curried_add')();
//
//    function addAll(arr, fn) {
//        let result= 0;
//        for(let i = 0; i < arr.length; i++) {
//            for(let j = 0; j < arr.length; j++) {
//                result += fn(arr[i], arr[j]);
//            }
//        }
//        return result;
//    }
//
//    assert.equal(result, 511993600000000);
//});


//QUnit.test("Measure stack size", function (assert) {
//    function inc(i = 1) {
//        console.log(i);
//        inc(++i);
//    }
//    inc();
//});
//
