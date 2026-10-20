---
id: arr-3sum-inner-skip-trace
kind: trace
version: 3
level: 3
tags: [two-pointers, 3sum, tracing, lc-15]
probes:
  1: { lo: "3", found: "1" }
requires:
  - arr-3sum-dedupe-worked
  - linear-two-pointers-sorted-pair
  - cpp-essentials/vector-basics
refs:
  - https://leetcode.com/problems/3sum/
  - https://en.wikipedia.org/wiki/3SUM
elaborate: Why is there no matching skip loop for `hi`? What does the next comparison do with a repeated `a[hi]`?
---

3Sum: every triplet summing to 0, no triplet twice. One step of the pair
scan for the fixed `a[0] = -4`:

```cpp
std::vector<int> a = {-4, 1, 1, 3, 3};   // sorted
int lo = 1, hi = 4, found = 0;

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
}
```

---

The step finds `{-4, 1, 3}`, then `lo = 2, hi = 3`. `a[2]` repeats the
1, so the `while` moves `lo` to 3, and `lo == hi` ends the scan.
**Without it, `lo = 2, hi = 3` would find `{-4, 1, 3}` again.**

Values from running it under GCC 16.2.
