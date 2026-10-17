---
id: iter-map-subscript-inserts
kind: basic
version: 1
level: 1
tags: [containers, maps]
requires:
  - ptr-reference-must-bind
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_map/operator_at
---

```cpp
std::unordered_map<std::string, int> counts;
for (const std::string& w : words)
    ++counts[w];
```

## The first time a word `w` appears, `counts` has no key `w`. Why does `++counts[w]` still work?

---

**`counts[w]` inserts a missing key with value `0` and returns a reference to it.**
The new `int` is value-initialised, so `++` makes it 1. Handy for counting, but it means `[]` changes the map
even when you only meant to look; it cannot be called on a `const` map at
all.
