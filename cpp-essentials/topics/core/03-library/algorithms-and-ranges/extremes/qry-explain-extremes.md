---
id: qry-explain-extremes
kind: explain
version: 1
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
- [ ] Problem: callers often need both the largest value and where it sits.
- [ ] Mechanism: one pass over the range, returning an iterator to the first largest element.
- [ ] Example: dereferencing gives the value; subtracting `v.begin()` gives its index.
- [ ] Cost: one pass; `minmax_element` finds both the smallest and the largest in that same single pass.
- [ ] Pitfall: an empty range returns `end()`, and dereferencing that is undefined behaviour.
