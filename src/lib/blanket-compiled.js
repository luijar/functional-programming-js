/*! blanket - v1.1.5 */
"use strict";

"undefined" != typeof QUnit && (QUnit.config.autostart = !1), (function (a) {
  /*
  Copyright (C) 2013 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2013 Thaddee Tyl <thaddee.tyl@gmail.com>
  Copyright (C) 2013 Mathias Bynens <mathias@qiwi.be>
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Mathias Bynens <mathias@qiwi.be>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
  Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>
  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:
  * Redistributions of source code must retain the above copyright
  notice, this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright
  notice, this list of conditions and the following disclaimer in the
  documentation and/or other materials provided with the distribution.
  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  */
  !(function (b, c) {
    "use strict";"function" == typeof a && a.amd ? a(["exports"], c) : c("undefined" != typeof exports ? exports : b.esprima = {});
  })(this, function (a) {
    "use strict";function b(a, b) {
      if (!a) throw new Error("ASSERT: " + b);
    }function c(a) {
      return a >= 48 && 57 >= a;
    }function d(a) {
      return "0123456789abcdefABCDEF".indexOf(a) >= 0;
    }function e(a) {
      return "01234567".indexOf(a) >= 0;
    }function f(a) {
      return 32 === a || 9 === a || 11 === a || 12 === a || 160 === a || a >= 5760 && [5760, 6158, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288, 65279].indexOf(a) >= 0;
    }function g(a) {
      return 10 === a || 13 === a || 8232 === a || 8233 === a;
    }function h(a) {
      return 36 === a || 95 === a || a >= 65 && 90 >= a || a >= 97 && 122 >= a || 92 === a || a >= 128 && ec.NonAsciiIdentifierStart.test(String.fromCharCode(a));
    }function i(a) {
      return 36 === a || 95 === a || a >= 65 && 90 >= a || a >= 97 && 122 >= a || a >= 48 && 57 >= a || 92 === a || a >= 128 && ec.NonAsciiIdentifierPart.test(String.fromCharCode(a));
    }function j(a) {
      switch (a) {case "class":case "enum":case "export":case "extends":case "import":case "super":
          return !0;default:
          return !1;}
    }function k(a) {
      switch (a) {case "implements":case "interface":case "package":case "private":case "protected":case "public":case "static":case "yield":case "let":
          return !0;default:
          return !1;}
    }function l(a) {
      return "eval" === a || "arguments" === a;
    }function m(a) {
      if (hc && k(a)) return !0;switch (a.length) {case 2:
          return "if" === a || "in" === a || "do" === a;case 3:
          return "var" === a || "for" === a || "new" === a || "try" === a || "let" === a;case 4:
          return "this" === a || "else" === a || "case" === a || "void" === a || "with" === a || "enum" === a;case 5:
          return "while" === a || "break" === a || "catch" === a || "throw" === a || "const" === a || "yield" === a || "class" === a || "super" === a;case 6:
          return "return" === a || "typeof" === a || "delete" === a || "switch" === a || "export" === a || "import" === a;case 7:
          return "default" === a || "finally" === a || "extends" === a;case 8:
          return "function" === a || "continue" === a || "debugger" === a;case 10:
          return "instanceof" === a;default:
          return !1;}
    }function n(a, c, d, e, f) {
      var g;b("number" == typeof d, "Comment must have valid position"), oc.lastCommentStart >= d || (oc.lastCommentStart = d, g = { type: a, value: c }, pc.range && (g.range = [d, e]), pc.loc && (g.loc = f), pc.comments.push(g), pc.attachComment && (pc.leadingComments.push(g), pc.trailingComments.push(g)));
    }function o(a) {
      var b, c, d, e;for (b = ic - a, c = { start: { line: jc, column: ic - kc - a } }; lc > ic;) if ((d = gc.charCodeAt(ic), ++ic, g(d))) return (pc.comments && (e = gc.slice(b + a, ic - 1), c.end = { line: jc, column: ic - kc - 1 }, n("Line", e, b, ic - 1, c)), 13 === d && 10 === gc.charCodeAt(ic) && ++ic, ++jc, void (kc = ic));pc.comments && (e = gc.slice(b + a, ic), c.end = { line: jc, column: ic - kc }, n("Line", e, b, ic, c));
    }function p() {
      var a, b, c, d;for (pc.comments && (a = ic - 2, b = { start: { line: jc, column: ic - kc - 2 } }); lc > ic;) if ((c = gc.charCodeAt(ic), g(c))) 13 === c && 10 === gc.charCodeAt(ic + 1) && ++ic, ++jc, ++ic, kc = ic, ic >= lc && O({}, dc.UnexpectedToken, "ILLEGAL");else if (42 === c) {
        if (47 === gc.charCodeAt(ic + 1)) return (++ic, ++ic, void (pc.comments && (d = gc.slice(a + 2, ic - 2), b.end = { line: jc, column: ic - kc }, n("Block", d, a, ic, b))));++ic;
      } else ++ic;O({}, dc.UnexpectedToken, "ILLEGAL");
    }function q() {
      var a, b;for (b = 0 === ic; lc > ic;) if ((a = gc.charCodeAt(ic), f(a))) ++ic;else if (g(a)) ++ic, 13 === a && 10 === gc.charCodeAt(ic) && ++ic, ++jc, kc = ic, b = !0;else if (47 === a) if ((a = gc.charCodeAt(ic + 1), 47 === a)) ++ic, ++ic, o(2), b = !0;else {
        if (42 !== a) break;++ic, ++ic, p();
      } else if (b && 45 === a) {
        if (45 !== gc.charCodeAt(ic + 1) || 62 !== gc.charCodeAt(ic + 2)) break;ic += 3, o(3);
      } else {
        if (60 !== a) break;if ("!--" !== gc.slice(ic + 1, ic + 4)) break;++ic, ++ic, ++ic, ++ic, o(4);
      }
    }function r(a) {
      var b,
          c,
          e,
          f = 0;for (c = "u" === a ? 4 : 2, b = 0; c > b; ++b) {
        if (!(lc > ic && d(gc[ic]))) return "";e = gc[ic++], f = 16 * f + "0123456789abcdef".indexOf(e.toLowerCase());
      }return String.fromCharCode(f);
    }function s() {
      var a, b;for (a = gc.charCodeAt(ic++), b = String.fromCharCode(a), 92 === a && (117 !== gc.charCodeAt(ic) && O({}, dc.UnexpectedToken, "ILLEGAL"), ++ic, a = r("u"), a && "\\" !== a && h(a.charCodeAt(0)) || O({}, dc.UnexpectedToken, "ILLEGAL"), b = a); lc > ic && (a = gc.charCodeAt(ic), i(a));) ++ic, b += String.fromCharCode(a), 92 === a && (b = b.substr(0, b.length - 1), 117 !== gc.charCodeAt(ic) && O({}, dc.UnexpectedToken, "ILLEGAL"), ++ic, a = r("u"), a && "\\" !== a && i(a.charCodeAt(0)) || O({}, dc.UnexpectedToken, "ILLEGAL"), b += a);return b;
    }function t() {
      var a, b;for (a = ic++; lc > ic;) {
        if ((b = gc.charCodeAt(ic), 92 === b)) return (ic = a, s());if (!i(b)) break;++ic;
      }return gc.slice(a, ic);
    }function u() {
      var a, b, c;return (a = ic, b = 92 === gc.charCodeAt(ic) ? s() : t(), c = 1 === b.length ? $b.Identifier : m(b) ? $b.Keyword : "null" === b ? $b.NullLiteral : "true" === b || "false" === b ? $b.BooleanLiteral : $b.Identifier, { type: c, value: b, lineNumber: jc, lineStart: kc, start: a, end: ic });
    }function v() {
      var a,
          b,
          c,
          d,
          e = ic,
          f = gc.charCodeAt(ic),
          g = gc[ic];switch (f) {case 46:case 40:case 41:case 59:case 44:case 123:case 125:case 91:case 93:case 58:case 63:case 126:
          return (++ic, pc.tokenize && (40 === f ? pc.openParenToken = pc.tokens.length : 123 === f && (pc.openCurlyToken = pc.tokens.length)), { type: $b.Punctuator, value: String.fromCharCode(f), lineNumber: jc, lineStart: kc, start: e, end: ic });default:
          if ((a = gc.charCodeAt(ic + 1), 61 === a)) switch (f) {case 43:case 45:case 47:case 60:case 62:case 94:case 124:case 37:case 38:case 42:
              return (ic += 2, { type: $b.Punctuator, value: String.fromCharCode(f) + String.fromCharCode(a), lineNumber: jc, lineStart: kc, start: e, end: ic });case 33:case 61:
              return (ic += 2, 61 === gc.charCodeAt(ic) && ++ic, { type: $b.Punctuator, value: gc.slice(e, ic), lineNumber: jc, lineStart: kc, start: e, end: ic });}}return (d = gc.substr(ic, 4), ">>>=" === d ? (ic += 4, { type: $b.Punctuator, value: d, lineNumber: jc, lineStart: kc, start: e, end: ic }) : (c = d.substr(0, 3), ">>>" === c || "<<=" === c || ">>=" === c ? (ic += 3, { type: $b.Punctuator, value: c, lineNumber: jc, lineStart: kc, start: e, end: ic }) : (b = c.substr(0, 2), g === b[1] && "+-<>&|".indexOf(g) >= 0 || "=>" === b ? (ic += 2, { type: $b.Punctuator, value: b, lineNumber: jc, lineStart: kc, start: e, end: ic }) : "<>=!+-*%&|^/".indexOf(g) >= 0 ? (++ic, { type: $b.Punctuator, value: g, lineNumber: jc, lineStart: kc, start: e, end: ic }) : void O({}, dc.UnexpectedToken, "ILLEGAL"))));
    }function w(a) {
      for (var b = ""; lc > ic && d(gc[ic]);) b += gc[ic++];return (0 === b.length && O({}, dc.UnexpectedToken, "ILLEGAL"), h(gc.charCodeAt(ic)) && O({}, dc.UnexpectedToken, "ILLEGAL"), { type: $b.NumericLiteral, value: parseInt("0x" + b, 16), lineNumber: jc, lineStart: kc, start: a, end: ic });
    }function x(a) {
      for (var b = "0" + gc[ic++]; lc > ic && e(gc[ic]);) b += gc[ic++];return ((h(gc.charCodeAt(ic)) || c(gc.charCodeAt(ic))) && O({}, dc.UnexpectedToken, "ILLEGAL"), { type: $b.NumericLiteral, value: parseInt(b, 8), octal: !0, lineNumber: jc, lineStart: kc, start: a, end: ic });
    }function y() {
      var a, d, f;if ((f = gc[ic], b(c(f.charCodeAt(0)) || "." === f, "Numeric literal must start with a decimal digit or a decimal point"), d = ic, a = "", "." !== f)) {
        if ((a = gc[ic++], f = gc[ic], "0" === a)) {
          if ("x" === f || "X" === f) return (++ic, w(d));if (e(f)) return x(d);f && c(f.charCodeAt(0)) && O({}, dc.UnexpectedToken, "ILLEGAL");
        }for (; c(gc.charCodeAt(ic));) a += gc[ic++];f = gc[ic];
      }if ("." === f) {
        for (a += gc[ic++]; c(gc.charCodeAt(ic));) a += gc[ic++];f = gc[ic];
      }if ("e" === f || "E" === f) if ((a += gc[ic++], f = gc[ic], ("+" === f || "-" === f) && (a += gc[ic++]), c(gc.charCodeAt(ic)))) for (; c(gc.charCodeAt(ic));) a += gc[ic++];else O({}, dc.UnexpectedToken, "ILLEGAL");return (h(gc.charCodeAt(ic)) && O({}, dc.UnexpectedToken, "ILLEGAL"), { type: $b.NumericLiteral, value: parseFloat(a), lineNumber: jc, lineStart: kc, start: d, end: ic });
    }function z() {
      var a,
          c,
          d,
          f,
          h,
          i,
          j,
          k,
          l = "",
          m = !1;for (j = jc, k = kc, a = gc[ic], b("'" === a || "\"" === a, "String literal must starts with a quote"), c = ic, ++ic; lc > ic;) {
        if ((d = gc[ic++], d === a)) {
          a = "";break;
        }if ("\\" === d) if ((d = gc[ic++], d && g(d.charCodeAt(0)))) ++jc, "\r" === d && "\n" === gc[ic] && ++ic, kc = ic;else switch (d) {case "u":case "x":
            i = ic, h = r(d), h ? l += h : (ic = i, l += d);break;case "n":
            l += "\n";break;case "r":
            l += "\r";break;case "t":
            l += "\t";break;case "b":
            l += "\b";break;case "f":
            l += "\f";break;case "v":
            l += "\u000b";break;default:
            e(d) ? (f = "01234567".indexOf(d), 0 !== f && (m = !0), lc > ic && e(gc[ic]) && (m = !0, f = 8 * f + "01234567".indexOf(gc[ic++]), "0123".indexOf(d) >= 0 && lc > ic && e(gc[ic]) && (f = 8 * f + "01234567".indexOf(gc[ic++]))), l += String.fromCharCode(f)) : l += d;} else {
          if (g(d.charCodeAt(0))) break;l += d;
        }
      }return ("" !== a && O({}, dc.UnexpectedToken, "ILLEGAL"), { type: $b.StringLiteral, value: l, octal: m, startLineNumber: j, startLineStart: k, lineNumber: jc, lineStart: kc, start: c, end: ic });
    }function A(a, b) {
      var c;try {
        c = new RegExp(a, b);
      } catch (d) {
        O({}, dc.InvalidRegExp);
      }return c;
    }function B() {
      var a, c, d, e, f;for (a = gc[ic], b("/" === a, "Regular expression literal must start with a slash"), c = gc[ic++], d = !1, e = !1; lc > ic;) if ((a = gc[ic++], c += a, "\\" === a)) a = gc[ic++], g(a.charCodeAt(0)) && O({}, dc.UnterminatedRegExp), c += a;else if (g(a.charCodeAt(0))) O({}, dc.UnterminatedRegExp);else if (d) "]" === a && (d = !1);else {
        if ("/" === a) {
          e = !0;break;
        }"[" === a && (d = !0);
      }return (e || O({}, dc.UnterminatedRegExp), f = c.substr(1, c.length - 2), { value: f, literal: c });
    }function C() {
      var a, b, c, d;for (b = "", c = ""; lc > ic && (a = gc[ic], i(a.charCodeAt(0)));) if ((++ic, "\\" === a && lc > ic)) if ((a = gc[ic], "u" === a)) {
        if ((++ic, d = ic, a = r("u"))) for (c += a, b += "\\u"; ic > d; ++d) b += gc[d];else ic = d, c += "u", b += "\\u";P({}, dc.UnexpectedToken, "ILLEGAL");
      } else b += "\\", P({}, dc.UnexpectedToken, "ILLEGAL");else c += a, b += a;return { value: c, literal: b };
    }function D() {
      var a, b, c, d;return (nc = null, q(), a = ic, b = B(), c = C(), d = A(b.value, c.value), pc.tokenize ? { type: $b.RegularExpression, value: d, lineNumber: jc, lineStart: kc, start: a, end: ic } : { literal: b.literal + c.literal, value: d, start: a, end: ic });
    }function E() {
      var a, b, c, d;return (q(), a = ic, b = { start: { line: jc, column: ic - kc } }, c = D(), b.end = { line: jc, column: ic - kc }, pc.tokenize || (pc.tokens.length > 0 && (d = pc.tokens[pc.tokens.length - 1], d.range[0] === a && "Punctuator" === d.type && ("/" === d.value || "/=" === d.value) && pc.tokens.pop()), pc.tokens.push({ type: "RegularExpression", value: c.literal, range: [a, ic], loc: b })), c);
    }function F(a) {
      return a.type === $b.Identifier || a.type === $b.Keyword || a.type === $b.BooleanLiteral || a.type === $b.NullLiteral;
    }function G() {
      var a, b;if ((a = pc.tokens[pc.tokens.length - 1], !a)) return E();if ("Punctuator" === a.type) {
        if ("]" === a.value) return v();if (")" === a.value) return (b = pc.tokens[pc.openParenToken - 1], !b || "Keyword" !== b.type || "if" !== b.value && "while" !== b.value && "for" !== b.value && "with" !== b.value ? v() : E());if ("}" === a.value) {
          if (pc.tokens[pc.openCurlyToken - 3] && "Keyword" === pc.tokens[pc.openCurlyToken - 3].type) {
            if ((b = pc.tokens[pc.openCurlyToken - 4], !b)) return v();
          } else {
            if (!pc.tokens[pc.openCurlyToken - 4] || "Keyword" !== pc.tokens[pc.openCurlyToken - 4].type) return v();if ((b = pc.tokens[pc.openCurlyToken - 5], !b)) return E();
          }return ac.indexOf(b.value) >= 0 ? v() : E();
        }return E();
      }return "Keyword" === a.type ? E() : v();
    }function H() {
      var a;return (q(), ic >= lc ? { type: $b.EOF, lineNumber: jc, lineStart: kc, start: ic, end: ic } : (a = gc.charCodeAt(ic), h(a) ? u() : 40 === a || 41 === a || 59 === a ? v() : 39 === a || 34 === a ? z() : 46 === a ? c(gc.charCodeAt(ic + 1)) ? y() : v() : c(a) ? y() : pc.tokenize && 47 === a ? G() : v()));
    }function I() {
      var a, b, c;return (q(), a = { start: { line: jc, column: ic - kc } }, b = H(), a.end = { line: jc, column: ic - kc }, b.type !== $b.EOF && (c = gc.slice(b.start, b.end), pc.tokens.push({ type: _b[b.type], value: c, range: [b.start, b.end], loc: a })), b);
    }function J() {
      var a;return (a = nc, ic = a.end, jc = a.lineNumber, kc = a.lineStart, nc = "undefined" != typeof pc.tokens ? I() : H(), ic = a.end, jc = a.lineNumber, kc = a.lineStart, a);
    }function K() {
      var a, b, c;a = ic, b = jc, c = kc, nc = "undefined" != typeof pc.tokens ? I() : H(), ic = a, jc = b, kc = c;
    }function L(a, b) {
      this.line = a, this.column = b;
    }function M(a, b, c, d) {
      this.start = new L(a, b), this.end = new L(c, d);
    }function N() {
      var a, b, c, d;return (a = ic, b = jc, c = kc, q(), d = jc !== b, ic = a, jc = b, kc = c, d);
    }function O(a, c) {
      var d,
          e = Array.prototype.slice.call(arguments, 2),
          f = c.replace(/%(\d)/g, function (a, c) {
        return (b(c < e.length, "Message reference must be in range"), e[c]);
      });throw ("number" == typeof a.lineNumber ? (d = new Error("Line " + a.lineNumber + ": " + f), d.index = a.start, d.lineNumber = a.lineNumber, d.column = a.start - kc + 1) : (d = new Error("Line " + jc + ": " + f), d.index = ic, d.lineNumber = jc, d.column = ic - kc + 1), d.description = f, d);
    }function P() {
      try {
        O.apply(null, arguments);
      } catch (a) {
        if (!pc.errors) throw a;pc.errors.push(a);
      }
    }function Q(a) {
      if ((a.type === $b.EOF && O(a, dc.UnexpectedEOS), a.type === $b.NumericLiteral && O(a, dc.UnexpectedNumber), a.type === $b.StringLiteral && O(a, dc.UnexpectedString), a.type === $b.Identifier && O(a, dc.UnexpectedIdentifier), a.type === $b.Keyword)) {
        if (j(a.value)) O(a, dc.UnexpectedReserved);else if (hc && k(a.value)) return void P(a, dc.StrictReservedWord);O(a, dc.UnexpectedToken, a.value);
      }O(a, dc.UnexpectedToken, a.value);
    }function R(a) {
      var b = J();(b.type !== $b.Punctuator || b.value !== a) && Q(b);
    }function S(a) {
      var b = J();(b.type !== $b.Keyword || b.value !== a) && Q(b);
    }function T(a) {
      return nc.type === $b.Punctuator && nc.value === a;
    }function U(a) {
      return nc.type === $b.Keyword && nc.value === a;
    }function V() {
      var a;return nc.type !== $b.Punctuator ? !1 : (a = nc.value, "=" === a || "*=" === a || "/=" === a || "%=" === a || "+=" === a || "-=" === a || "<<=" === a || ">>=" === a || ">>>=" === a || "&=" === a || "^=" === a || "|=" === a);
    }function W() {
      var a;return 59 === gc.charCodeAt(ic) || T(";") ? void J() : (a = jc, q(), void (jc === a && (nc.type === $b.EOF || T("}") || Q(nc))));
    }function X(a) {
      return a.type === bc.Identifier || a.type === bc.MemberExpression;
    }function Y() {
      var a,
          b = [];for (a = nc, R("["); !T("]");) T(",") ? (J(), b.push(null)) : (b.push(pb()), T("]") || R(","));return (J(), mc.markEnd(mc.createArrayExpression(b), a));
    }function Z(a, b) {
      var c, d, e;return (c = hc, e = nc, d = Qb(), b && hc && l(a[0].name) && P(b, dc.StrictParamName), hc = c, mc.markEnd(mc.createFunctionExpression(null, a, [], d), e));
    }function $() {
      var a, b;return (b = nc, a = J(), a.type === $b.StringLiteral || a.type === $b.NumericLiteral ? (hc && a.octal && P(a, dc.StrictOctalLiteral), mc.markEnd(mc.createLiteral(a), b)) : mc.markEnd(mc.createIdentifier(a.value), b));
    }function _() {
      var a, b, c, d, e, f;return (a = nc, f = nc, a.type === $b.Identifier ? (c = $(), "get" !== a.value || T(":") ? "set" !== a.value || T(":") ? (R(":"), d = pb(), mc.markEnd(mc.createProperty("init", c, d), f)) : (b = $(), R("("), a = nc, a.type !== $b.Identifier ? (R(")"), P(a, dc.UnexpectedToken, a.value), d = Z([])) : (e = [tb()], R(")"), d = Z(e, a)), mc.markEnd(mc.createProperty("set", b, d), f)) : (b = $(), R("("), R(")"), d = Z([]), mc.markEnd(mc.createProperty("get", b, d), f))) : a.type !== $b.EOF && a.type !== $b.Punctuator ? (b = $(), R(":"), d = pb(), mc.markEnd(mc.createProperty("init", b, d), f)) : void Q(a));
    }function ab() {
      var a,
          b,
          c,
          d,
          e,
          f = [],
          g = {},
          h = String;for (e = nc, R("{"); !T("}");) a = _(), b = a.key.type === bc.Identifier ? a.key.name : h(a.key.value), d = "init" === a.kind ? cc.Data : "get" === a.kind ? cc.Get : cc.Set, c = "$" + b, Object.prototype.hasOwnProperty.call(g, c) ? (g[c] === cc.Data ? hc && d === cc.Data ? P({}, dc.StrictDuplicateProperty) : d !== cc.Data && P({}, dc.AccessorDataProperty) : d === cc.Data ? P({}, dc.AccessorDataProperty) : g[c] & d && P({}, dc.AccessorGetSet), g[c] |= d) : g[c] = d, f.push(a), T("}") || R(",");return (R("}"), mc.markEnd(mc.createObjectExpression(f), e));
    }function bb() {
      var a;return (R("("), a = qb(), R(")"), a);
    }function cb() {
      var a, b, c, d;if (T("(")) return bb();if (T("[")) return Y();if (T("{")) return ab();if ((a = nc.type, d = nc, a === $b.Identifier)) c = mc.createIdentifier(J().value);else if (a === $b.StringLiteral || a === $b.NumericLiteral) hc && nc.octal && P(nc, dc.StrictOctalLiteral), c = mc.createLiteral(J());else if (a === $b.Keyword) {
        if (U("function")) return Tb();U("this") ? (J(), c = mc.createThisExpression()) : Q(J());
      } else a === $b.BooleanLiteral ? (b = J(), b.value = "true" === b.value, c = mc.createLiteral(b)) : a === $b.NullLiteral ? (b = J(), b.value = null, c = mc.createLiteral(b)) : T("/") || T("/=") ? (c = mc.createLiteral("undefined" != typeof pc.tokens ? E() : D()), K()) : Q(J());return mc.markEnd(c, d);
    }function db() {
      var a = [];if ((R("("), !T(")"))) for (; lc > ic && (a.push(pb()), !T(")"));) R(",");return (R(")"), a);
    }function eb() {
      var a, b;return (b = nc, a = J(), F(a) || Q(a), mc.markEnd(mc.createIdentifier(a.value), b));
    }function fb() {
      return (R("."), eb());
    }function gb() {
      var a;return (R("["), a = qb(), R("]"), a);
    }function hb() {
      var a, b, c;return (c = nc, S("new"), a = jb(), b = T("(") ? db() : [], mc.markEnd(mc.createNewExpression(a, b), c));
    }function ib() {
      var a, b, c, d, e;for (e = nc, a = oc.allowIn, oc.allowIn = !0, b = U("new") ? hb() : cb(), oc.allowIn = a;;) {
        if (T(".")) d = fb(), b = mc.createMemberExpression(".", b, d);else if (T("(")) c = db(), b = mc.createCallExpression(b, c);else {
          if (!T("[")) break;d = gb(), b = mc.createMemberExpression("[", b, d);
        }mc.markEnd(b, e);
      }return b;
    }function jb() {
      var a, b, c, d;for (d = nc, a = oc.allowIn, b = U("new") ? hb() : cb(), oc.allowIn = a; T(".") || T("[");) T("[") ? (c = gb(), b = mc.createMemberExpression("[", b, c)) : (c = fb(), b = mc.createMemberExpression(".", b, c)), mc.markEnd(b, d);return b;
    }function kb() {
      var a,
          b,
          c = nc;return (a = ib(), nc.type === $b.Punctuator && (!T("++") && !T("--") || N() || (hc && a.type === bc.Identifier && l(a.name) && P({}, dc.StrictLHSPostfix), X(a) || P({}, dc.InvalidLHSInAssignment), b = J(), a = mc.markEnd(mc.createPostfixExpression(b.value, a), c))), a);
    }function lb() {
      var a, b, c;return (nc.type !== $b.Punctuator && nc.type !== $b.Keyword ? b = kb() : T("++") || T("--") ? (c = nc, a = J(), b = lb(), hc && b.type === bc.Identifier && l(b.name) && P({}, dc.StrictLHSPrefix), X(b) || P({}, dc.InvalidLHSInAssignment), b = mc.createUnaryExpression(a.value, b), b = mc.markEnd(b, c)) : T("+") || T("-") || T("~") || T("!") ? (c = nc, a = J(), b = lb(), b = mc.createUnaryExpression(a.value, b), b = mc.markEnd(b, c)) : U("delete") || U("void") || U("typeof") ? (c = nc, a = J(), b = lb(), b = mc.createUnaryExpression(a.value, b), b = mc.markEnd(b, c), hc && "delete" === b.operator && b.argument.type === bc.Identifier && P({}, dc.StrictDelete)) : b = kb(), b);
    }function mb(a, b) {
      var c = 0;if (a.type !== $b.Punctuator && a.type !== $b.Keyword) return 0;switch (a.value) {case "||":
          c = 1;break;case "&&":
          c = 2;break;case "|":
          c = 3;break;case "^":
          c = 4;break;case "&":
          c = 5;break;case "==":case "!=":case "===":case "!==":
          c = 6;break;case "<":case ">":case "<=":case ">=":case "instanceof":
          c = 7;break;case "in":
          c = b ? 7 : 0;break;case "<<":case ">>":case ">>>":
          c = 8;break;case "+":case "-":
          c = 9;break;case "*":case "/":case "%":
          c = 11;}return c;
    }function nb() {
      var a, b, c, d, e, f, g, h, i, j;if ((a = nc, i = lb(), d = nc, e = mb(d, oc.allowIn), 0 === e)) return i;for (d.prec = e, J(), b = [a, nc], g = lb(), f = [i, d, g]; (e = mb(nc, oc.allowIn)) > 0;) {
        for (; f.length > 2 && e <= f[f.length - 2].prec;) g = f.pop(), h = f.pop().value, i = f.pop(), c = mc.createBinaryExpression(h, i, g), b.pop(), a = b[b.length - 1], mc.markEnd(c, a), f.push(c);d = J(), d.prec = e, f.push(d), b.push(nc), c = lb(), f.push(c);
      }for (j = f.length - 1, c = f[j], b.pop(); j > 1;) c = mc.createBinaryExpression(f[j - 1].value, f[j - 2], c), j -= 2, a = b.pop(), mc.markEnd(c, a);return c;
    }function ob() {
      var a, b, c, d, e;return (e = nc, a = nb(), T("?") && (J(), b = oc.allowIn, oc.allowIn = !0, c = pb(), oc.allowIn = b, R(":"), d = pb(), a = mc.createConditionalExpression(a, c, d), mc.markEnd(a, e)), a);
    }function pb() {
      var a, b, c, d, e;return (a = nc, e = nc, d = b = ob(), V() && (X(b) || P({}, dc.InvalidLHSInAssignment), hc && b.type === bc.Identifier && l(b.name) && P(a, dc.StrictLHSAssignment), a = J(), c = pb(), d = mc.markEnd(mc.createAssignmentExpression(a.value, b, c), e)), d);
    }function qb() {
      var a,
          b = nc;if ((a = pb(), T(","))) {
        for (a = mc.createSequenceExpression([a]); lc > ic && T(",");) J(), a.expressions.push(pb());mc.markEnd(a, b);
      }return a;
    }function rb() {
      for (var a, b = []; lc > ic && !T("}") && (a = Ub(), "undefined" != typeof a);) b.push(a);return b;
    }function sb() {
      var a, b;return (b = nc, R("{"), a = rb(), R("}"), mc.markEnd(mc.createBlockStatement(a), b));
    }function tb() {
      var a, b;return (b = nc, a = J(), a.type !== $b.Identifier && Q(a), mc.markEnd(mc.createIdentifier(a.value), b));
    }function ub(a) {
      var b,
          c,
          d = null;return (c = nc, b = tb(), hc && l(b.name) && P({}, dc.StrictVarName), "const" === a ? (R("="), d = pb()) : T("=") && (J(), d = pb()), mc.markEnd(mc.createVariableDeclarator(b, d), c));
    }function vb(a) {
      var b = [];do {
        if ((b.push(ub(a)), !T(","))) break;J();
      } while (lc > ic);return b;
    }function wb() {
      var a;return (S("var"), a = vb(), W(), mc.createVariableDeclaration(a, "var"));
    }function xb(a) {
      var b, c;return (c = nc, S(a), b = vb(a), W(), mc.markEnd(mc.createVariableDeclaration(b, a), c));
    }function yb() {
      return (R(";"), mc.createEmptyStatement());
    }function zb() {
      var a = qb();return (W(), mc.createExpressionStatement(a));
    }function Ab() {
      var a, b, c;return (S("if"), R("("), a = qb(), R(")"), b = Pb(), U("else") ? (J(), c = Pb()) : c = null, mc.createIfStatement(a, b, c));
    }function Bb() {
      var a, b, c;return (S("do"), c = oc.inIteration, oc.inIteration = !0, a = Pb(), oc.inIteration = c, S("while"), R("("), b = qb(), R(")"), T(";") && J(), mc.createDoWhileStatement(a, b));
    }function Cb() {
      var a, b, c;return (S("while"), R("("), a = qb(), R(")"), c = oc.inIteration, oc.inIteration = !0, b = Pb(), oc.inIteration = c, mc.createWhileStatement(a, b));
    }function Db() {
      var a, b, c;return (c = nc, a = J(), b = vb(), mc.markEnd(mc.createVariableDeclaration(b, a.value), c));
    }function Eb() {
      var a, b, c, d, e, f, g;return (a = b = c = null, S("for"), R("("), T(";") ? J() : (U("var") || U("let") ? (oc.allowIn = !1, a = Db(), oc.allowIn = !0, 1 === a.declarations.length && U("in") && (J(), d = a, e = qb(), a = null)) : (oc.allowIn = !1, a = qb(), oc.allowIn = !0, U("in") && (X(a) || P({}, dc.InvalidLHSInForIn), J(), d = a, e = qb(), a = null)), "undefined" == typeof d && R(";")), "undefined" == typeof d && (T(";") || (b = qb()), R(";"), T(")") || (c = qb())), R(")"), g = oc.inIteration, oc.inIteration = !0, f = Pb(), oc.inIteration = g, "undefined" == typeof d ? mc.createForStatement(a, b, c, f) : mc.createForInStatement(d, e, f));
    }function Fb() {
      var a,
          b = null;return (S("continue"), 59 === gc.charCodeAt(ic) ? (J(), oc.inIteration || O({}, dc.IllegalContinue), mc.createContinueStatement(null)) : N() ? (oc.inIteration || O({}, dc.IllegalContinue), mc.createContinueStatement(null)) : (nc.type === $b.Identifier && (b = tb(), a = "$" + b.name, Object.prototype.hasOwnProperty.call(oc.labelSet, a) || O({}, dc.UnknownLabel, b.name)), W(), null !== b || oc.inIteration || O({}, dc.IllegalContinue), mc.createContinueStatement(b)));
    }function Gb() {
      var a,
          b = null;return (S("break"), 59 === gc.charCodeAt(ic) ? (J(), oc.inIteration || oc.inSwitch || O({}, dc.IllegalBreak), mc.createBreakStatement(null)) : N() ? (oc.inIteration || oc.inSwitch || O({}, dc.IllegalBreak), mc.createBreakStatement(null)) : (nc.type === $b.Identifier && (b = tb(), a = "$" + b.name, Object.prototype.hasOwnProperty.call(oc.labelSet, a) || O({}, dc.UnknownLabel, b.name)), W(), null !== b || oc.inIteration || oc.inSwitch || O({}, dc.IllegalBreak), mc.createBreakStatement(b)));
    }function Hb() {
      var a = null;return (S("return"), oc.inFunctionBody || P({}, dc.IllegalReturn), 32 === gc.charCodeAt(ic) && h(gc.charCodeAt(ic + 1)) ? (a = qb(), W(), mc.createReturnStatement(a)) : N() ? mc.createReturnStatement(null) : (T(";") || T("}") || nc.type === $b.EOF || (a = qb()), W(), mc.createReturnStatement(a)));
    }function Ib() {
      var a, b;return (hc && (q(), P({}, dc.StrictModeWith)), S("with"), R("("), a = qb(), R(")"), b = Pb(), mc.createWithStatement(a, b));
    }function Jb() {
      var a,
          b,
          c,
          d = [];for (c = nc, U("default") ? (J(), a = null) : (S("case"), a = qb()), R(":"); lc > ic && !(T("}") || U("default") || U("case"));) b = Pb(), d.push(b);return mc.markEnd(mc.createSwitchCase(a, d), c);
    }function Kb() {
      var a, b, c, d, e;if ((S("switch"), R("("), a = qb(), R(")"), R("{"), b = [], T("}"))) return (J(), mc.createSwitchStatement(a, b));for (d = oc.inSwitch, oc.inSwitch = !0, e = !1; lc > ic && !T("}");) c = Jb(), null === c.test && (e && O({}, dc.MultipleDefaultsInSwitch), e = !0), b.push(c);return (oc.inSwitch = d, R("}"), mc.createSwitchStatement(a, b));
    }function Lb() {
      var a;return (S("throw"), N() && O({}, dc.NewlineAfterThrow), a = qb(), W(), mc.createThrowStatement(a));
    }function Mb() {
      var a, b, c;return (c = nc, S("catch"), R("("), T(")") && Q(nc), a = tb(), hc && l(a.name) && P({}, dc.StrictCatchVariable), R(")"), b = sb(), mc.markEnd(mc.createCatchClause(a, b), c));
    }function Nb() {
      var a,
          b = [],
          c = null;return (S("try"), a = sb(), U("catch") && b.push(Mb()), U("finally") && (J(), c = sb()), 0 !== b.length || c || O({}, dc.NoCatchOrFinally), mc.createTryStatement(a, [], b, c));
    }function Ob() {
      return (S("debugger"), W(), mc.createDebuggerStatement());
    }function Pb() {
      var a,
          b,
          c,
          d,
          e = nc.type;if ((e === $b.EOF && Q(nc), e === $b.Punctuator && "{" === nc.value)) return sb();if ((d = nc, e === $b.Punctuator)) switch (nc.value) {case ";":
          return mc.markEnd(yb(), d);case "(":
          return mc.markEnd(zb(), d);}if (e === $b.Keyword) switch (nc.value) {case "break":
          return mc.markEnd(Gb(), d);case "continue":
          return mc.markEnd(Fb(), d);case "debugger":
          return mc.markEnd(Ob(), d);case "do":
          return mc.markEnd(Bb(), d);case "for":
          return mc.markEnd(Eb(), d);case "function":
          return mc.markEnd(Sb(), d);case "if":
          return mc.markEnd(Ab(), d);case "return":
          return mc.markEnd(Hb(), d);case "switch":
          return mc.markEnd(Kb(), d);case "throw":
          return mc.markEnd(Lb(), d);case "try":
          return mc.markEnd(Nb(), d);case "var":
          return mc.markEnd(wb(), d);case "while":
          return mc.markEnd(Cb(), d);case "with":
          return mc.markEnd(Ib(), d);}return (a = qb(), a.type === bc.Identifier && T(":") ? (J(), c = "$" + a.name, Object.prototype.hasOwnProperty.call(oc.labelSet, c) && O({}, dc.Redeclaration, "Label", a.name), oc.labelSet[c] = !0, b = Pb(), delete oc.labelSet[c], mc.markEnd(mc.createLabeledStatement(a, b), d)) : (W(), mc.markEnd(mc.createExpressionStatement(a), d)));
    }function Qb() {
      var a,
          b,
          c,
          d,
          e,
          f,
          g,
          h,
          i,
          j = [];for (i = nc, R("{"); lc > ic && nc.type === $b.StringLiteral && (b = nc, a = Ub(), j.push(a), a.expression.type === bc.Literal);) c = gc.slice(b.start + 1, b.end - 1), "use strict" === c ? (hc = !0, d && P(d, dc.StrictOctalLiteral)) : !d && b.octal && (d = b);for (e = oc.labelSet, f = oc.inIteration, g = oc.inSwitch, h = oc.inFunctionBody, oc.labelSet = {}, oc.inIteration = !1, oc.inSwitch = !1, oc.inFunctionBody = !0; lc > ic && !T("}") && (a = Ub(), "undefined" != typeof a);) j.push(a);return (R("}"), oc.labelSet = e, oc.inIteration = f, oc.inSwitch = g, oc.inFunctionBody = h, mc.markEnd(mc.createBlockStatement(j), i));
    }function Rb(a) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h = [];if ((R("("), !T(")"))) for (e = {}; lc > ic && (c = nc, b = tb(), f = "$" + c.value, hc ? (l(c.value) && (d = c, g = dc.StrictParamName), Object.prototype.hasOwnProperty.call(e, f) && (d = c, g = dc.StrictParamDupe)) : a || (l(c.value) ? (a = c, g = dc.StrictParamName) : k(c.value) ? (a = c, g = dc.StrictReservedWord) : Object.prototype.hasOwnProperty.call(e, f) && (a = c, g = dc.StrictParamDupe)), h.push(b), e[f] = !0, !T(")"));) R(",");return (R(")"), { params: h, stricted: d, firstRestricted: a, message: g });
    }function Sb() {
      var a,
          b,
          c,
          d,
          e,
          f,
          g,
          h,
          i,
          j = [];return (i = nc, S("function"), c = nc, a = tb(), hc ? l(c.value) && P(c, dc.StrictFunctionName) : l(c.value) ? (f = c, g = dc.StrictFunctionName) : k(c.value) && (f = c, g = dc.StrictReservedWord), e = Rb(f), j = e.params, d = e.stricted, f = e.firstRestricted, e.message && (g = e.message), h = hc, b = Qb(), hc && f && O(f, g), hc && d && P(d, g), hc = h, mc.markEnd(mc.createFunctionDeclaration(a, j, [], b), i));
    }function Tb() {
      var a,
          b,
          c,
          d,
          e,
          f,
          g,
          h,
          i = null,
          j = [];return (h = nc, S("function"), T("(") || (a = nc, i = tb(), hc ? l(a.value) && P(a, dc.StrictFunctionName) : l(a.value) ? (c = a, d = dc.StrictFunctionName) : k(a.value) && (c = a, d = dc.StrictReservedWord)), e = Rb(c), j = e.params, b = e.stricted, c = e.firstRestricted, e.message && (d = e.message), g = hc, f = Qb(), hc && c && O(c, d), hc && b && P(b, d), hc = g, mc.markEnd(mc.createFunctionExpression(i, j, [], f), h));
    }function Ub() {
      if (nc.type === $b.Keyword) switch (nc.value) {case "const":case "let":
          return xb(nc.value);case "function":
          return Sb();default:
          return Pb();}return nc.type !== $b.EOF ? Pb() : void 0;
    }function Vb() {
      for (var a, b, c, d, e = []; lc > ic && (b = nc, b.type === $b.StringLiteral) && (a = Ub(), e.push(a), a.expression.type === bc.Literal);) c = gc.slice(b.start + 1, b.end - 1), "use strict" === c ? (hc = !0, d && P(d, dc.StrictOctalLiteral)) : !d && b.octal && (d = b);for (; lc > ic && (a = Ub(), "undefined" != typeof a);) e.push(a);return e;
    }function Wb() {
      var a, b;return (q(), K(), b = nc, hc = !1, a = Vb(), mc.markEnd(mc.createProgram(a), b));
    }function Xb() {
      var a,
          b,
          c,
          d = [];for (a = 0; a < pc.tokens.length; ++a) b = pc.tokens[a], c = { type: b.type, value: b.value }, pc.range && (c.range = b.range), pc.loc && (c.loc = b.loc), d.push(c);pc.tokens = d;
    }function Yb(a, b) {
      var c, d, e;c = String, "string" == typeof a || a instanceof String || (a = c(a)), mc = fc, gc = a, ic = 0, jc = gc.length > 0 ? 1 : 0, kc = 0, lc = gc.length, nc = null, oc = { allowIn: !0, labelSet: {}, inFunctionBody: !1, inIteration: !1, inSwitch: !1, lastCommentStart: -1 }, pc = {}, b = b || {}, b.tokens = !0, pc.tokens = [], pc.tokenize = !0, pc.openParenToken = -1, pc.openCurlyToken = -1, pc.range = "boolean" == typeof b.range && b.range, pc.loc = "boolean" == typeof b.loc && b.loc, "boolean" == typeof b.comment && b.comment && (pc.comments = []), "boolean" == typeof b.tolerant && b.tolerant && (pc.errors = []);try {
        if ((K(), nc.type === $b.EOF)) return pc.tokens;for (d = J(); nc.type !== $b.EOF;) try {
          d = J();
        } catch (f) {
          if ((d = nc, pc.errors)) {
            pc.errors.push(f);break;
          }throw f;
        }Xb(), e = pc.tokens, "undefined" != typeof pc.comments && (e.comments = pc.comments), "undefined" != typeof pc.errors && (e.errors = pc.errors);
      } catch (g) {
        throw g;
      } finally {
        pc = {};
      }return e;
    }function Zb(a, b) {
      var c, d;d = String, "string" == typeof a || a instanceof String || (a = d(a)), mc = fc, gc = a, ic = 0, jc = gc.length > 0 ? 1 : 0, kc = 0, lc = gc.length, nc = null, oc = { allowIn: !0, labelSet: {}, inFunctionBody: !1, inIteration: !1, inSwitch: !1, lastCommentStart: -1 }, pc = {}, "undefined" != typeof b && (pc.range = "boolean" == typeof b.range && b.range, pc.loc = "boolean" == typeof b.loc && b.loc, pc.attachComment = "boolean" == typeof b.attachComment && b.attachComment, pc.loc && null !== b.source && void 0 !== b.source && (pc.source = d(b.source)), "boolean" == typeof b.tokens && b.tokens && (pc.tokens = []), "boolean" == typeof b.comment && b.comment && (pc.comments = []), "boolean" == typeof b.tolerant && b.tolerant && (pc.errors = []), pc.attachComment && (pc.range = !0, pc.comments = [], pc.bottomRightStack = [], pc.trailingComments = [], pc.leadingComments = []));try {
        c = Wb(), "undefined" != typeof pc.comments && (c.comments = pc.comments), "undefined" != typeof pc.tokens && (Xb(), c.tokens = pc.tokens), "undefined" != typeof pc.errors && (c.errors = pc.errors);
      } catch (e) {
        throw e;
      } finally {
        pc = {};
      }return c;
    }var $b, _b, ac, bc, cc, dc, ec, fc, gc, hc, ic, jc, kc, lc, mc, nc, oc, pc;$b = { BooleanLiteral: 1, EOF: 2, Identifier: 3, Keyword: 4, NullLiteral: 5, NumericLiteral: 6, Punctuator: 7, StringLiteral: 8, RegularExpression: 9 }, _b = {}, _b[$b.BooleanLiteral] = "Boolean", _b[$b.EOF] = "<end>", _b[$b.Identifier] = "Identifier", _b[$b.Keyword] = "Keyword", _b[$b.NullLiteral] = "Null", _b[$b.NumericLiteral] = "Numeric", _b[$b.Punctuator] = "Punctuator", _b[$b.StringLiteral] = "String", _b[$b.RegularExpression] = "RegularExpression", ac = ["(", "{", "[", "in", "typeof", "instanceof", "new", "return", "case", "delete", "throw", "void", "=", "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=", "&=", "|=", "^=", ",", "+", "-", "*", "/", "%", "++", "--", "<<", ">>", ">>>", "&", "|", "^", "!", "~", "&&", "||", "?", ":", "===", "==", ">=", "<=", "<", ">", "!=", "!=="], bc = { AssignmentExpression: "AssignmentExpression", ArrayExpression: "ArrayExpression", BlockStatement: "BlockStatement", BinaryExpression: "BinaryExpression", BreakStatement: "BreakStatement", CallExpression: "CallExpression", CatchClause: "CatchClause", ConditionalExpression: "ConditionalExpression", ContinueStatement: "ContinueStatement", DoWhileStatement: "DoWhileStatement", DebuggerStatement: "DebuggerStatement", EmptyStatement: "EmptyStatement", ExpressionStatement: "ExpressionStatement", ForStatement: "ForStatement", ForInStatement: "ForInStatement", FunctionDeclaration: "FunctionDeclaration", FunctionExpression: "FunctionExpression", Identifier: "Identifier", IfStatement: "IfStatement", Literal: "Literal", LabeledStatement: "LabeledStatement", LogicalExpression: "LogicalExpression", MemberExpression: "MemberExpression", NewExpression: "NewExpression", ObjectExpression: "ObjectExpression", Program: "Program", Property: "Property", ReturnStatement: "ReturnStatement", SequenceExpression: "SequenceExpression", SwitchStatement: "SwitchStatement", SwitchCase: "SwitchCase", ThisExpression: "ThisExpression", ThrowStatement: "ThrowStatement", TryStatement: "TryStatement", UnaryExpression: "UnaryExpression", UpdateExpression: "UpdateExpression", VariableDeclaration: "VariableDeclaration", VariableDeclarator: "VariableDeclarator", WhileStatement: "WhileStatement", WithStatement: "WithStatement" }, cc = { Data: 1, Get: 2, Set: 4 }, dc = { UnexpectedToken: "Unexpected token %0", UnexpectedNumber: "Unexpected number", UnexpectedString: "Unexpected string", UnexpectedIdentifier: "Unexpected identifier", UnexpectedReserved: "Unexpected reserved word", UnexpectedEOS: "Unexpected end of input", NewlineAfterThrow: "Illegal newline after throw", InvalidRegExp: "Invalid regular expression", UnterminatedRegExp: "Invalid regular expression: missing /", InvalidLHSInAssignment: "Invalid left-hand side in assignment", InvalidLHSInForIn: "Invalid left-hand side in for-in", MultipleDefaultsInSwitch: "More than one default clause in switch statement", NoCatchOrFinally: "Missing catch or finally after try", UnknownLabel: "Undefined label '%0'", Redeclaration: "%0 '%1' has already been declared", IllegalContinue: "Illegal continue statement", IllegalBreak: "Illegal break statement", IllegalReturn: "Illegal return statement", StrictModeWith: "Strict mode code may not include a with statement", StrictCatchVariable: "Catch variable may not be eval or arguments in strict mode", StrictVarName: "Variable name may not be eval or arguments in strict mode", StrictParamName: "Parameter name eval or arguments is not allowed in strict mode", StrictParamDupe: "Strict mode function may not have duplicate parameter names", StrictFunctionName: "Function name may not be eval or arguments in strict mode", StrictOctalLiteral: "Octal literals are not allowed in strict mode.", StrictDelete: "Delete of an unqualified identifier in strict mode.", StrictDuplicateProperty: "Duplicate data property in object literal not allowed in strict mode", AccessorDataProperty: "Object literal may not have data and accessor property with the same name", AccessorGetSet: "Object literal may not have multiple get/set accessors with the same name", StrictLHSAssignment: "Assignment to eval or arguments is not allowed in strict mode", StrictLHSPostfix: "Postfix increment/decrement may not have eval or arguments operand in strict mode", StrictLHSPrefix: "Prefix increment/decrement may not have eval or arguments operand in strict mode", StrictReservedWord: "Use of future reserved word in strict mode" }, ec = { NonAsciiIdentifierStart: new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]"), NonAsciiIdentifierPart: new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮ̀-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁ҃-҇Ҋ-ԧԱ-Ֆՙա-և֑-ׇֽֿׁׂׅׄא-תװ-ײؐ-ؚؠ-٩ٮ-ۓە-ۜ۟-۪ۨ-ۼۿܐ-݊ݍ-ޱ߀-ߵߺࠀ-࠭ࡀ-࡛ࢠࢢ-ࢬࣤ-ࣾऀ-ॣ०-९ॱ-ॷॹ-ॿঁ-ঃঅ-ঌএঐও-নপ-রলশ-হ়-ৄেৈো-ৎৗড়ঢ়য়-ৣ০-ৱਁ-ਃਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹ਼ਾ-ੂੇੈੋ-੍ੑਖ਼-ੜਫ਼੦-ੵઁ-ઃઅ-ઍએ-ઑઓ-નપ-રલળવ-હ઼-ૅે-ૉો-્ૐૠ-ૣ૦-૯ଁ-ଃଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହ଼-ୄେୈୋ-୍ୖୗଡ଼ଢ଼ୟ-ୣ୦-୯ୱஂஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹா-ூெ-ைொ-்ௐௗ௦-௯ఁ-ఃఅ-ఌఎ-ఐఒ-నప-ళవ-హఽ-ౄె-ైొ-్ౕౖౘౙౠ-ౣ౦-౯ಂಃಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹ಼-ೄೆ-ೈೊ-್ೕೖೞೠ-ೣ೦-೯ೱೲംഃഅ-ഌഎ-ഐഒ-ഺഽ-ൄെ-ൈൊ-ൎൗൠ-ൣ൦-൯ൺ-ൿංඃඅ-ඖක-නඳ-රලව-ෆ්ා-ුූෘ-ෟෲෳก-ฺเ-๎๐-๙ກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ູົ-ຽເ-ໄໆ່-ໍ໐-໙ໜ-ໟༀ༘༙༠-༩༹༵༷༾-ཇཉ-ཬཱ-྄྆-ྗྙ-ྼ࿆က-၉ၐ-ႝႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚ፝-፟ᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-᜔ᜠ-᜴ᝀ-ᝓᝠ-ᝬᝮ-ᝰᝲᝳក-៓ៗៜ៝០-៩᠋-᠍᠐-᠙ᠠ-ᡷᢀ-ᢪᢰ-ᣵᤀ-ᤜᤠ-ᤫᤰ-᤻᥆-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉ᧐-᧙ᨀ-ᨛᨠ-ᩞ᩠-᩿᩼-᪉᪐-᪙ᪧᬀ-ᭋ᭐-᭙᭫-᭳ᮀ-᯳ᰀ-᰷᱀-᱉ᱍ-ᱽ᳐-᳔᳒-ᳶᴀ-ᷦ᷼-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼ‌‍‿⁀⁔ⁱⁿₐ-ₜ⃐-⃥⃜⃡-⃰ℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯ⵿-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⷠ-ⷿⸯ々-〇〡-〯〱-〵〸-〼ぁ-ゖ゙゚ゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘫꙀ-꙯ꙴ-꙽ꙿ-ꚗꚟ-꛱ꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠧꡀ-ꡳꢀ-꣄꣐-꣙꣠-ꣷꣻ꤀-꤭ꤰ-꥓ꥠ-ꥼꦀ-꧀ꧏ-꧙ꨀ-ꨶꩀ-ꩍ꩐-꩙ꩠ-ꩶꩺꩻꪀ-ꫂꫛ-ꫝꫠ-ꫯꫲ-꫶ꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯪ꯬꯭꯰-꯹가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻ︀-️︠-︦︳︴﹍-﹏ﹰ-ﹴﹶ-ﻼ０-９Ａ-Ｚ＿ａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]") }, fc = { name: "SyntaxTree", processComment: function processComment(a) {
        var b, c;
        if (!(a.type === bc.Program && a.body.length > 0)) {
          for (pc.trailingComments.length > 0 ? pc.trailingComments[0].range[0] >= a.range[1] ? (c = pc.trailingComments, pc.trailingComments = []) : pc.trailingComments.length = 0 : pc.bottomRightStack.length > 0 && pc.bottomRightStack[pc.bottomRightStack.length - 1].trailingComments && pc.bottomRightStack[pc.bottomRightStack.length - 1].trailingComments[0].range[0] >= a.range[1] && (c = pc.bottomRightStack[pc.bottomRightStack.length - 1].trailingComments, delete pc.bottomRightStack[pc.bottomRightStack.length - 1].trailingComments); pc.bottomRightStack.length > 0 && pc.bottomRightStack[pc.bottomRightStack.length - 1].range[0] >= a.range[0];) b = pc.bottomRightStack.pop();b ? b.leadingComments && b.leadingComments[b.leadingComments.length - 1].range[1] <= a.range[0] && (a.leadingComments = b.leadingComments, delete b.leadingComments) : pc.leadingComments.length > 0 && pc.leadingComments[pc.leadingComments.length - 1].range[1] <= a.range[0] && (a.leadingComments = pc.leadingComments, pc.leadingComments = []), c && (a.trailingComments = c), pc.bottomRightStack.push(a);
        }
      }, markEnd: function markEnd(a, b) {
        return (pc.range && (a.range = [b.start, ic]), pc.loc && (a.loc = new M(void 0 === b.startLineNumber ? b.lineNumber : b.startLineNumber, b.start - (void 0 === b.startLineStart ? b.lineStart : b.startLineStart), jc, ic - kc), this.postProcess(a)), pc.attachComment && this.processComment(a), a);
      }, postProcess: function postProcess(a) {
        return (pc.source && (a.loc.source = pc.source), a);
      }, createArrayExpression: function createArrayExpression(a) {
        return { type: bc.ArrayExpression, elements: a };
      }, createAssignmentExpression: function createAssignmentExpression(a, b, c) {
        return { type: bc.AssignmentExpression, operator: a, left: b, right: c };
      }, createBinaryExpression: function createBinaryExpression(a, b, c) {
        var d = "||" === a || "&&" === a ? bc.LogicalExpression : bc.BinaryExpression;return { type: d, operator: a, left: b, right: c };
      }, createBlockStatement: function createBlockStatement(a) {
        return { type: bc.BlockStatement, body: a };
      }, createBreakStatement: function createBreakStatement(a) {
        return { type: bc.BreakStatement, label: a };
      }, createCallExpression: function createCallExpression(a, b) {
        return { type: bc.CallExpression, callee: a, arguments: b };
      }, createCatchClause: function createCatchClause(a, b) {
        return { type: bc.CatchClause, param: a, body: b };
      }, createConditionalExpression: function createConditionalExpression(a, b, c) {
        return { type: bc.ConditionalExpression, test: a, consequent: b, alternate: c };
      }, createContinueStatement: function createContinueStatement(a) {
        return { type: bc.ContinueStatement, label: a };
      }, createDebuggerStatement: function createDebuggerStatement() {
        return { type: bc.DebuggerStatement };
      }, createDoWhileStatement: function createDoWhileStatement(a, b) {
        return { type: bc.DoWhileStatement, body: a, test: b };
      }, createEmptyStatement: function createEmptyStatement() {
        return { type: bc.EmptyStatement };
      }, createExpressionStatement: function createExpressionStatement(a) {
        return { type: bc.ExpressionStatement, expression: a };
      }, createForStatement: function createForStatement(a, b, c, d) {
        return { type: bc.ForStatement, init: a, test: b, update: c, body: d };
      }, createForInStatement: function createForInStatement(a, b, c) {
        return { type: bc.ForInStatement, left: a, right: b, body: c, each: !1 };
      }, createFunctionDeclaration: function createFunctionDeclaration(a, b, c, d) {
        return { type: bc.FunctionDeclaration, id: a, params: b, defaults: c, body: d, rest: null, generator: !1, expression: !1 };
      }, createFunctionExpression: function createFunctionExpression(a, b, c, d) {
        return { type: bc.FunctionExpression, id: a, params: b, defaults: c, body: d, rest: null, generator: !1, expression: !1 };
      }, createIdentifier: function createIdentifier(a) {
        return { type: bc.Identifier, name: a };
      }, createIfStatement: function createIfStatement(a, b, c) {
        return { type: bc.IfStatement, test: a, consequent: b, alternate: c };
      }, createLabeledStatement: function createLabeledStatement(a, b) {
        return { type: bc.LabeledStatement, label: a, body: b };
      }, createLiteral: function createLiteral(a) {
        return { type: bc.Literal, value: a.value, raw: gc.slice(a.start, a.end) };
      }, createMemberExpression: function createMemberExpression(a, b, c) {
        return { type: bc.MemberExpression, computed: "[" === a, object: b, property: c };
      }, createNewExpression: function createNewExpression(a, b) {
        return { type: bc.NewExpression, callee: a, arguments: b };
      }, createObjectExpression: function createObjectExpression(a) {
        return { type: bc.ObjectExpression, properties: a };
      }, createPostfixExpression: function createPostfixExpression(a, b) {
        return { type: bc.UpdateExpression, operator: a, argument: b, prefix: !1 };
      }, createProgram: function createProgram(a) {
        return { type: bc.Program, body: a };
      }, createProperty: function createProperty(a, b, c) {
        return { type: bc.Property, key: b, value: c, kind: a };
      }, createReturnStatement: function createReturnStatement(a) {
        return { type: bc.ReturnStatement, argument: a };
      }, createSequenceExpression: function createSequenceExpression(a) {
        return { type: bc.SequenceExpression, expressions: a };
      }, createSwitchCase: function createSwitchCase(a, b) {
        return { type: bc.SwitchCase, test: a, consequent: b };
      }, createSwitchStatement: function createSwitchStatement(a, b) {
        return { type: bc.SwitchStatement, discriminant: a, cases: b };
      }, createThisExpression: function createThisExpression() {
        return { type: bc.ThisExpression };
      }, createThrowStatement: function createThrowStatement(a) {
        return { type: bc.ThrowStatement, argument: a };
      }, createTryStatement: function createTryStatement(a, b, c, d) {
        return { type: bc.TryStatement, block: a, guardedHandlers: b, handlers: c, finalizer: d };
      }, createUnaryExpression: function createUnaryExpression(a, b) {
        return "++" === a || "--" === a ? { type: bc.UpdateExpression, operator: a, argument: b, prefix: !0 } : { type: bc.UnaryExpression, operator: a, argument: b, prefix: !0 };
      }, createVariableDeclaration: function createVariableDeclaration(a, b) {
        return { type: bc.VariableDeclaration, declarations: a, kind: b };
      }, createVariableDeclarator: function createVariableDeclarator(a, b) {
        return { type: bc.VariableDeclarator, id: a, init: b };
      }, createWhileStatement: function createWhileStatement(a, b) {
        return { type: bc.WhileStatement, test: a, body: b };
      }, createWithStatement: function createWithStatement(a, b) {
        return { type: bc.WithStatement, object: a, body: b };
      } }, a.version = "1.2.2", a.tokenize = Yb, a.parse = Zb, a.Syntax = (function () {
      var a,
          b = {};"function" == typeof Object.create && (b = Object.create(null));for (a in bc) bc.hasOwnProperty(a) && (b[a] = bc[a]);return ("function" == typeof Object.freeze && Object.freeze(b), b);
    })();
  });
})(null), /*!
          * falafel (c) James Halliday / MIT License
          * https://github.com/substack/node-falafel
          */
