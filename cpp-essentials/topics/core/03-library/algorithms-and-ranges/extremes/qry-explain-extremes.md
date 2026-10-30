---
id: qry-explain-extremes
kind: explain
version: 2
level: 4
tags: [algorithms, extremes, interview]
requires:
  - qry-spread-code
  - qry-empty-range
  - qry-max-element-intro
elaborate: Say which other standard algorithms return a position for the same reason, and what each returns when nothing qualifies.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/max_element
  - https://en.cppreference.com/w/cpp/algorithm/minmax_element
---
An interviewer asks why `std::max_element` returns an iterator rather than the largest value. Explain.
---
- [ ] An iterator gives the position as well as the value: dereference it, or subtract `begin()` for the index
- [ ] An empty range has no largest value to return, so it returns `end()`; dereferencing that is undefined
- [ ] Through the iterator you can change the element in place, inside the container itself
- [ ] No copy of the element is made, which matters for large elements such as strings
- [ ] A position, like `find`'s result, can be handed straight to other calls that take iterators
