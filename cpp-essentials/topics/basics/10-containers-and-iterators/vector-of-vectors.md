---
id: vector-of-vectors
kind: basic
version: 1
level: 1
tags: [containers, vector, foundations]
requires:
  - vector-sized-constructor
elaborate: Where in graph or table code do you want rows of different lengths, and where all the same?
refs:
  - https://en.cppreference.com/w/cpp/container/vector
  - https://en.cppreference.com/w/cpp/container/vector/vector
---

```cpp
std::vector<std::vector<int>> g(3);
g[1].push_back(4);
g[1].push_back(7);
```

## What are `g[1][1]` and `g[0].size()`?

---

**7 and 0: each of `g`'s three rows is its own vector.**

`g(3)` makes three empty `std::vector<int>` rows. `g[1]` is a row and
`g[1][1]` an element of it, so pushing onto row 1 leaves rows 0 and 2
empty. Rows may differ in length; for equal rows pass one to copy:

```cpp
std::vector<std::vector<int>> grid(3, std::vector<int>(2)); // 3 x 2 zeros
```
