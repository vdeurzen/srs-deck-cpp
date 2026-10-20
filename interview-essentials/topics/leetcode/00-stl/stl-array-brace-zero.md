---
id: stl-array-brace-zero
kind: basic
version: 1
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
  int counts[4] = {};
  std::array<bool, 3> seen{};
  int hits[3] = {5};
}
```

## What do the three elements of `hits` hold?

---

**5, 0, 0: elements the braces leave out are value-initialized, which is zero.**

So empty braces zero a whole array: `counts` is four 0s, `seen` three
`false`s. Without any braces a local array is indeterminate, and reading
it is undefined behaviour. Values from running it under GCC 16.2.
