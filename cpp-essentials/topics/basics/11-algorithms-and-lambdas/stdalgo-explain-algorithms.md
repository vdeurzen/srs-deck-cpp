---
id: stdalgo-explain-algorithms
kind: explain
version: 4
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

An interviewer sees `std::find_if(v.begin(), v.end(), test)` in your code
and asks why you use standard algorithms such as `std::find_if` and
`std::sort` rather than your own loops, and how to call them correctly.
Explain it to them.

---

- [ ] One correct search or sort works on any container, so you never rewrite or re-debug the loop
- [ ] The name states the intent, so a reader sees "find" or "sort" without decoding a loop
- [ ] An algorithm takes a half-open iterator range `[first, last)`, often with a callable
- [ ] `find_if` returns `last` when nothing matches, so compare the result with `end()` before using it
- [ ] The comparator must be strict: a `<=` comparator makes `std::sort` undefined behaviour
