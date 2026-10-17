---
id: stdalgo-remove-if-keeps-size
kind: trace
version: 1
level: 2
tags: [algorithms, tracing, misconception]
requires:
  - stdalgo-lambda-syntax
  - iter-end-one-past
elaborate: Where have you seen code call `std::remove_if` without using what it returns?
probes:
  1: { n: "4", kept: "2" }
  2: { a: "4", b: "7" }
refs:
  - https://en.cppreference.com/w/cpp/algorithm/remove
---

```cpp
std::vector<int> v{0, 4, 0, 7};
auto keep_end = std::remove_if(v.begin(), v.end(),
                               [](int x) { return x == 0; });
auto n = v.size();
auto kept = keep_end - v.begin();   // @1
int a = v[0], b = v[1];             // @2
```

---

`remove_if` works on two iterators, so it **cannot change the vector's
size**. It moves the kept elements to the front (4, 7) and returns the new
logical end; the elements from there to `v.end()` have unspecified
values. The `vector` still holds 4 elements until something erases the
tail. Verified with GCC 16.2 (`g++ -std=c++23`).
