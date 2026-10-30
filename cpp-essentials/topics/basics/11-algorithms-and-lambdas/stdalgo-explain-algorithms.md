---
id: stdalgo-explain-algorithms
kind: explain
version: 4
level: 3
tags: [algorithms, iterators]
requires:
  - stdalgo-find-if-not-found
  - stdalgo-comparator-strict
  - stdalgo-remove-if-keeps-size
refs:
  - https://en.cppreference.com/w/cpp/algorithm
  - https://en.cppreference.com/w/cpp/algorithm/find
  - https://en.cppreference.com/w/cpp/algorithm/sort
elaborate: Find a raw loop in your own code that searches or sorts; which algorithm call would replace it, and what must that call get right?
---

An interviewer sees `std::find_if` and `std::sort` in your code and asks
what a caller must get right to use the standard algorithms safely.
Explain it to them.

---

- [ ] An algorithm takes positions, not the container: a half-open iterator range `[first, last)`, `last` excluded
- [ ] Seeing only positions, it never changes the container's size; `remove_if` leaves a tail to erase
- [ ] `find_if` returns `last` when nothing matches, so compare the result with `end()` before using it
- [ ] The test or ordering is passed as a callable, usually a lambda, that the algorithm calls on elements
- [ ] The comparator must be strict: a `<=` comparator makes `std::sort` undefined behaviour
