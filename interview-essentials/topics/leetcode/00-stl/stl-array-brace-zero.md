---
id: stl-array-brace-zero
kind: basic
version: 2
level: 1
tags: [stl, foundations, initialization, arrays]
requires:
  - cpp-essentials/initialization-default-value-zero
  - cpp-essentials/iter-array-fixed-size
refs:
  - https://en.cppreference.com/w/cpp/language/aggregate_initialization
  - https://en.cppreference.com/w/cpp/language/value_initialization
elaborate: Go zeroes every array for you; say aloud which counting loop of yours would read garbage in C++ if its array lost the `{}`.
---

```cpp
void f() {
  int a[3] = {};
  std::array<int, 3> b{};
  int c[3];
}
```

## Which of these local arrays are guaranteed to hold only zeros?

---

**`a` and `b`: empty braces value-initialize every element, which is zero.**

`c` has no initializer, so its elements are indeterminate and reading
one is undefined behaviour. `std::array` follows the same rule:
`std::array<int, 3> d;` is as indeterminate as `c`.
