---
id: stl-array-brace-partial
kind: basic
version: 1
level: 2
tags: [stl, initialization, arrays, misconception]
requires:
  - stl-array-brace-zero
refs:
  - https://en.cppreference.com/w/cpp/language/aggregate_initialization
elaborate: Say aloud how you would fill a whole distance table with "unvisited" (−1) in C++, since braces can't do it.
---

Many expect one value in the braces to fill the whole array:

```cpp
void f() {
  int dist[3] = {-1};
}
```

## What do the three elements of `dist` hold?

---

**−1, 0, 0: only the first is −1; the rest are value-initialized to zero.**

Braces list elements from the front; any left out are zeroed, as `{}`
zeroes them all. To fill with −1, write a loop, or use
`std::vector<int> dist(3, -1)`.
