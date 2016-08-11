/**
  Chapter 7 code listings
  Author: Luis Atencio
*/

"use strict";

QUnit.module('Chapter 7');

// Installs memoization
require('./memoization');

QUnit.test("Memoization test", function () {
	let rot13 = (s =>
		s.replace(/[a-zA-Z]/g, c =>
			String.fromCharCode((c <= 'Z' ? 90 : 122)
				>= (c = c.charCodeAt(0) + 13) ? c : c - 26))).memoize();
	
	assert.equal(rot13('functional_js_50_off'), 'shapgvbany_wf_50_bss');
});

/*
   The remaining code listings are based on previous functions that are memoized.
   Execution and results are exactly the same...
*/