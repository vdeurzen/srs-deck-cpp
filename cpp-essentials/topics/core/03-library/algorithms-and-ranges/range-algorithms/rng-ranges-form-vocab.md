---
id: rng-ranges-form-vocab
kind: basic
version: 1
level: 1
tags: [algorithms, ranges]
requires:
  - stdalgo-find-vs-find-if
elaborate: Say what mistake two separate iterator arguments allow that one range argument rules out.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/ranges/find
  - https://eel.is/c++draft/alg.find
---

```cpp
std::vector<int> v{3, 7};
bool same = std::ranges::find(v, 7) == std::find(v.begin(), v.end(), 7);
```

## What is `same`: `true`, `false`, or does the line not compile?

---

**`true`: both return an iterator to the same 7.**

The `std::ranges::` algorithms take the whole range `r` in place of
`r.begin(), r.end()`, and still return an iterator into it. Passing one
range means the two ends can never come from different containers.
