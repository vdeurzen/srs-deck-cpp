---
id: sort-go-dispatch
kind: basic
version: 3
level: 3
tags: [sorting, inlining, templates]
elaborate: Where in your own code does a hot loop call a function it receives as a pointer or callback, and could it take the callable's type instead?
requires:
  - cpp-essentials/staticpoly-static-vs-dynamic
refs:
  - https://en.cppreference.com/w/cpp/algorithm/qsort
  - https://en.cppreference.com/w/cpp/algorithm/sort
---

Both sort 2²⁰ random `int`s, GCC 16.2 `-O2`: `qsort` takes about 98 ms,
`std::sort` about 51 ms. (`const void*` points to an object of unknown type.)

```cpp
int cmp(const void* a, const void* b);   // returns <0, 0 or >0
std::qsort(v.data(), v.size(), sizeof(int), cmp);
std::sort(v.begin(), v.end());
```

## Both are O(n log n). What does `qsort` pay on every comparison that `std::sort` does not?

---

**An opaque call to `cmp`, which `qsort`'s precompiled loop cannot inline.**

`qsort` is compiled once for every type and reaches `cmp` through a
pointer. `std::sort` is instantiated for `int` and `<`, so the
comparison is one inlined instruction in the partition loop.
