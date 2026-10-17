---
id: technique-max-start-element-code
kind: code
version: 2
level: 2
tags: [foundations, invariants]
requires:
  - technique-max-invariant-code
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
    static_assert(max_of(kA) == 8);
    static_assert(max_of(kNeg) == -2);
    static_assert(max_of({}) == std::numeric_limits<int>::min());
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Identity_element
  - https://en.cppreference.com/w/cpp/types/numeric_limits
  - https://en.cppreference.com/w/cpp/algorithm/max_element
---

This `max_of` has no precondition: an empty `a` returns the start value
of `m`. Pick the start value that makes the comment true before the
first iteration.

```cpp
#include <limits>
#include <span>

constexpr int max_of(std::span<const int> a) {
  int m = {{c1::std\::numeric_limits<int>\::min()}};
  for (int x : a)   // here m is the largest x seen; none seen: max(m, y) == y for every int y
    if (x > m) m = x;
  return m;
}
```

---

**The smallest `int`: it is the identity of max, as 0 is of `+`.** Any
first element beats or ties it, so the scan needs no special case.
`a[0]` reads past an empty `a`; 0 (the `unsigned` minimum) wins on
`{-5, -2, -9}`; the largest `int` wins everywhere. The cost: an empty
`a` and `{INT_MIN}` give the same answer, which is why
`std::max_element` returns `end()` instead.
