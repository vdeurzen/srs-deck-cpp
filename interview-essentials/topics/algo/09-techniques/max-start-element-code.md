---
id: technique-max-start-element-code
kind: code
version: 2
level: 2
tags: [foundations, invariants]
requires:
  - technique-max-invariant-code
  - cpp-essentials/std-names-and-headers
  - cpp-essentials/constexpr-fn-static-assert
elaborate: Name the start value that plays the same role for a running minimum, a product and a string concatenation, and say why each is safe.
input: chips
choices:
  c1:
    - "std::numeric_limits<int>::min()"
    - "std::numeric_limits<int>::max()"
    - "std::numeric_limits<unsigned>::min()"
    - "a[0]"
compile:
  harness: |
    inline constexpr int kA[] = {3, 8, 2};
    inline constexpr int kNeg[] = {-5, -2, -9};
    static_assert(max_of(kA, 3) == 8);
    static_assert(max_of(kNeg, 3) == -2);
    static_assert(max_of(kA, 0) == std::numeric_limits<int>::min());
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Identity_element
  - https://en.cppreference.com/w/cpp/types/numeric_limits
  - https://en.cppreference.com/w/cpp/algorithm/max_element
---

This `max_of` has no precondition: `n == 0` returns the start value
of `m` (`std::numeric_limits<T>` holds the limits of type `T`: `min()` its
smallest value, `max()` its largest). Pick the start value that makes the comment true before the
first iteration.

```cpp
#include <limits>

constexpr int max_of(const int* a, int n) {
  int m = {{c1::std\::numeric_limits<int>\::min()}};
  for (int i = 0; i < n; ++i)   // m: largest of a[0] ... a[i - 1]
    if (a[i] > m) m = a[i];
  return m;
}
```

---

**The smallest `int`: it is the identity of max, as 0 is of `+`.** Any
first element beats or ties it, so the scan needs no special case.
`a[0]` reads an element outside an empty range; 0 (the `unsigned`
minimum) wins on `{-5, -2, -9}`; the largest `int` wins everywhere. The
cost: `n == 0` and `{−2³¹}` give the same answer.
