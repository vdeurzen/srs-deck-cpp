---
id: pair-basics
kind: basic
version: 1
level: 1
tags: [utility, pair, foundations]
requires:
  - std-names-and-headers
elaborate: When would you return a `std::pair` from a function, and when a small struct with real field names?
refs:
  - https://en.cppreference.com/w/cpp/utility/pair
---

```cpp
std::pair<int, double> p{3, 0.5};
p.first += 1;
```

## What are `p.first` and `p.second` now?

---

**4 and 0.5: a pair holds two values, named `first` and `second`.**

`std::pair<int, double>` is like a Go struct with two fields of those
types whose names are always `first` and `second`. `{3, 0.5}` fills them
in order. The library uses pairs wherever one thing carries two values.
