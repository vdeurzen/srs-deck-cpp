---
id: stdalgo-remove-if-keeps-size
kind: trace
version: 2
level: 2
tags: [algorithms, tracing, misconception]
elaborate: Where have you seen code call `std::remove_if` without using what it returns?
probes:
  1: { n: "4" }
  2: { a: "4", b: "7" }
requires:
  - stdalgo-remove-if-worked
refs:
  - https://en.cppreference.com/w/cpp/algorithm/remove
---

Many expect `std::remove_if` to shrink the vector it is given.

```cpp
std::vector<int> v{0, 4, 0, 7};
auto keep_end = std::remove_if(v.begin(), v.end(),
                               [](int x) { return x == 0; });
auto n = v.size();                  // @1
int a = v[0], b = v[1];             // @2
```

---

`remove_if` works on two iterators, so it **cannot change the vector's
size**. It moves the kept elements to the front (4, 7) and returns the new
logical end; the elements from there to `v.end()` have unspecified
values. The `vector` still holds 4 elements until something erases the
tail. Verified with GCC 16.2 (`g++ -std=c++23`).
