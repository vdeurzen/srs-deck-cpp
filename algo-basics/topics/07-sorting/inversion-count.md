---
id: sort-inversion-count
kind: trace
version: 1
level: 1
tags: [foundations, tracing, sorting, inversions]
probes:
  1: { r: "10" }
  2: { m: "5" }
  3: { w: "3" }
refs:
  - https://en.wikipedia.org/wiki/Inversion_(discrete_mathematics)
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
---

`count(a)` looks at every pair of positions `i < j` and counts the pairs
whose values are in the wrong order.

```cpp
constexpr int count(std::array<int, 5> a) {
  int n = 0;
  for (std::size_t i = 0; i < a.size(); ++i)
    for (std::size_t j = i + 1; j < a.size(); ++j)
      if (a[i] > a[j]) ++n;
  return n;
}
int r = count({5, 4, 3, 2, 1});   // @1
int m = count({2, 5, 1, 4, 3});   // @2
int w = count({1, 4, 3, 2, 5});   // @3
```

---

Each such pair is an **inversion**: a measure of how far from sorted the
array is. Sorted has 0; reversed has every pair, n(n − 1)/2 = 10. In `w`
one swap of the far-apart 4 and 2 made three inversions (4·3, 4·2, 3·2).
(Run with GCC 16.2.)
