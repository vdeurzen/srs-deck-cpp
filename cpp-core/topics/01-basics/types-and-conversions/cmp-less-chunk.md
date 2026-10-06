---
id: types-cmp-less-chunk
kind: chunk
version: 1
level: 2
tags: [types, integers, c++20]
expose_ms: 7000
compile:
  harness: |
    int main() {}
requires:
  - types-signed-unsigned-trace
refs:
  - https://en.cppreference.com/w/cpp/utility/intcmp
---

```cpp
#include <utility>
constexpr int i = -1; constexpr unsigned u = 1;
static_assert(std::cmp_less(i, u));
```

---

**Mixed-sign comparison, done right.** `std::cmp_less` (and `cmp_equal`,
`cmp_greater`, …, C++20) compares the mathematical values, so `-1` is less
than `1u`, where the built-in `i < u` converts `-1` to `4294967295` and
says false. Reach for it whenever a signed index meets a `size()`.
