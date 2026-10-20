---
id: iter-size-vs-capacity
kind: basic
version: 2
level: 1
tags: [containers, vector]
requires:
  - vector-basics
elaborate: Say why a vector keeps spare room at all, rather than a buffer exactly `size()` long.
refs:
  - https://en.cppreference.com/w/cpp/container/vector/capacity
  - https://en.cppreference.com/w/cpp/container/vector/size
---

`v.capacity()` is how many `int`s `v`'s current buffer has room for.
After these calls, GCC's `v` has `size()` 3 and `capacity()` 4.

```cpp
std::vector<int> v;
v.push_back(1);
v.push_back(2);
v.push_back(3);
```

## May the code now read `v[3]`?

---

**No: the spare slot holds no element; only indices below `size()` do.**

`capacity()` counts buffer slots, `size()` the elements in them, so `v[3]`
is past the last element; `[]` does not check. The next `push_back` fills
that slot without allocating; only when `size()` equals `capacity()` does
the vector allocate a bigger buffer.
