---
id: srch-explain-sorted-search
kind: explain
version: 1
level: 4
tags: [algorithms, searching, interview]
requires:
  - srch-count-at-most-code
  - srch-contains-code
  - srch-cost
  - srch-unsorted-input
  - srch-lower-bound-worked
elaborate: Say which problem you have solved by scanning a vector that a sorted search would have answered.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
  - https://en.cppreference.com/w/cpp/algorithm/upper_bound
  - https://eel.is/c++draft/alg.binary.search
---
An interviewer asks how you search a sorted `std::vector` with the standard library. Explain.
---
- [ ] Problem: find a position or a count in sorted data without scanning every element.
- [ ] Mechanism: `lower_bound` halves the range, returning the first element not less than x.
- [ ] Example: membership checks the result isn't `end()` and holds x; lower_bound never reports "absent".
- [ ] Cost: about log₂ n comparisons, 20 for a million, against `find`'s pass over all n.
- [ ] Pitfall: unsorted input breaks the precondition, which is undefined behaviour, not "not found".
