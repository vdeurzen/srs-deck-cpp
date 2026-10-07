---
id: linear-two-pointers-trace
kind: trace
version: 1
level: 2
tags: [two-pointers, tracing]
requires:
  - linear-two-pointers-sorted-pair
probes:
  1: { lo: "1", hi: "5", found: "false" }
  2: { lo: "2", hi: "4", found: "false" }
  3: { lo: "2", hi: "4", found: "true" }
refs:
  - https://en.wikipedia.org/wiki/3SUM
---

Look for a pair summing to `target` in a sorted array.

```cpp
int a[] = {1, 3, 4, 6, 9, 11};
int target = 13, lo = 0, hi = 5;
bool found = false;

void step() {
  int s = a[lo] + a[hi];
  if (s < target) ++lo;          // a[lo] is too small for every partner
  else if (s > target) --hi;     // a[hi] is too big for every partner
  else found = true;
}

int main() {
  step();           // @1
  step(); step();   // @2
  step();           // @3
}
```

---

Sums: 1 + 11 = 12 (drop 1), 3 + 11 = 14 (drop 11), 3 + 9 = 12 (drop 3),
4 + 9 = 13 (found). **Each step moves exactly one pointer inward**, so
the pointers meet after at most n − 1 steps: O(n).

(Values from running it under GCC 16.2.)
