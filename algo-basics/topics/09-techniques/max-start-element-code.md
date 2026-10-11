---
id: technique-max-start-element-code
kind: code
version: 1
level: 2
tags: [foundations, invariants]
requires:
  - technique-max-invariant-code
input: chips
choices:
  c1: ["a[0]", "0", "-1", "(int)a.size()"]
compile:
  harness: |
    inline constexpr int kA[] = {3, 8, 2};
    inline constexpr int kNeg[] = {-5, -2, -9};
    inline constexpr int kOne[] = {-7};
    static_assert(max_of(kA) == 8);
    static_assert(max_of(kNeg) == -2);
    static_assert(max_of(kOne) == -7);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Loop_invariant
  - https://en.cppreference.com/w/cpp/algorithm/max_element
---

This `max_of` scans from index 0, so before the first iteration it has
looked at nothing. Pick the start value of `m` that makes the comment
true there.

```cpp
#include <span>

constexpr int max_of(std::span<const int> a) {   // pre: a is not empty
  int m = {{c1::a[0]}};
  for (int i = 0; i < (int)a.size(); ++i)   // here m is an element of a, and none of a[0..i) is larger
    if (a[i] > m) m = a[i];
  return m;
}
```

---

**Any element works; the first is the one that surely exists.** Over the
empty `a[0..0)` the "none larger" half holds for any `m`, so the start
value need only be an element. 0, -1 and the size are not elements: on
`{-5, -2, -9}` each one wins.
