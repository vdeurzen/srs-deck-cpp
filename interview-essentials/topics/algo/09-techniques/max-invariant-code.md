---
id: technique-max-invariant-code
kind: code
version: 1
level: 1
tags: [foundations, invariants]
requires:
  - technique-loop-invariant-sum
  - cpp-essentials/ptr-array-name-to-pointer
  - cpp-essentials/const-pointer-read-rule
elaborate: Say aloud which precondition your start value relies on, and what a caller sees if it is broken.
input: chips
choices:
  c1: ["a[0]", "0", "-1", "a[1]"]
compile:
  harness: |
    inline constexpr int kA[] = {3, 8, 2};
    inline constexpr int kNeg[] = {-5, -2, -9};
    inline constexpr int kOne[] = {-7};
    inline constexpr int kFirst[] = {9, 1, 2};
    static_assert(max_of(kA, 3) == 8);
    static_assert(max_of(kNeg, 3) == -2);
    static_assert(max_of(kOne, 1) == -7);
    static_assert(max_of(kFirst, 3) == 9);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Loop_invariant
  - https://en.cppreference.com/w/cpp/algorithm/max_element
---

`max_of` returns the largest of the `n` ints at `a`, `n` at least 1 (`constexpr`
lets the compiler run it, so the checks happen while compiling). Pick
the start value of `m` that makes the comment true before the first
iteration.

```cpp
constexpr int max_of(const int* a, int n) {   // pre: n >= 1
  int m = {{c1::a[0]}};
  for (int i = 1; i < n; ++i)
    // here m is the largest of a[0] ... a[i - 1]
    if (a[i] > m) m = a[i];
  return m;
}
```

---

**The first element: with `i = 1` the comment talks about `a[0]` alone,
so `m` must be `a[0]`.** 0 or -1 look like neutral starts but are
not elements: on `{-5, -2, -9}` they win. This is also why the
precondition `n >= 1` is there.
