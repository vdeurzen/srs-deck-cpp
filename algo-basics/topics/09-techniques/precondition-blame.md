---
id: technique-precondition-blame
kind: basic
version: 1
level: 1
tags: [foundations, contracts]
requires:
  - search-unsorted-input-trace
elaborate: Pick a function you wrote recently. What does it assume about its arguments that its signature does not say?
refs:
  - https://dl.acm.org/doi/10.1145/363235.363259
  - https://en.cppreference.com/w/cpp/algorithm/binary_search
---

```cpp
// pre:  a is sorted ascending
// post: returns true iff key occurs in a
bool contains(std::span<const int> a, int key);   // a binary search
```

## `contains({4, 9, 1}, 9)` returns `false`. Is `contains` broken?

---

**No: the caller broke the precondition, so the postcondition was never promised.**

A **precondition** is what the caller must make true; the
**postcondition** is what the function then guarantees on return.
Checking sortedness would cost O(n) and erase the O(log n) point of the
function, so the caller owns it.
