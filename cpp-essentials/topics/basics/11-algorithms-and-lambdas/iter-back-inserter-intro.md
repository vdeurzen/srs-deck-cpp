---
id: iter-back-inserter-intro
kind: basic
version: 1
level: 1
tags: [iterators, algorithms, foundations]
requires:
  - iter-iterator-basics
elaborate: Say which algorithm call in your own code writes into an empty vector, and how it makes room for the results.
refs:
  - https://en.cppreference.com/w/cpp/iterator/back_inserter
  - https://en.cppreference.com/w/cpp/iterator/back_insert_iterator
---

```cpp
std::vector<int> out;
auto pos = std::back_inserter(out);
*pos = 4;
*pos = 9;
```

## `std::back_inserter(out)`, from `<iterator>`, makes an iterator for `out`. What does `out` hold now?

---

**{4, 9}: each assignment through `pos` calls `out.push_back`.**

An ordinary iterator such as `out.begin()` writes over an element that
must already exist, and empty `out` has none. A back inserter turns every
write into an append, so the vector grows as results arrive.
