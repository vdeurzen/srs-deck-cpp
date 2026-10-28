---
id: srch-lower-bound-trace
kind: trace
version: 1
level: 3
tags: [algorithms, searching, tracing]
probes:
  1: { i: "3" }
  2: { at: "6" }
requires:
  - srch-lower-bound-worked
  - srch-upper-vs-lower
elaborate: Say which index `upper_bound` would return for 4 on this `v`, and why.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
---

5 is absent from `v`. Give `i` at @1 and `at` at @2.

```cpp
std::vector<int> v{1, 4, 4, 6, 9};
auto it = std::lower_bound(v.begin(), v.end(), 5);
auto i = it - v.begin();   // @1
int at = *it;              // @2
```

---

Halving `[0, 5)`: probe the middle, `v[2]` is 4; drop the left half if
smaller, leaving `[3, 5)`. Probe `v[4]`, 9: not smaller, so keep the middle and the
left, `[3, 4)`. Probe `v[3]`, 6: not smaller, so keep the middle and the left,
`[3, 3)`. Stop when empty:
`i` is 3, and `at` is 6, the first element not less than 5. Values from
GCC 16.2.
