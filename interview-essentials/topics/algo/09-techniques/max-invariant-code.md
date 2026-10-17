---
id: technique-max-invariant-code
kind: code
version: 1
level: 1
tags: [foundations, invariants]
input: chips
choices:
  c1: ["a[0]", "0", "-1", "a[1]"]
compile:
  harness: |
    inline constexpr int kA[] = {3, 8, 2};
    inline constexpr int kNeg[] = {-5, -2, -9};
    inline constexpr int kOne[] = {-7};
    inline constexpr int kFirst[] = {9, 1, 2};
    static_assert(max_of(kA) == 8);
    static_assert(max_of(kNeg) == -2);
    static_assert(max_of(kOne) == -7);
    static_assert(max_of(kFirst) == 9);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Loop_invariant
  - https://en.cppreference.com/w/cpp/algorithm/max_element
---

`max_of` returns the largest element of a non-empty array. Pick the
start value of `m` that makes the comment true before the first
iteration.

```cpp
#include <span>

constexpr int max_of(std::span<const int> a) {   // pre: a is not empty
  int m = {{c1::a[0]}};
  for (int i = 1; i < (int)a.size(); ++i)   // here m is the largest of a[0..i)
    if (a[i] > m) m = a[i];
  return m;
}
```

---

**The first element: with `i = 1` the comment talks about `a[0..1)`,
and its largest is `a[0]`.** 0 or -1 look like neutral starts but are
not elements: on `{-5, -2, -9}` they win. This is also why the
precondition "not empty" is there.
