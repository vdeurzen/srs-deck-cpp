---
id: linear-array-insert-shift
kind: trace
version: 1
level: 1
tags: [arrays, complexity, tracing]
requires:
  - linear-array-index-contiguity
  - complexity-big-o-scaling
probes:
  1: { i: "2", moved: "3" }
  2: { n: "6", "a[2]": "5", "a[5]": "10" }
refs:
  - https://en.cppreference.com/w/cpp/container/vector/insert
---

Insert `x` into a sorted array that has spare room at the end.

```cpp
int main() {
  int a[8] = {2, 4, 6, 8, 10};
  int n = 5, x = 5, i = n, moved = 0;
  while (i > 0 && a[i - 1] > x) {      // shift the larger tail right
    a[i] = a[i - 1];
    --i; ++moved;
  }                                    // @1
  a[i] = x; ++n;                       // @2
}
```

---

Inserting into an array **moves every element after the insertion
point** (here 6, 8 and 10), so it is O(n) in the worst case: inserting at
the front moves all n. The array has no gaps, so room for `x` must be
made by shifting.

For small elements those moves are one sequential `memmove`, which is why
`vector::insert` is often faster in practice than its O(n) suggests.

(Values from running it under GCC 16.2.)
