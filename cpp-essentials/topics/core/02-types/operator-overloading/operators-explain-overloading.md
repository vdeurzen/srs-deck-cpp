---
id: operators-explain-overloading
kind: explain
version: 1
level: 3
tags: [operators, classes]
requires:
  - operator-overloading-basics
  - operators-compound-returns-ref
  - operators-member-vs-free
  - operators-chunk-arithmetic-pair
refs:
  - https://en.cppreference.com/w/cpp/language/operators
  - https://en.cppreference.com/w/cpp/language/operators#Canonical_implementations
elaborate: Which type in your own code would read better with `+` or `==`, and which operator would you write first?
---

A Go teammate asks how `a + b` can compile in C++ when `a` and `b` are
structs you defined. Explain it to them.

---

- [ ] Problem: let a class type use built-in operator syntax, which Go keeps for built-in types
- [ ] Mechanism: `a + b` calls a function named `operator+`: the member `a.operator+(b)` or a free function
- [ ] Example: `+` copies its left operand and applies the member `+=` to that copy
- [ ] Trade-off: a member operator never converts its left operand, so an `int` on the left needs a non-member
- [ ] Pitfall: a `+=` that returns by value makes `(a += b) += c` update a copy
