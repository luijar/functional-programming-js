/**
  Chapter 3 code listings
  Author: Luis Atencio
*/

"use strict";

const _ = require('lodash');
const R = require('ramda');

const Person = require('../../model/Person.js').Person;
const Address = require('../../model/Address.js').Address;

var p1 = new Person('111-11-1111', 'Haskell', 'Curry', 1900, new Address('US'));
var p2 = new Person('222-22-2222', 'Barkley', 'Rosser', 1907, new Address('Greece'));
var p3 = new Person('333-33-3333', 'John', 'von Neumann', 1903, new Address('Hungary'));
var p4 = new Person('444-44-4444', 'Alonzo', 'Church', 1903, new Address('US'));

var persons = [p1, p2, p3, p4];

describe('Chapter 3', function () {

	test("Understanding reduce", function () {
		let result = _(persons).reduce((stat, person) => {
			const country = person.address.country;
			stat[country] = _.isUndefined(stat[country]) ? 1 :
				stat[country] + 1;
			return stat;
		}, {});

		expect(result).toEqual(
			{
				'US': 2,
				'Greece': 1,
				'Hungary': 1
			}
		);

	});

	test("Combining map and reduce", function () {
		const getCountry = person => person.address.country;
		const gatherStats = (stat, criteria) => {
			stat[criteria] = _.isUndefined(stat[criteria]) ? 1 :
				stat[criteria] + 1;
			return stat;
		};
		let result = _(persons).map(getCountry).reduce(gatherStats, {});
		expect(result).toEqual({ US: 2, Greece: 1, Hungary: 1 });
	});


	test("Combining map and reduce with lenses", function () {
		const cityPath = ['address', 'city'];
		const cityLens = R.lens(R.path(cityPath), R.assocPath(cityPath));
		const gatherStats = (stat, criteria) => {
			stat[criteria] = _.isUndefined(stat[criteria]) ? 1 :
				stat[criteria] + 1;
			return stat;
		};

		let result = _(persons).map(R.view(cityLens)).reduce(gatherStats, {});
		expect(result).toEqual({ null: 4 });	// TODO
	});

	test("Valid or not valid", function () {
		const isNotValid = val => _.isUndefined(val) || _.isNull(val);
		const notAllValid = args => _(args).some(isNotValid);
		expect(notAllValid(['string', 0, null, undefined])).toBeTruthy() //-> false
		expect(!notAllValid(['string', 0, {}])).toBeTruthy();             //-> true

		const isValid = val => !_.isUndefined(val) && !_.isNull(val);
		const allValid = args => _(args).every(isValid);
		expect(!allValid(['string', 0, null])).toBeTruthy(); //-> false
		expect(allValid(['string', 0, {}])).toBeTruthy();    //-> true
	});

	test("Introducing filter", function () {
		const isValid = val => !_.isUndefined(val) && !_.isNull(val);
		const fullname = person => person.fullname;
		let result = _([p1, p2, p3, null]).filter(isValid).map(fullname).value();
		expect(result.length).toEqual(3);
	});

	test("People born in 1903", function () {
		const bornIn1903 = person => person.birthYear === 1903;
		const fullname = person => person.fullname;

		let result = _(persons).filter(bornIn1903).map(fullname).join(' and ');
		expect(result).toEqual('John von Neumann and Alonzo Church');
	});

	test("Array processing with Lodash", function () {
		let names = ['alonzo church', 'Haskell curry', 'stephen_kleene',
			'John Von Neumann', 'stephen_kleene'];

		const isValid = val => !_.isUndefined(val) && !_.isNull(val);

		var result = _.chain(names).filter(isValid).map(s => s.replace(/_/, ' '))
			.uniq().map(_.startCase).sort().value();

		expect(result).toEqual(['Alonzo Church', 'Haskell Curry', 'John Von Neumann', 'Stephen Kleene']);
	});


	test("Gather stats", function () {
		const gatherStats = function (stat, country) {
			if (!isValid(stat[country])) {
				stat[country] = { 'name': country, 'count': 0 };
			}
			stat[country].count++;
			return stat;
		};
		const isValid = val => !_.isUndefined(val) && !_.isNull(val);
		const getCountry = person => person.address.country;
		let result = _(persons).map(getCountry).reduce(gatherStats, {});
		expect(result).toEqual(
			{
				US: { name: 'US', count: 2 },
				Greece: { name: 'Greece', count: 1 },
				Hungary: { name: 'Hungary', count: 1 }
			}
		);
	});

	// Mid-chapter, we add more objects into the array.
	// We put this additional data into persons2 although in the chapter we still refer to it as persons
	var persons2 = _(persons).map(R.identity);
	var p5 = new Person('555-55-5555', 'David', 'Hilbert', 1903, new Address('Germany'));
	persons2.push(p5);

	var p6 = new Person('666-66-6666', 'Alan', 'Turing', 1912, new Address('England'));
	persons2.push(p6);

	var p7 = new Person('777-77-7777', 'Stephen', 'Kleene', 1909, new Address('US'));
	persons2.push(p7);

	test("Lazy function chains", function () {

		const gatherStats = function (stat, country) {
			if (!isValid(stat[country])) {
				stat[country] = { 'name': country, 'count': 0 };
			}
			stat[country].count++;
			return stat;
		};
		const isValid = val => !_.isUndefined(val) && !_.isNull(val);

		let result = _.chain(persons)
			.filter(isValid)
			.map(_.property('address.country'))
			.reduce(gatherStats, {})
			.values()
			.sortBy('count')
			.reverse()
			.first()
			.value()
			.name; //-> 'US'

		expect(result).toEqual('US');
	});


	test("SQL-like JavaScript", function () {

		_.mixin({
			'select': _.map,
			'from': _.chain,
			'where': _.filter
		});

		let result = _.from(persons)
			.where(p => p.birthYear > 1900 && p.address.country !== 'US')
			.sortBy(['_firstname'])
			.select(rec => rec.firstname)
			.value();

		expect(result).toEqual(['Barkley', 'John']);
	});

	test("Recursive addition", function () {
		function sum(arr) {
			if (_.isEmpty(arr)) {
				return 0;
			}
			return _.first(arr) + sum(_.tail(arr));
		};

		expect(sum([])).toEqual(0); //-> 0
		expect(sum([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual(45); //->45
	});

	test("Recursive addition 2", function () {
		function sum(arr, acc = 0) {
			if (_.isEmpty(arr)) {
				return acc;
			}
			return sum(_.tail(arr), acc + _.first(arr));
		};

		expect(sum([])).toEqual(0); //-> 0
		expect(sum([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual(45); //->45
	});

	test("Tree navigation", function () {
		const Node = require('../model/Node.js').Node;
		const Tree = require('../model/Tree.js').Tree;

		// Instantiate all nodes + adding a few more data points
		const church = new Node(p4);
		const rosser = new Node(p2);
		const turing = new Node(p6);
		const kleene = new Node(p7);
		const nelson = new Node(new Person('123-23-2345', 'Nels', 'Nelson'))
		const constable = new Node(new Person('123-23-6778', 'Robert', 'Constable'));
		const mendelson = new Node(new Person('123-23-3454', 'Elliot', 'Mendelson'));
		const sacks = new Node(new Person('454-76-3434', 'Gerald', 'Sacks'));
		const gandy = new Node(new Person('454-78-3432', 'Robert', 'Gandy'));

		// Create tree structure
		church.append(rosser).append(turing).append(kleene);
		kleene.append(nelson).append(constable);
		rosser.append(mendelson).append(sacks);
		turing.append(gandy);

		// Use Tree structure to apply a map operation over all nodes
		let newTree = Tree.map(church, p => p.fullname);
		expect(newTree.toArray()).toEqual(['Alonzo Church', 'Barkley Rosser', 'Elliot Mendelson',
			'Gerald Sacks', 'Alan Turing', 'Robert Gandy', 'Stephen Kleene', 'Nels Nelson', 'Robert Constable']);
	});
});