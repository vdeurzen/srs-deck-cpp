---
id: uniq-dedupe-intro
kind: basic
version: 1
level: 1
tags: [algorithms, rearranging]
requires:
  - chunks-erase-remove
elaborate: Say in one sentence why this line needs both `std::unique` and `erase`, as you would to an interviewer.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/unique
  - https://eel.is/c++draft/alg.unique
---

```cpp
std::vector<int> v{4, 4, 7, 7, 7};
v.erase(std::unique(v.begin(), v.end()), v.end());
```

## What does `v` hold after the second line?

---

**`{4, 7}`: one copy of each run of equal neighbours survives.**

`std::unique` packs the first element of every run of equal adjacent
values to the front and returns the new logical end, as `remove_if` does;
it cannot change the size. `erase` then cuts the leftover tail.
