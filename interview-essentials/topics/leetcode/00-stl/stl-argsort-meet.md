---
id: stl-argsort-meet
kind: basic
version: 1
level: 1
tags: [stl, sorting]
requires:
  - cpp-essentials/vector-basics
refs:
  - https://en.cppreference.com/w/cpp/algorithm/ranges/sort
elaborate: Say aloud why a problem that must report original positions, not values, sorts the positions instead of the values.
---

```cpp
std::vector<int> h{5, 9, 7};
std::vector<int> idx{0, 1, 2};
```

`idx` is reordered so that `h[idx[0]] ≤ h[idx[1]] ≤ h[idx[2]]`, and `h`
itself is not touched.

## What does `idx` hold afterwards?

---

**`{0, 2, 1}`: the positions of 5, 7 and 9, smallest value first.**

Sorting positions by the value they point at is an *argsort*. `h`
keeps its order, so anything else indexed the same way, such as a
list of names, can be read in sorted order through `idx`.
