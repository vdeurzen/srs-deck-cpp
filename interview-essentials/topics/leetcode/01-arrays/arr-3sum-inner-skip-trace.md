---
id: arr-3sum-inner-skip-trace
kind: trace
version: 1
level: 3
tags: [two-pointers, 3sum, tracing, lc-15]
probes:
  1: { lo: "3", hi: "4", found: "1" }
  2: { lo: "3", hi: "3", found: "1" }
requires:
  - linear-two-pointers-code
refs:
  - https://leetcode.com/problems/3sum/
  - https://en.wikipedia.org/wiki/3SUM
elaborate: Why is there no matching skip loop for `hi`? What does the next comparison do with a repeated `a[hi]`?
---

3Sum (LC 15): every triplet summing to 0, without duplicate triplets.
Its inner scan for the fixed `a[0] = -4`, one step per call.

```cpp
std::vector<int> a = {-4, 1, 1, 2, 3, 3};   // sorted
int lo = 1, hi = 5, found = 0;

void step() {
  int s = a[0] + a[lo] + a[hi];
  if (s < 0) ++lo;
  else if (s > 0) --hi;
  else {
    ++found; ++lo; --hi;
    while (lo < hi && a[lo] == a[lo - 1]) ++lo;
  }
}

int main() {
  step();   // @1
  step();   // @2
}
```

---

The first step finds `{-4, 1, 3}`, and the `while` steps `lo` past
the second `1`. **Without it, the next step would find `{-4, 1, 3}`
again** from `lo = 2, hi = 4`.

`hi` needs no loop of its own: with `lo` on a new value, a repeated
`a[hi]` gives a different sum, so the ordinary `--hi` passes it. Here
`2 + 3` is too big, and the scan ends.

These values follow from C++'s rules for this code; a compiled run on
two compilers agreed.
