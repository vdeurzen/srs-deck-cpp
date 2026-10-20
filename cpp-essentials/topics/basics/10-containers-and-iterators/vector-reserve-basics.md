---
id: vector-reserve-basics
kind: basic
version: 1
level: 1
tags: [containers, vector, foundations]
requires:
  - iter-size-vs-capacity
elaborate: Say what goes wrong if code calls `v.reserve(100)` and then assigns `v[0] = 1`.
refs:
  - https://en.cppreference.com/w/cpp/container/vector/reserve
  - https://eel.is/c++draft/vector.capacity
---

```cpp
std::vector<int> v;
v.reserve(100);
```

## `reserve(n)` asks a vector for room for at least `n` elements. What are `v.size()` and `v.capacity()` now?

---

**0 and at least 100: `reserve` makes room but creates no elements.**

`v[0]` is still past the end. The next 100 `push_back`s fill that room
without allocating again, because a vector allocates a new buffer only when
`size()` reaches `capacity()`.
