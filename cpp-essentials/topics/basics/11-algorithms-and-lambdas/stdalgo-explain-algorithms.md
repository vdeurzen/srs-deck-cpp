---
id: stdalgo-explain-algorithms
kind: explain
version: 1
level: 3
tags: [algorithms, iterators]
requires:
  - stdalgo-find-if-not-found
  - stdalgo-remove-if-keeps-size
  - stdalgo-comparator-strict
refs:
  - https://en.cppreference.com/w/cpp/algorithm
  - https://en.cppreference.com/w/cpp/algorithm/remove
  - https://en.cppreference.com/w/cpp/algorithm/sort
elaborate: Find a raw loop in your own code that searches, sorts or removes; which standard algorithm would replace it?
---

A Go teammate asks why your C++ code calls `std::find_if(v.begin(),
v.end(), test)` rather than a loop of your own. Explain to them how the
standard algorithms work.

---

- [ ] Problem: reuse one correct search, sort or removal on any container instead of rewriting the loop
- [ ] Mechanism: an algorithm takes a half-open iterator range `[first, last)`, often with a callable
- [ ] Example: `find_if` returns `last` when nothing matches, so compare the result with `end()`
- [ ] Cost: seeing only iterators, `remove_if` cannot shrink the container whose elements it moves
- [ ] Pitfall: a `<=` comparator makes `std::sort` undefined behaviour, because the comparator must be strict
