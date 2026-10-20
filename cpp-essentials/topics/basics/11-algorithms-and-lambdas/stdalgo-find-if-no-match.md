---
id: stdalgo-find-if-no-match
kind: basic
version: 1
level: 1
tags: [algorithms, iterators, foundations]
requires:
  - stdalgo-find-vs-find-if
elaborate: Say what you would compare the result with if you searched only part of a vector, and why.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/find
---

```cpp
std::vector<int> v{3, 4};
auto it = std::find_if(v.begin(), v.end(),
                       [](int x) { return x < 0; });
```

## No element of `v` is negative. What does `it` equal?

---

**`v.end()`: with no match, `find_if` returns the end of the range given.**

`end()` is the one position that is never an element, so it cannot be
mistaken for a match. Compare with it before reading: `*it` here would read
past the last element, which is undefined behaviour.
