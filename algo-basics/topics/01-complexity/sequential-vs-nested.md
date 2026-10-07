---
id: complexity-sequential-vs-nested
kind: code
version: 1
level: 1
tags: [complexity, big-o]
requires:
  - complexity-count-loop-steps
input: chips
choices:
  c1: ["n + n * m", "n * m", "n + m", "n * n * m"]
compile:
  harness: |
    static_assert(closed_form(3, 4) == steps(3, 4));
    static_assert(closed_form(10, 1) == steps(10, 1));
    static_assert(closed_form(7, 9) == steps(7, 9));
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Time_complexity
---

`steps` counts the work of two loops. Complete the closed form so it
matches for every `n ≥ 0` and `m ≥ 1`.

```cpp
constexpr int steps(int n, int m) {
  int s = 0;
  for (int i = 0; i < n; ++i) ++s;           // first loop
  for (int i = 0; i < n; ++i)                // then a nested pair
    for (int j = 0; j < m; ++j) ++s;
  return s;
}
constexpr int closed_form(int n, int m) { return {{c1::n + n * m}}; }
```

---

Loops **one after another add**; a loop **inside** another
**multiplies**. So the cost is n + n·m, which is O(n·m): the separate n
term is dominated. With m independent of n you must keep both letters;
O(n·m) is not O(n²) unless m grows like n.
