---
id: stdalgo-explain-algorithms
kind: explain
version: 2
level: 3
tags: [algorithms, iterators]
requires:
  - stdalgo-find-if-not-found
  - stdalgo-comparator-strict
refs:
  - https://en.cppreference.com/w/cpp/algorithm
  - https://en.cppreference.com/w/cpp/algorithm/find
  - https://en.cppreference.com/w/cpp/algorithm/sort
elaborate: Find a raw loop in your own code that searches, sorts or removes; which standard algorithm would replace it?
---

An interviewer asks why you call `std::find_if(v.begin(), v.end(), test)`
instead of writing the loop yourself. Explain how the standard algorithms
work.

---

- [ ] Problem: reuse one correct search or sort on any container instead of rewriting the loop
- [ ] Mechanism: an algorithm takes a half-open iterator range `[first, last)`, often with a callable
- [ ] Example: `find_if` returns `last` when nothing matches, so compare the result with `end()`
- [ ] Cost: a search like `find_if` makes one pass, so its time grows with the range's length
- [ ] Pitfall: a `<=` comparator makes `std::sort` undefined behaviour, because the comparator must be strict
