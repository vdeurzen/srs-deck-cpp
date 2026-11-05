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

- [ ] Pass a half-open iterator range `[first, last)`: `last` itself is excluded
- [ ] Erase what `remove_if` leaves: an algorithm sees only positions, so it never changes the container's size
- [ ] Compare `find_if`'s result with `end()` before using it, since it returns `last` when nothing matches
- [ ] Give `std::sort` a strict comparator: a `<=` comparator is undefined behaviour
- [ ] (empty: tick this)
