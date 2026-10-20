---
id: linear-array-insert-shift
kind: trace
version: 3
level: 1
tags: [arrays, complexity, tracing]
requires:
  - linear-array-insert-worked
probes:
  1: { i: "2", "a[3]": "6" }
  2: { "a[2]": "5", "a[4]": "8" }
elaborate: "Where in your own code do you insert into the middle of a vector, and how many elements does each insert move?"
refs:
  - https://en.cppreference.com/w/cpp/container/vector/insert
---

Insert `x` into the sorted first `n` elements of `a`
(`int a[8] = {2, 4, 6, 8};` sets the other four to 0: spare room).

```cpp
int main() {
  int a[8] = {2, 4, 6, 8};
  int n = 4, x = 5, i = n;
  while (i > 0 && a[i - 1] > x) {      // shift the larger tail right
    a[i] = a[i - 1];
    --i;
  }                                    // @1
  a[i] = x;                            // @2
}
```

---

Inserting into an array **moves every element after the insertion
point** (here 6 and 8), so it is O(n) in the worst case: inserting at
the front moves all n. At @1 `a[2]` and `a[3]` both hold 6; the old
copy waits to be overwritten by `x`.

(Values from running it under GCC 16.2.)
