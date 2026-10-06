---
id: types-size-t-countdown
kind: code
version: 1
level: 2
tags: [types, integers, loops]
input: chips
choices:
  c1:
    - "std::size_t i = std::size(digits); i-- > 0;"
    - "std::size_t i = std::size(digits) - 1; i >= 0; --i"
    - "std::size_t i = std::size(digits) - 1; i > 0; --i"
compile:
  harness: |
    static_assert(reversed() == 321);
    int main() {}
requires:
  - types-unsigned-wrap
refs:
  - https://en.cppreference.com/w/cpp/types/size_t
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Overflows
---

Complete the loop header so it visits every index from last to first.

```cpp
#include <cstddef>
#include <iterator>
constexpr int digits[] = {1, 2, 3};
constexpr int reversed() {
  int out = 0;
  for ({{c1::std\::size_t i = std\::size(digits); i-- > 0;}})
    out = out * 10 + digits[i];
  return out;
}
```

---

`std::size_t` is unsigned, so `i >= 0` is always true: after index 0,
`--i` wraps to `SIZE_MAX` and the loop reads far out of bounds (the
constant evaluation rejects it). `i > 0` stops early and skips index 0.
`i-- > 0` tests the old value and decrements before the body, so the
body sees `n-1` down to `0` and the loop ends exactly when `i` was 0.
