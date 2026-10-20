---
id: vector-sized-constructor
kind: basic
version: 1
level: 1
tags: [containers, vector, initialization, foundations]
requires:
  - vector-basics
elaborate: What goes wrong if a table meant to hold n + 1 zeros is written `std::vector<int> dp{n + 1};`?
refs:
  - https://en.cppreference.com/w/cpp/container/vector/vector
---

```cpp
std::vector<int> d(4);
std::vector<int> row(3, 7);
```

## What elements does each vector hold?

---

**`d` is {0, 0, 0, 0}; `row` is {7, 7, 7}.**

Parentheses give a count: `(n)` makes n elements set to zero (`false`
for `bool`), `(n, x)` makes n copies of x. Braces list the elements
instead: `std::vector<int> b{3, 7};` holds just 3 and 7.
