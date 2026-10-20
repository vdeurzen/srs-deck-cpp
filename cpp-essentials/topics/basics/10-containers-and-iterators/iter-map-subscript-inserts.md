---
id: iter-map-subscript-inserts
kind: basic
version: 1
level: 1
tags: [containers, maps]
requires:
  - map-unordered-map-intro
  - iter-range-for-intro
elaborate: Say what goes wrong if you test `if (counts[k] > 0)` just to check whether `k` is present.
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_map/operator_at
---

```cpp
std::unordered_map<int, int> counts;
for (int w : words)
    ++counts[w];
```

## `words` is a `std::vector<int>`. The first time a value `w` appears, `counts` has no key `w`. Why does `++counts[w]` still work?

---

**`counts[w]` inserts a missing key with value `0` and returns a reference to it.**
The new `int` starts at 0, so `++` makes it 1. Handy for counting, but it means `[]` changes the map
even when you only meant to look; it cannot be called on a `const` map at
all.
