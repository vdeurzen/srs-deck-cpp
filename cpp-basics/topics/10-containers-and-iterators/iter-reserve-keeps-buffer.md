---
id: iter-reserve-keeps-buffer
kind: trace
version: 1
level: 2
tags: [containers, vector, tracing]
requires:
  - iter-size-vs-capacity
probes:
  1: { n0: "0" }
  2: { same: "true" }
refs:
  - https://en.cppreference.com/w/cpp/container/vector/reserve
  - https://eel.is/c++draft/vector.capacity
---

```cpp
std::vector<int> v;
v.reserve(4);
auto n0 = v.size();              // @1
const int* buf = v.data();       // address of the buffer
v.push_back(10);
v.push_back(20);
v.push_back(30);
bool same = (v.data() == buf);   // @2
```

---

`reserve(4)` changes the **capacity** (to at least 4), never the size: no
element exists yet, so `n0` is 0. The standard guarantees no reallocation
while later insertions keep `size() <= capacity()`, so the three
`push_back`s write into the same buffer and `data()` is unchanged. That is
why `reserve` is used when the final size is known: one allocation, and
iterators into the vector stay valid. Verified with GCC 16.2
(`g++ -std=c++23`).
