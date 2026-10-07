---
id: search-bounds-trace
kind: trace
version: 1
level: 2
tags: [binary-search, lower-bound, tracing]
requires:
  - search-lower-bound-meaning
probes:
  1: { l: "1", u: "4" }
  2: { l: "4", u: "4" }
  3: { l: "6", u: "6" }
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
  - https://en.cppreference.com/w/cpp/algorithm/upper_bound
---

`L(k)` and `U(k)` are the indices returned by `std::lower_bound` and
`std::upper_bound`.

```cpp
int main() {
  std::vector<int> v{1, 3, 3, 3, 5, 8};
  auto L = [&](int k) { return std::lower_bound(v.begin(), v.end(), k) - v.begin(); };
  auto U = [&](int k) { return std::upper_bound(v.begin(), v.end(), k) - v.begin(); };

  auto l = L(3), u = U(3);   // @1
  l = L(4); u = U(4);        // @2
  l = L(9); u = U(9);        // @3
}
```

---

`lower_bound` is the first element **not less than** the key,
`upper_bound` the first **greater than** it. So `[L(k), U(k))` is
exactly the run of copies of `k`: `U − L` counts them in O(log n), 3 for
key 3 and 0 for the absent 4. Past the largest element both return `n`.

(Values from running it under GCC 16.2.)
