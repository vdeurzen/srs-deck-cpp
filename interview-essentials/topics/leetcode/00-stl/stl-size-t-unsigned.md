---
id: stl-size-t-unsigned
kind: basic
version: 1
level: 1
tags: [stl, foundations, integers]
requires:
  - cpp-essentials/types-overflow-rules
  - cpp-essentials/vector-basics
  - cpp-essentials/types-size-t
refs:
  - https://en.cppreference.com/w/cpp/types/size_t
  - https://en.cppreference.com/w/cpp/container/vector/size
elaborate: Say where in a loop over `v` you would write `i + 1 < v.size()` instead of `i < v.size() - 1`, and why.
---

```cpp
std::vector<int> v;                 // empty
std::size_t last = v.size() - 1;    // size() returns std::size_t
```

## On a 64-bit machine, what value does `last` hold?

---

**2⁶⁴ − 1 (18446744073709551615): `std::size_t` is unsigned, so 0 − 1 wraps.**
`std::size_t` is the unsigned integer type that `sizeof` and every
container's `size()` return, as wide as a pointer. A loop bound such as
`v.size() - 1` is therefore huge, not −1, when `v` is empty.
Values from running it under GCC 16.2.
