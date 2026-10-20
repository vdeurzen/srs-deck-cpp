---
id: spaceship-explain-comparisons
kind: explain
version: 1
level: 4
tags: [comparisons, interview]
requires:
  - spaceship-basics
  - spaceship-less-from-three-way
  - spaceship-produce-default
  - spaceship-hand-written-no-equality
  - spaceship-rewritten-not-equal
elaborate: Pick a type of yours that is sorted or used as a map key; say which comparisons it declares today and what it would declare in C++20.
refs:
  - https://en.cppreference.com/w/cpp/language/default_comparisons
  - https://en.cppreference.com/w/cpp/language/operator_comparison#Three-way_comparison
---
An interviewer asks how you make a C++20 type comparable, so it can be
sorted and tested for equality. Answer them.
---
- [ ] Problem: before C++20 a type needed six hand-written comparison operators, which could disagree
- [ ] Mechanism: `<=>` returns a value tested against `0`; `<`, `<=`, `>`, `>=` are rewritten through it
- [ ] Example: `auto operator<=>(const T&) const = default;` gives all six comparisons in one line
- [ ] Trade-off: a hand-written `<=>` gives no `==`; write `==` too, as equality is often cheaper
- [ ] Contrast: `!=` is rewritten from `==`, never from `<=>`
