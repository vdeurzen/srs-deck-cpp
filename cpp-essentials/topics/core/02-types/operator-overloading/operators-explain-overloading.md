---
id: operators-explain-overloading
kind: explain
version: 3
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

An interviewer asks how `a + b` can compile when `a` and `b` are structs
you defined, and how you would write that `+`. Explain it to them.

---

- [ ] `a + b` on class types calls a function named `operator+`
- [ ] That function is either the member `a.operator+(b)` or a free function taking both operands
- [ ] Write `+` by copying the left operand and applying the member `+=` to that copy
- [ ] A member operator never converts its left operand, so an `int` on the left needs a non-member
- [ ] `+=` returns a reference to `*this`; returning by value makes `(a += b) += c` update a copy