(function (a, b) {
  function c(a, b, c) {
    function d(b) {
      c[a.range[0]] = b;for (var d = a.range[0] + 1; d < a.range[1]; d++) c[d] = "";
    }if (a.range) if ((a.parent = b, a.source = function () {
      return c.slice(a.range[0], a.range[1]).join("");
    }, a.update && "object" == typeof a.update)) {
      var g = a.update;f(e(g), function (a) {
        d[a] = g[a];
      }), a.update = d;
    } else a.update = d;
  }var d = a("esprima").parse,
      e = Object.keys || function (a) {
    var b = [];for (var c in a) b.push(c);return b;
  },
      f = function f(a, b) {
    if (a.forEach) return a.forEach(b);for (var c = 0; c < a.length; c++) b.call(a, a[c], c, a);
  },
      g = Array.isArray || function (a) {
    return "[object Array]" === Object.prototype.toString.call(a);
  };b.exports = function (a, b, h) {
    "function" == typeof b && (h = b, b = {}), "object" == typeof a && (b = a, a = b.source, delete b.source), a = void 0 === a ? b.source : a, b.range = !0, "string" != typeof a && (a = String(a));var i = d(a, b),
        j = { chunks: a.split(""), toString: function toString() {
        return j.chunks.join("");
      }, inspect: function inspect() {
        return j.toString();
      } };return ((function k(a, b) {
      c(a, b, j.chunks), f(e(a), function (b) {
        if ("parent" !== b) {
          var d = a[b];g(d) ? f(d, function (b) {
            b && "string" == typeof b.type && k(b, a);
          }) : d && "string" == typeof d.type && (c(d, a, j.chunks), k(d, a));
        }
      }), h(a);
    })(i, void 0), j);
  }, window.falafel = b.exports;
})(function () {
  return { parse: esprima.parse };
}, { exports: {} });var inBrowser = "undefined" != typeof window && undefined === window,
    parseAndModify = inBrowser ? window.falafel : require("falafel");(inBrowser ? window : exports).blanket = (function () {
  var a,
      b = ["ExpressionStatement", "BreakStatement", "ContinueStatement", "VariableDeclaration", "ReturnStatement", "ThrowStatement", "TryStatement", "FunctionDeclaration", "IfStatement", "WhileStatement", "DoWhileStatement", "ForStatement", "ForInStatement", "SwitchStatement", "WithStatement"],
      c = ["IfStatement", "WhileStatement", "DoWhileStatement", "ForStatement", "ForInStatement", "WithStatement"],
      d = Math.floor(1e3 * Math.random()),
      e = {},
      f = { reporter: null, adapter: null, filter: null, customVariable: null, loader: null, ignoreScriptError: !1, existingRequireJS: !1, autoStart: !1, timeout: 180, ignoreCors: !1, branchTracking: !1, sourceURL: !1, debug: !1, engineOnly: !1, testReadyCallback: null, commonJS: !1, instrumentCache: !1, modulePattern: null };return (inBrowser && "undefined" != typeof window.blanket && (a = window.blanket.noConflict()), _blanket = { noConflict: function noConflict() {
      return a ? a : _blanket;
    }, _getCopyNumber: function _getCopyNumber() {
      return d;
    }, extend: function extend(a) {
      _blanket._extend(_blanket, a);
    }, _extend: function _extend(a, b) {
      if (b) for (var c in b) a[c] instanceof Object && "function" != typeof a[c] ? _blanket._extend(a[c], b[c]) : a[c] = b[c];
    }, getCovVar: function getCovVar() {
      var a = _blanket.options("customVariable");return a ? (_blanket.options("debug") && console.log("BLANKET-Using custom tracking variable:", a), inBrowser ? "window." + a : a) : inBrowser ? "window._$blanket" : "_$jscoverage";
    }, options: function options(a, b) {
      if ("string" != typeof a) _blanket._extend(f, a);else {
        if ("undefined" == typeof b) return f[a];f[a] = b;
      }
    }, instrument: function instrument(a, b) {
      var c = a.inputFile,
          d = a.inputFileName;if (_blanket.options("instrumentCache") && sessionStorage && sessionStorage.getItem("blanket_instrument_store-" + d)) _blanket.options("debug") && console.log("BLANKET-Reading instrumentation from cache: ", d), b(sessionStorage.getItem("blanket_instrument_store-" + d));else {
        var e = _blanket._prepareSource(c);_blanket._trackingArraySetup = [], c = c.replace(/^\#\!.*/, "");var f = parseAndModify(c, { loc: !0, comment: !0 }, _blanket._addTracking(d));f = _blanket._trackingSetup(d, e) + f, _blanket.options("sourceURL") && (f += "\n//@ sourceURL=" + d.replace("http://", "")), _blanket.options("debug") && console.log("BLANKET-Instrumented file: ", d), _blanket.options("instrumentCache") && sessionStorage && (_blanket.options("debug") && console.log("BLANKET-Saving instrumentation to cache: ", d), sessionStorage.setItem("blanket_instrument_store-" + d, f)), b(f);
      }
    }, _trackingArraySetup: [], _branchingArraySetup: [], _prepareSource: function _prepareSource(a) {
      return a.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/(\r\n|\n|\r)/gm, "\n").split("\n");
    }, _trackingSetup: function _trackingSetup(a, b) {
      var c = _blanket.options("branchTracking"),
          d = b.join("',\n'"),
          e = "",
          f = _blanket.getCovVar();return (e += "if (typeof " + f + " === 'undefined') " + f + " = {};\n", c && (e += "var _$branchFcn=function(f,l,c,r){ ", e += "if (!!r) { ", e += f + "[f].branchData[l][c][0] = " + f + "[f].branchData[l][c][0] || [];", e += f + "[f].branchData[l][c][0].push(r); }", e += "else { ", e += f + "[f].branchData[l][c][1] = " + f + "[f].branchData[l][c][1] || [];", e += f + "[f].branchData[l][c][1].push(r); }", e += "return r;};\n"), e += "if (typeof " + f + "['" + a + "'] === 'undefined'){", e += f + "['" + a + "']=[];\n", c && (e += f + "['" + a + "'].branchData=[];\n"), e += f + "['" + a + "'].source=['" + d + "'];\n", _blanket._trackingArraySetup.sort(function (a, b) {
        return parseInt(a, 10) > parseInt(b, 10);
      }).forEach(function (b) {
        e += f + "['" + a + "'][" + b + "]=0;\n";
      }), c && _blanket._branchingArraySetup.sort(function (a, b) {
        return a.line > b.line;
      }).sort(function (a, b) {
        return a.column > b.column;
      }).forEach(function (b) {
        b.file === a && (e += "if (typeof " + f + "['" + a + "'].branchData[" + b.line + "] === 'undefined'){\n", e += f + "['" + a + "'].branchData[" + b.line + "]=[];\n", e += "}", e += f + "['" + a + "'].branchData[" + b.line + "][" + b.column + "] = [];\n", e += f + "['" + a + "'].branchData[" + b.line + "][" + b.column + "].consequent = " + JSON.stringify(b.consequent) + ";\n", e += f + "['" + a + "'].branchData[" + b.line + "][" + b.column + "].alternate = " + JSON.stringify(b.alternate) + ";\n");
      }), e += "}");
    }, _blockifyIf: function _blockifyIf(a) {
      if (c.indexOf(a.type) > -1) {
        var b = a.consequent || a.body,
            d = a.alternate;d && "BlockStatement" !== d.type && d.update("{\n" + d.source() + "}\n"), b && "BlockStatement" !== b.type && b.update("{\n" + b.source() + "}\n");
      }
    }, _trackBranch: function _trackBranch(a, b) {
      var c = a.loc.start.line,
          d = a.loc.start.column;_blanket._branchingArraySetup.push({ line: c, column: d, file: b, consequent: a.consequent.loc, alternate: a.alternate.loc });var e = "_$branchFcn('" + b + "'," + c + "," + d + "," + a.test.source() + ")?" + a.consequent.source() + ":" + a.alternate.source();a.update(e);
    }, _addTracking: function _addTracking(a) {
      var c = _blanket.getCovVar();return function (d) {
        if ((_blanket._blockifyIf(d), b.indexOf(d.type) > -1 && "LabeledStatement" !== d.parent.type)) {
          if ((_blanket._checkDefs(d, a), "VariableDeclaration" === d.type && ("ForStatement" === d.parent.type || "ForInStatement" === d.parent.type))) return;if (!d.loc || !d.loc.start) throw new Error("The instrumenter encountered a node with no location: " + Object.keys(d));d.update(c + "['" + a + "'][" + d.loc.start.line + "]++;\n" + d.source()), _blanket._trackingArraySetup.push(d.loc.start.line);
        } else _blanket.options("branchTracking") && "ConditionalExpression" === d.type && _blanket._trackBranch(d, a);
      };
    }, _checkDefs: function _checkDefs(a, b) {
      if (inBrowser) {
        if (("VariableDeclaration" === a.type && a.declarations && a.declarations.forEach(function (c) {
          if ("window" === c.id.name) throw new Error("Instrumentation error, you cannot redefine the 'window' variable in  " + b + ":" + a.loc.start.line);
        }), "FunctionDeclaration" === a.type && a.params && a.params.forEach(function (c) {
          if ("window" === c.name) throw new Error("Instrumentation error, you cannot redefine the 'window' variable in  " + b + ":" + a.loc.start.line);
        }), "ExpressionStatement" === a.type && a.expression && a.expression.left && a.expression.left.object && a.expression.left.property && a.expression.left.object.name + "." + a.expression.left.property.name === _blanket.getCovVar())) throw new Error("Instrumentation error, you cannot redefine the coverage variable in  " + b + ":" + a.loc.start.line);
      } else if ("ExpressionStatement" === a.type && a.expression && a.expression.left && !a.expression.left.object && !a.expression.left.property && a.expression.left.name === _blanket.getCovVar()) throw new Error("Instrumentation error, you cannot redefine the coverage variable in  " + b + ":" + a.loc.start.line);
    }, setupCoverage: function setupCoverage() {
      e.instrumentation = "blanket", e.stats = { suites: 0, tests: 0, passes: 0, pending: 0, failures: 0, start: new Date() };
    }, _checkIfSetup: function _checkIfSetup() {
      if (!e.stats) throw new Error("You must call blanket.setupCoverage() first.");
    }, onTestStart: function onTestStart() {
      _blanket.options("debug") && console.log("BLANKET-Test event started"), this._checkIfSetup(), e.stats.tests++, e.stats.pending++;
    }, onTestDone: function onTestDone(a, b) {
      this._checkIfSetup(), b === a ? e.stats.passes++ : e.stats.failures++, e.stats.pending--;
    }, onModuleStart: function onModuleStart() {
      this._checkIfSetup(), e.stats.suites++;
    }, onTestsDone: function onTestsDone() {
      _blanket.options("debug") && console.log("BLANKET-Test event done"), this._checkIfSetup(), e.stats.end = new Date(), inBrowser ? this.report(e) : (_blanket.options("branchTracking") || delete (inBrowser ? window : global)[_blanket.getCovVar()].branchFcn, this.options("reporter").call(this, e));
    } });
})(), (function (a) {
  var b = a.options;a.extend({ outstandingRequireFiles: [], options: function options(c, d) {
      var e = {};if ("string" != typeof c) b(c), e = c;else {
        if ("undefined" == typeof d) return b(c);b(c, d), e[c] = d;
      }e.adapter && a._loadFile(e.adapter), e.loader && a._loadFile(e.loader);
    }, requiringFile: function requiringFile(b, c) {
      "undefined" == typeof b ? a.outstandingRequireFiles = [] : "undefined" == typeof c ? a.outstandingRequireFiles.push(b) : a.outstandingRequireFiles.splice(a.outstandingRequireFiles.indexOf(b), 1);
    }, requireFilesLoaded: function requireFilesLoaded() {
      return 0 === a.outstandingRequireFiles.length;
    }, showManualLoader: function showManualLoader() {
      if (!document.getElementById("blanketLoaderDialog")) {
        var a = "<div class='blanketDialogOverlay'>";a += "&nbsp;</div>", a += "<div class='blanketDialogVerticalOffset'>", a += "<div class='blanketDialogBox'>", a += "<b>Error:</b> Blanket.js encountered a cross origin request error while instrumenting the source files.  ", a += "<br><br>This is likely caused by the source files being referenced locally (using the file:// protocol). ", a += "<br><br>Some solutions include <a href='http://askubuntu.com/questions/160245/making-google-chrome-option-allow-file-access-from-files-permanent' target='_blank'>starting Chrome with special flags</a>, <a target='_blank' href='https://github.com/remy/servedir'>running a server locally</a>, or using a browser without these CORS restrictions (Safari).", a += "<br>", "undefined" != typeof FileReader && (a += "<br>Or, try the experimental loader.  When prompted, simply click on the directory containing all the source files you want covered.", a += "<a href='javascript:document.getElementById(\"fileInput\").click();'>Start Loader</a>", a += "<input type='file' type='application/x-javascript' accept='application/x-javascript' webkitdirectory id='fileInput' multiple onchange='window.blanket.manualFileLoader(this.files)' style='visibility:hidden;position:absolute;top:-50;left:-50'/>"), a += "<br><span style='float:right;cursor:pointer;'  onclick=document.getElementById('blanketLoaderDialog').style.display='none';>Close</span>", a += "<div style='clear:both'></div>", a += "</div></div>";var b = ".blanketDialogWrapper {";b += "display:block;", b += "position:fixed;", b += "z-index:40001; }", b += ".blanketDialogOverlay {", b += "position:fixed;", b += "width:100%;", b += "height:100%;", b += "background-color:black;", b += "opacity:.5; ", b += "-ms-filter:'progid:DXImageTransform.Microsoft.Alpha(Opacity=50)'; ", b += "filter:alpha(opacity=50); ", b += "z-index:40001; }", b += ".blanketDialogVerticalOffset { ", b += "position:fixed;", b += "top:30%;", b += "width:100%;", b += "z-index:40002; }", b += ".blanketDialogBox { ", b += "width:405px; ", b += "position:relative;", b += "margin:0 auto;", b += "background-color:white;", b += "padding:10px;", b += "border:1px solid black; }";var c = document.createElement("style");c.innerHTML = b, document.head.appendChild(c);var d = document.createElement("div");d.id = "blanketLoaderDialog", d.className = "blanketDialogWrapper", d.innerHTML = a, document.body.insertBefore(d, document.body.firstChild);
      }
    }, manualFileLoader: function manualFileLoader(a) {
      function b(a) {
        var b = new FileReader();b.onload = g, b.readAsText(a);
      }var c = Array.prototype.slice;a = c.call(a).filter(function (a) {
        return "" !== a.type;
      });var d = a.length - 1,
          e = 0,
          f = {};sessionStorage.blanketSessionLoader && (f = JSON.parse(sessionStorage.blanketSessionLoader));var g = function g(c) {
        var g = c.currentTarget.result,
            h = a[e],
            i = h.webkitRelativePath && "" !== h.webkitRelativePath ? h.webkitRelativePath : h.name;f[i] = g, e++, e === d ? (sessionStorage.setItem("blanketSessionLoader", JSON.stringify(f)), document.location.reload()) : b(a[e]);
      };b(a[e]);
    }, _loadFile: function _loadFile(b) {
      if ("undefined" != typeof b) {
        var c = new XMLHttpRequest();c.open("GET", b, !1), c.send(), a._addScript(c.responseText);
      }
    }, _addScript: function _addScript(a) {
      var b = document.createElement("script");b.type = "text/javascript", b.text = a, (document.body || document.getElementsByTagName("head")[0]).appendChild(b);
    }, hasAdapter: function hasAdapter() {
      return null !== a.options("adapter");
    }, report: function report(b) {
      document.getElementById("blanketLoaderDialog") || (a.blanketSession = null), b.files = window._$blanket;blanket.options("commonJS") ? blanket._commonjs.require : window.require;if (!b.files || !Object.keys(b.files).length) return void (a.options("debug") && console.log("BLANKET-Reporting No files were instrumented."));if (("undefined" != typeof b.files.branchFcn && delete b.files.branchFcn, "string" == typeof a.options("reporter"))) a._loadFile(a.options("reporter")), a.customReporter(b, a.options("reporter_options"));else if ("function" == typeof a.options("reporter")) a.options("reporter")(b, a.options("reporter_options"));else {
        if ("function" != typeof a.defaultReporter) throw new Error("no reporter defined.");a.defaultReporter(b, a.options("reporter_options"));
      }
    }, _bindStartTestRunner: function _bindStartTestRunner(a, b) {
      a ? a(b) : window.addEventListener("load", b, !1);
    }, _loadSourceFiles: function _loadSourceFiles(b) {
      blanket.options("commonJS") ? blanket._commonjs.require : window.require;a.options("debug") && console.log("BLANKET-Collecting page scripts");var c = a.utils.collectPageScripts();if (0 === c.length) b();else {
        sessionStorage.blanketSessionLoader && (a.blanketSession = JSON.parse(sessionStorage.blanketSessionLoader)), c.forEach(function (b) {
          a.utils.cache[b] = { loaded: !1 };
        });var d = -1;a.utils.loadAll(function (a) {
          return a ? "undefined" != typeof c[d + 1] : (d++, d >= c.length ? null : c[d]);
        }, b);
      }
    }, beforeStartTestRunner: function beforeStartTestRunner(b) {
      b = b || {}, b.checkRequirejs = "undefined" == typeof b.checkRequirejs ? !0 : b.checkRequirejs, b.callback = b.callback || function () {}, b.coverage = "undefined" == typeof b.coverage ? !0 : b.coverage, b.coverage ? a._bindStartTestRunner(b.bindEvent, function () {
        a._loadSourceFiles(function () {
          var c = function c() {
            return b.condition ? b.condition() : a.requireFilesLoaded();
          },
              d = function d() {
            if (c()) {
              a.options("debug") && console.log("BLANKET-All files loaded, init start test runner callback.");var e = a.options("testReadyCallback");e ? "function" == typeof e ? e(b.callback) : "string" == typeof e && (a._addScript(e), b.callback()) : b.callback();
            } else setTimeout(d, 13);
          };d();
        });
      }) : b.callback();
    }, utils: { qualifyURL: function qualifyURL(a) {
        var b = document.createElement("a");return (b.href = a, b.href);
      } } });
})(blanket), blanket.defaultReporter = function (a) {
  function b(a) {
    var b = document.getElementById(a);b.style.display = "block" === b.style.display ? "none" : "block";
  }function c(a) {
    return a.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/\>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;");
  }function d(a, b) {
    var c = b ? 0 : 1;return "undefined" == typeof a || null === typeof a || "undefined" == typeof a[c] ? !1 : a[c].length > 0;
  }function e(a, b, f, g, h) {
    var i = "",
        j = "";if (q.length > 0) if ((i += "<span class='" + (d(q[0][1], q[0][1].consequent === q[0][0]) ? "branchOkay" : "branchWarning") + "'>", q[0][0].end.line === h)) {
      if ((i += c(b.slice(0, q[0][0].end.column)) + "</span>", b = b.slice(q[0][0].end.column), q.shift(), q.length > 0)) if ((i += "<span class='" + (d(q[0][1], !1) ? "branchOkay" : "branchWarning") + "'>", q[0][0].end.line === h)) {
        if ((i += c(b.slice(0, q[0][0].end.column)) + "</span>", b = b.slice(q[0][0].end.column), q.shift(), !f)) return { src: i + c(b), cols: f };
      } else {
        if (!f) return { src: i + c(b) + "</span>", cols: f };j = "</span>";
      } else if (!f) return { src: i + c(b), cols: f };
    } else {
      if (!f) return { src: i + c(b) + "</span>", cols: f };j = "</span>";
    }var k = f[a],
        l = k.consequent;if (l.start.line > h) q.unshift([k.alternate, k]), q.unshift([l, k]), b = c(b);else {
      var m = "<span class='" + (d(k, !0) ? "branchOkay" : "branchWarning") + "'>";if ((i += c(b.slice(0, l.start.column - g)) + m, f.length > a + 1 && f[a + 1].consequent.start.line === h && f[a + 1].consequent.start.column - g < f[a].consequent.end.column - g)) {
        var n = e(a + 1, b.slice(l.start.column - g, l.end.column - g), f, l.start.column - g, h);i += n.src, f = n.cols, f[a + 1] = f[a + 2], f.length--;
      } else i += c(b.slice(l.start.column - g, l.end.column - g));i += "</span>";var o = k.alternate;if (o.start.line > h) i += c(b.slice(l.end.column - g)), q.unshift([o, k]);else {
        if ((i += c(b.slice(l.end.column - g, o.start.column - g)), m = "<span class='" + (d(k, !1) ? "branchOkay" : "branchWarning") + "'>", i += m, f.length > a + 1 && f[a + 1].consequent.start.line === h && f[a + 1].consequent.start.column - g < f[a].alternate.end.column - g)) {
          var p = e(a + 1, b.slice(o.start.column - g, o.end.column - g), f, o.start.column - g, h);i += p.src, f = p.cols, f[a + 1] = f[a + 2], f.length--;
        } else i += c(b.slice(o.start.column - g, o.end.column - g));i += "</span>", i += c(b.slice(o.end.column - g)), b = i;
      }
    }return { src: b + j, cols: f };
  }var f = "#blanket-main {margin:2px;background:#EEE;color:#333;clear:both;font-family:'Helvetica Neue Light', 'HelveticaNeue-Light', 'Helvetica Neue', Calibri, Helvetica, Arial, sans-serif; font-size:17px;} #blanket-main a {color:#333;text-decoration:none;}  #blanket-main a:hover {text-decoration:underline;} .blanket {margin:0;padding:5px;clear:both;border-bottom: 1px solid #FFFFFF;} .bl-error {color:red;}.bl-success {color:#5E7D00;} .bl-file{width:auto;} .bl-cl{float:left;} .blanket div.rs {margin-left:50px; width:150px; float:right} .bl-nb {padding-right:10px;} #blanket-main a.bl-logo {color: #EB1764;cursor: pointer;font-weight: bold;text-decoration: none} .bl-source{ overflow-x:scroll; background-color: #FFFFFF; border: 1px solid #CBCBCB; color: #363636; margin: 25px 20px; width: 80%;} .bl-source div{white-space: pre;font-family: monospace;} .bl-source > div > span:first-child{background-color: #EAEAEA;color: #949494;display: inline-block;padding: 0 10px;text-align: center;width: 30px;} .bl-source .miss{background-color:#e6c3c7} .bl-source span.branchWarning{color:#000;background-color:yellow;} .bl-source span.branchOkay{color:#000;background-color:transparent;}",
      g = 60,
      h = document.head,
      i = 0,
      j = document.body,
      k = Object.keys(a.files).some(function (b) {
    return "undefined" != typeof a.files[b].branchData;
  }),
      l = "<div id='blanket-main'><div class='blanket bl-title'><div class='bl-cl bl-file'><a href='http://alex-seville.github.com/blanket/' target='_blank' class='bl-logo'>Blanket.js</a> results</div><div class='bl-cl rs'>Coverage (%)</div><div class='bl-cl rs'>Covered/Total Smts.</div>" + (k ? "<div class='bl-cl rs'>Covered/Total Branches</div>" : "") + "<div style='clear:both;'></div></div>",
      m = "<div class='blanket {{statusclass}}'><div class='bl-cl bl-file'><span class='bl-nb'>{{fileNumber}}.</span><a href='javascript:blanket_toggleSource(\"file-{{fileNumber}}\")'>{{file}}</a></div><div class='bl-cl rs'>{{percentage}} %</div><div class='bl-cl rs'>{{numberCovered}}/{{totalSmts}}</div>" + (k ? "<div class='bl-cl rs'>{{passedBranches}}/{{totalBranches}}</div>" : "") + "<div id='file-{{fileNumber}}' class='bl-source' style='display:none;'>{{source}}</div><div style='clear:both;'></div></div>";grandTotalTemplate = "<div class='blanket grand-total {{statusclass}}'><div class='bl-cl'>{{rowTitle}}</div><div class='bl-cl rs'>{{percentage}} %</div><div class='bl-cl rs'>{{numberCovered}}/{{totalSmts}}</div>" + (k ? "<div class='bl-cl rs'>{{passedBranches}}/{{totalBranches}}</div>" : "") + "<div style='clear:both;'></div></div>";var n = document.createElement("script");n.type = "text/javascript", n.text = b.toString().replace("function " + b.name, "function blanket_toggleSource"), j.appendChild(n);var o = function o(a, b) {
    return Math.round(a / b * 100 * 100) / 100;
  },
      p = function p(a, b, c) {
    var d = document.createElement(a);d.innerHTML = c, b.appendChild(d);
  },
      q = [],
      r = function r(a) {
    return "undefined" != typeof a;
  },
      s = a.files,
      t = { totalSmts: 0, numberOfFilesCovered: 0, passedBranches: 0, totalBranches: 0, moduleTotalStatements: {}, moduleTotalCoveredStatements: {}, moduleTotalBranches: {}, moduleTotalCoveredBranches: {} },
      u = _blanket.options("modulePattern"),
      v = u ? new RegExp(u) : null;for (var w in s) if (s.hasOwnProperty(w)) {
    i++;var x,
        y = s[w],
        z = 0,
        A = 0,
        B = [];for (x = 0; x < y.source.length; x += 1) {
      var C = y.source[x];if (q.length > 0 || "undefined" != typeof y.branchData) if ("undefined" != typeof y.branchData[x + 1]) {
        var D = y.branchData[x + 1].filter(r),
            E = 0;C = e(E, C, D, 0, x + 1).src;
      } else C = q.length ? e(0, C, null, 0, x + 1).src : c(C);else C = c(C);var F = "";y[x + 1] ? (A += 1, z += 1, F = "hit") : 0 === y[x + 1] && (z++, F = "miss"), B[x + 1] = "<div class='" + F + "'><span class=''>" + (x + 1) + "</span>" + C + "</div>";
    }t.totalSmts += z, t.numberOfFilesCovered += A;var G = 0,
        H = 0;if ("undefined" != typeof y.branchData) for (var I = 0; I < y.branchData.length; I++) if ("undefined" != typeof y.branchData[I]) for (var J = 0; J < y.branchData[I].length; J++) "undefined" != typeof y.branchData[I][J] && (G++, "undefined" != typeof y.branchData[I][J][0] && y.branchData[I][J][0].length > 0 && "undefined" != typeof y.branchData[I][J][1] && y.branchData[I][J][1].length > 0 && H++);if ((t.passedBranches += H, t.totalBranches += G, v)) {
      var K = w.match(v)[1];t.moduleTotalStatements.hasOwnProperty(K) || (t.moduleTotalStatements[K] = 0, t.moduleTotalCoveredStatements[K] = 0), t.moduleTotalStatements[K] += z, t.moduleTotalCoveredStatements[K] += A, t.moduleTotalBranches.hasOwnProperty(K) || (t.moduleTotalBranches[K] = 0, t.moduleTotalCoveredBranches[K] = 0), t.moduleTotalBranches[K] += G, t.moduleTotalCoveredBranches[K] += H;
    }var L = o(A, z),
        M = m.replace("{{file}}", w).replace("{{percentage}}", L).replace("{{numberCovered}}", A).replace(/\{\{fileNumber\}\}/g, i).replace("{{totalSmts}}", z).replace("{{totalBranches}}", G).replace("{{passedBranches}}", H).replace("{{source}}", B.join(" "));M = g > L ? M.replace("{{statusclass}}", "bl-error") : M.replace("{{statusclass}}", "bl-success"), l += M;
  }var N = function N(a, b, c, d, e) {
    var f = o(b, a),
        h = g > f ? "bl-error" : "bl-success",
        i = e ? "Total for module: " + e : "Global total",
        j = grandTotalTemplate.replace("{{rowTitle}}", i).replace("{{percentage}}", f).replace("{{numberCovered}}", b).replace("{{totalSmts}}", a).replace("{{passedBranches}}", d).replace("{{totalBranches}}", c).replace("{{statusclass}}", h);l += j;
  };if (v) for (var O in t.moduleTotalStatements) if (t.moduleTotalStatements.hasOwnProperty(O)) {
    var P = t.moduleTotalStatements[O],
        Q = t.moduleTotalCoveredStatements[O],
        R = t.moduleTotalBranches[O],
        S = t.moduleTotalCoveredBranches[O];N(P, Q, R, S, O);
  }N(t.totalSmts, t.numberOfFilesCovered, t.totalBranches, t.passedBranches, null), l += "</div>", p("style", h, f), document.getElementById("blanket-main") ? document.getElementById("blanket-main").innerHTML = l.slice(23, -6) : p("div", j, l);
}, (function () {
  var a = {},
      b = Array.prototype.slice,
      c = b.call(document.scripts);b.call(c[c.length - 1].attributes).forEach(function (b) {
    if (("data-cover-only" === b.nodeName && (a.filter = b.nodeValue), "data-cover-never" === b.nodeName && (a.antifilter = b.nodeValue), "data-cover-reporter" === b.nodeName && (a.reporter = b.nodeValue), "data-cover-adapter" === b.nodeName && (a.adapter = b.nodeValue), "data-cover-loader" === b.nodeName && (a.loader = b.nodeValue), "data-cover-timeout" === b.nodeName && (a.timeout = b.nodeValue), "data-cover-modulepattern" === b.nodeName && (a.modulePattern = b.nodeValue), "data-cover-reporter-options" === b.nodeName)) try {
      a.reporter_options = JSON.parse(b.nodeValue);
    } catch (c) {
      if (blanket.options("debug")) throw new Error("Invalid reporter options.  Must be a valid stringified JSON object.");
    }if (("data-cover-testReadyCallback" === b.nodeName && (a.testReadyCallback = b.nodeValue), "data-cover-customVariable" === b.nodeName && (a.customVariable = b.nodeValue), "data-cover-flags" === b.nodeName)) {
      var d = " " + b.nodeValue + " ";d.indexOf(" ignoreError ") > -1 && (a.ignoreScriptError = !0), d.indexOf(" autoStart ") > -1 && (a.autoStart = !0), d.indexOf(" ignoreCors ") > -1 && (a.ignoreCors = !0), d.indexOf(" branchTracking ") > -1 && (a.branchTracking = !0), d.indexOf(" sourceURL ") > -1 && (a.sourceURL = !0), d.indexOf(" debug ") > -1 && (a.debug = !0), d.indexOf(" engineOnly ") > -1 && (a.engineOnly = !0), d.indexOf(" commonJS ") > -1 && (a.commonJS = !0), d.indexOf(" instrumentCache ") > -1 && (a.instrumentCache = !0);
    }
  }), blanket.options(a), "undefined" != typeof requirejs && blanket.options("existingRequireJS", !0), blanket.options("commonJS") && (blanket._commonjs = {});
})(), (function (a) {
  a.extend({ utils: { normalizeBackslashes: function normalizeBackslashes(a) {
        return a.replace(/\\/g, "/");
      }, matchPatternAttribute: function matchPatternAttribute(b, c) {
        if ("string" == typeof c) {
          if (0 === c.indexOf("[")) {
            var d = c.slice(1, c.length - 1).split(",");return d.some(function (c) {
              return a.utils.matchPatternAttribute(b, a.utils.normalizeBackslashes(c.slice(1, -1)));
            });
          }if (0 === c.indexOf("//")) {
            var e = c.slice(2, c.lastIndexOf("/")),
                f = c.slice(c.lastIndexOf("/") + 1),
                g = new RegExp(e, f);return g.test(b);
          }return 0 === c.indexOf("#") ? window[c.slice(1)].call(window, b) : b.indexOf(a.utils.normalizeBackslashes(c)) > -1;
        }return c instanceof Array ? c.some(function (c) {
          return a.utils.matchPatternAttribute(b, c);
        }) : c instanceof RegExp ? c.test(b) : "function" == typeof c ? c.call(window, b) : void 0;
      }, blanketEval: function blanketEval(b) {
        a._addScript(b);
      }, collectPageScripts: function collectPageScripts() {
        var b = Array.prototype.slice,
            c = (b.call(document.scripts), []),
            d = [],
            e = a.options("filter");if (null != e) {
          var f = a.options("antifilter");c = b.call(document.scripts).filter(function (c) {
            return 1 === b.call(c.attributes).filter(function (b) {
              return "src" === b.nodeName && a.utils.matchPatternAttribute(b.nodeValue, e) && ("undefined" == typeof f || !a.utils.matchPatternAttribute(b.nodeValue, f));
            }).length;
          });
        } else c = b.call(document.querySelectorAll("script[data-cover]"));return (d = c.map(function (c) {
          return a.utils.qualifyURL(b.call(c.attributes).filter(function (a) {
            return "src" === a.nodeName;
          })[0].nodeValue);
        }), e || a.options("filter", "['" + d.join("','") + "']"), d);
      }, loadAll: function loadAll(b, c) {
        var d = b(),
            e = a.utils.scriptIsLoaded(d, a.utils.ifOrdered, b, c);if (a.utils.cache[d] && a.utils.cache[d].loaded) e();else {
          var f = function f() {
            a.options("debug") && console.log("BLANKET-Mark script:" + d + ", as loaded and move to next script."), e();
          },
              g = function g(b) {
            a.options("debug") && console.log("BLANKET-File loading finished"), "undefined" != typeof b && (a.options("debug") && console.log("BLANKET-Add file to DOM."), a._addScript(b)), f();
          };a.utils.attachScript({ url: d }, function (b) {
            a.utils.processFile(b, d, g, g);
          });
        }
      }, attachScript: function attachScript(b, c) {
        var d = a.options("timeout") || 3e3;setTimeout(function () {
          if (!a.utils.cache[b.url].loaded) throw new Error("error loading source script");
        }, d), a.utils.getFile(b.url, c, function () {
          throw new Error("error loading source script");
        });
      }, ifOrdered: function ifOrdered(b, c) {
        var d = b(!0);d ? a.utils.loadAll(b, c) : c(new Error("Error in loading chain."));
      }, scriptIsLoaded: function scriptIsLoaded(b, c, d, e) {
        return (a.options("debug") && console.log("BLANKET-Returning function"), function () {
          a.options("debug") && console.log("BLANKET-Marking file as loaded: " + b), a.utils.cache[b].loaded = !0, a.utils.allLoaded() ? (a.options("debug") && console.log("BLANKET-All files loaded"), e()) : c && (a.options("debug") && console.log("BLANKET-Load next file."), c(d, e));
        });
      }, cache: {}, allLoaded: function allLoaded() {
        for (var b = Object.keys(a.utils.cache), c = 0; c < b.length; c++) if (!a.utils.cache[b[c]].loaded) return !1;return !0;
      }, processFile: function processFile(b, c, d, e) {
        var f = a.options("filter"),
            g = a.options("antifilter");"undefined" != typeof g && a.utils.matchPatternAttribute(c, g) ? (e(b), a.options("debug") && console.log("BLANKET-File will never be instrumented:" + c), a.requiringFile(c, !0)) : a.utils.matchPatternAttribute(c, f) ? (a.options("debug") && console.log("BLANKET-Attempting instrument of:" + c), a.instrument({ inputFile: b, inputFileName: c }, function (e) {
          try {
            a.options("debug") && console.log("BLANKET-instrument of:" + c + " was successfull."), a.utils.blanketEval(e), d(), a.requiringFile(c, !0);
          } catch (f) {
            if (!a.options("ignoreScriptError")) throw new Error("Error parsing instrumented code: " + f);a.options("debug") && console.log("BLANKET-There was an error loading the file:" + c), d(b), a.requiringFile(c, !0);
          }
        })) : (a.options("debug") && console.log("BLANKET-Loading (without instrumenting) the file:" + c), e(b), a.requiringFile(c, !0));
      }, cacheXhrConstructor: function cacheXhrConstructor() {
        var a, b, c;if ("undefined" != typeof XMLHttpRequest) a = XMLHttpRequest, this.createXhr = function () {
          return new a();
        };else if ("undefined" != typeof ActiveXObject) {
          for (a = ActiveXObject, b = 0; 3 > b; b += 1) {
            c = progIds[b];try {
              new ActiveXObject(c);break;
            } catch (d) {}
          }this.createXhr = function () {
            return new a(c);
          };
        }
      }, craeteXhr: function craeteXhr() {
        throw new Error("cacheXhrConstructor is supposed to overwrite this function.");
      }, getFile: function getFile(b, c, d, e) {
        var f = !1;if (a.blanketSession) for (var g = Object.keys(a.blanketSession), h = 0; h < g.length; h++) {
          var i = g[h];if (b.indexOf(i) > -1) return (c(a.blanketSession[i]), void (f = !0));
        }if (!f) {
          var j = a.utils.createXhr();j.open("GET", b, !0), e && e(j, b), j.onreadystatechange = function () {
            var a, e;4 === j.readyState && (a = j.status, a > 399 && 600 > a ? (e = new Error(b + " HTTP status: " + a), e.xhr = j, d(e)) : c(j.responseText));
          };try {
            j.send(null);
          } catch (k) {
            if (!k.code || 101 !== k.code && 1012 !== k.code || a.options("ignoreCors") !== !1) throw k;a.showManualLoader();
          }
        }
      } } }), (function () {
    var b = (blanket.options("commonJS") ? blanket._commonjs.require : window.require, blanket.options("commonJS") ? blanket._commonjs.requirejs : window.requirejs);!a.options("engineOnly") && a.options("existingRequireJS") && (a.utils.oldloader = b.load, b.load = function (b, c, d) {
      a.requiringFile(d), a.utils.getFile(d, function (e) {
        a.utils.processFile(e, d, function () {
          b.completeLoad(c);
        }, function () {
          a.utils.oldloader(b, c, d);
        });
      }, function (b) {
        throw (a.requiringFile(), b);
      });
    }), a.utils.cacheXhrConstructor();
  })();
})(blanket), (function () {
  if ("undefined" != typeof QUnit) {
    var a = function a() {
      return window.QUnit.config.queue.length > 0 && blanket.noConflict().requireFilesLoaded();
    };QUnit.config.urlConfig[0].tooltip ? (QUnit.config.urlConfig.push({ id: "coverage", label: "Enable coverage", tooltip: "Enable code coverage." }), QUnit.urlParams.coverage || blanket.options("autoStart") ? (QUnit.begin(function () {
      blanket.noConflict().setupCoverage();
    }), QUnit.done(function () {
      blanket.noConflict().onTestsDone();
    }), QUnit.moduleStart(function () {
      blanket.noConflict().onModuleStart();
    }), QUnit.testStart(function () {
      blanket.noConflict().onTestStart();
    }), QUnit.testDone(function (a) {
      blanket.noConflict().onTestDone(a.total, a.passed);
    }), blanket.noConflict().beforeStartTestRunner({ condition: a, callback: function callback() {
        (!blanket.options("existingRequireJS") || blanket.options("autoStart")) && QUnit.start();
      } })) : (blanket.options("existingRequireJS") && (requirejs.load = _blanket.utils.oldloader), blanket.noConflict().beforeStartTestRunner({ condition: a, callback: function callback() {
        (!blanket.options("existingRequireJS") || blanket.options("autoStart")) && QUnit.start();
      }, coverage: !1 }))) : (QUnit.begin = function () {
      blanket.noConflict().setupCoverage();
    }, QUnit.done = function () {
      blanket.noConflict().onTestsDone();
    }, QUnit.moduleStart = function () {
      blanket.noConflict().onModuleStart();
    }, QUnit.testStart = function () {
      blanket.noConflict().onTestStart();
    }, QUnit.testDone = function (a) {
      blanket.noConflict().onTestDone(a.total, a.passed);
    }, blanket.beforeStartTestRunner({ condition: a, callback: QUnit.start }));
  }
})();

//# sourceMappingURL=blanket-compiled.js.map