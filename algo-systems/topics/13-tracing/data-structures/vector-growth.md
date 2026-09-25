---
id: trace-vector-growth
kind: trace
version: 1
level: 2
tags: [tracing, sequences, amortised]
probes:
  1: { "v.size()": "1", "v.capacity()": "2", "v[0]": "1" }
  2: { "v.size()": "2", "v.capacity()": "2", "v[0]": "1" }
  3: { "v.size()": "3", "v.capacity()": "4", "v[0]": "1" }
  4: { "v.size()": "4", "v.capacity()": "4", "v[0]": "0" }
refs:
  - https://en.cppreference.com/w/cpp/container/vector/push_back
  - https://en.cppreference.com/w/cpp/container/vector/reserve
---

```cpp
#include <vector>

int main() {
  std::vector<int> v;
  v.reserve(2);
  v.push_back(1);           // @1
  v.push_back(2);           // @2
  v.push_back(3);           // @3
  v.insert(v.begin(), 0);   // @4
}
```

---

`reserve(2)` sets capacity to exactly 2 — `reserve` never rounds up
and never shrinks. The first two pushes fit, so capacity does not move
and no element is copied.

The third push is the interesting one: capacity is exhausted, so the
vector allocates a new block (libstdc++ doubles: 2 → 4), **moves or
copies all existing elements into it**, and destroys the old one. That
single push is O(n) and it invalidates every iterator, pointer and
reference into the vector — the reason `reserve` before a known number
of pushes is worth the line, and the reason holding a pointer into a
growing vector is a bug waiting for the wrong input size.

The `insert` at the front costs a `memmove` of every element but does
*not* reallocate, because capacity 4 still has room for a fourth
element: size goes to 4, capacity stays 4, and `v[0]` becomes the newly
inserted 0 while everything else shifts up one slot.

Note what is implementation-defined here: the **growth factor**.
libstdc++ and libc++ double; MSVC grows by 1.5×; nothing in the
standard requires either, only that `push_back` is amortised O(1),
which any geometric factor satisfies. The values above are GCC 13.3's
libstdc++, verified by compiling and running this program with
`g++ -std=c++23` and printing `size()` and `capacity()` at each probe.
