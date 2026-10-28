---
id: alg-iter-index
kind: basic
version: 1
level: 1
tags: [algorithms, iterators]
requires:
  - stdalgo-find-vs-find-if
  - ptr-subtract-counts-elements
elaborate: Name a problem where an algorithm hands you an iterator but the answer you must return is an index.
refs:
  - https://en.cppreference.com/w/cpp/named_req/RandomAccessIterator
  - https://eel.is/c++draft/random.access.iterators
---

```cpp
std::vector<int> v{4, 8, 2};
auto it = std::find(v.begin(), v.end(), 8);
auto i = it - v.begin();
```

## What is `i`?

---

**1: subtracting two vector iterators counts the elements between them.**

`v.begin()` is index 0, so `it - v.begin()` is the index of `*it`, as
with pointers into one array. Both iterators must belong to the same
vector; `v.end()` is allowed and gives `v.size()`.
