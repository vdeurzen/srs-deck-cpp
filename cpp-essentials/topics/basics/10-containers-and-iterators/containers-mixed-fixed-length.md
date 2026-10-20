---
id: containers-mixed-fixed-length
kind: basic
version: 1
level: 2
tags: [containers, recognition]
requires:
  - iter-array-fixed-size
elaborate: Say what you would choose if the point needed named fields `x`, `y`, `z` instead of indices, and what that buys.
refs:
  - https://en.cppreference.com/w/cpp/container/array
---

## A 3-D point is always exactly three `double`s, read by index, and millions are made per second, so none may allocate on the heap. Which standard container holds one?

---

**`std::array<double, 3>`: its length is fixed in the type, stored inline.**

The cue is "always exactly three" plus "no heap". A `std::vector<double>`
would allocate a buffer for every point; `std::array` holds its elements
inside the object itself.
