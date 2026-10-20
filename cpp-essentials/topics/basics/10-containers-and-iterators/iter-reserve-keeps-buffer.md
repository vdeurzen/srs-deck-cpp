---
id: iter-reserve-keeps-buffer
kind: trace
version: 1
level: 2
tags: [containers, vector, tracing]
probes:
  1: { n0: "0" }
  2: { same: "true" }
requires:
  - iter-size-vs-capacity
  - ptr-holds-an-address
  - types-auto-deduces
elaborate: Name a loop where you know the final size up front and would call `reserve` first.
refs:
  - https://en.cppreference.com/w/cpp/container/vector/reserve
  - https://eel.is/c++draft/vector.capacity
---

`v.data()` is a pointer to the vector's first slot.

```cpp
std::vector<int> v;
v.reserve(4);
auto n0 = v.size();              // @1
int* buf = v.data();
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
