---
id: search-bounds-trace
kind: trace
version: 2
level: 2
tags: [binary-search, lower-bound, tracing]
requires:
  - interview-essentials/search-lower-bound-meaning
probes:
  1: { l: "1", u: "3" }
  2: { l: "3", u: "3" }
  3: { l: "5", u: "5" }
elaborate: How would you count the copies of a key in a sorted vector in an interview, and what does it cost?
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
  - https://en.cppreference.com/w/cpp/algorithm/upper_bound
---

`l` and `u` are the indices that `std::lower_bound` and
`std::upper_bound` return (`upper_bound` finds the first element
greater than the key).

```cpp
#include <algorithm>
#include <vector>

int main() {
  std::vector<int> v{1, 3, 3, 5, 8};
  auto b = v.begin(), e = v.end();
  long l = std::lower_bound(b, e, 3) - b;
  long u = std::upper_bound(b, e, 3) - b;   // @1
  l = std::lower_bound(b, e, 4) - b;
  u = std::upper_bound(b, e, 4) - b;        // @2
  l = std::lower_bound(b, e, 9) - b;
  u = std::upper_bound(b, e, 9) - b;        // @3
}
```

---

**`[l, u)` is exactly the run of copies of the key**, because
`lower_bound` stops at the first element not less than it and
`upper_bound` at the first greater. So `u − l` counts the copies in
O(log n): 2 for key 3, 0 for the absent 4. Past the largest element both
return `n`.

(Values from running it under GCC 16.2.)
