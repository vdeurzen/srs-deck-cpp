---
id: vector-brace-init-count
kind: basic
version: 1
level: 2
tags: [containers, vector, initialization, misconception]
requires:
  - vector-sized-constructor
elaborate: Find a vector in your own code built with braces; say whether the braces list elements or were meant as a size.
refs:
  - https://en.cppreference.com/w/cpp/container/vector/vector
  - https://en.cppreference.com/w/cpp/language/list_initialization
---

Many expect braces and parentheses to be two spellings of the same
constructor call.

```cpp
int n = 4;
std::vector<int> dp{n + 1};
```

## What is `dp.size()`?

---

**1: braces list the elements, so `dp` holds the single value 5.**

```cpp
std::vector<int> dp(n + 1);   // five zeros
```

For many types `{}` and `()` do build the same object, so the habit is
natural. A `vector` treats a braced list as its elements whenever their
type fits, which `n + 1` does.
