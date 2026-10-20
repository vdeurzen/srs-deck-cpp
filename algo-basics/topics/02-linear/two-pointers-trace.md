---
id: linear-two-pointers-trace
kind: trace
version: 2
level: 2
tags: [two-pointers, tracing]
requires:
  - linear-two-pointers-worked
  - interview-essentials/linear-two-pointers-sorted-pair
probes:
  1: { lo: "0", hi: "3" }
  2: { lo: "2", hi: "3" }
  3: { found: "true" }
elaborate: What would you have to do first if the array were not sorted, and what would that cost?
refs:
  - https://en.wikipedia.org/wiki/3SUM
---

Look for a pair summing to `target` in a sorted array.

```cpp
int a[] = {1, 2, 4, 7, 12};
int target = 11, lo = 0, hi = 4;
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

Sums: 1 + 12 = 13 (drop 12), 1 + 7 = 8 (drop 1), 2 + 7 = 9 (drop 2),
4 + 7 = 11 (found). **Each step moves exactly one pointer inward**, so
the pointers meet after at most n − 1 steps: O(n).

(Values from running it under GCC 16.2.)
