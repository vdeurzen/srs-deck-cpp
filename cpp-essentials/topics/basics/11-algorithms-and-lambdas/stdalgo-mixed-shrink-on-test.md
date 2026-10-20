---
id: stdalgo-mixed-shrink-on-test
kind: basic
version: 1
level: 2
tags: [algorithms, containers, recognition]
requires:
  - container-erase-if-intro
  - vector-back-pop-back
elaborate: Say which call you would use if only the last element ever needed to go, and why it is cheaper.
refs:
  - https://en.cppreference.com/w/cpp/container/vector/erase2
---

## A `std::vector<int>` of quantities must lose every zero, wherever it sits, and `size()` must drop to match. Which single call does it?

---

**`std::erase_if(v, [](int q) { return q == 0; })`: it deletes matches anywhere.**

The cue is "every match, anywhere, and the size must drop". `pop_back`
removes only the last element; `std::remove_if` packs the kept elements
but leaves `size()` unchanged.
