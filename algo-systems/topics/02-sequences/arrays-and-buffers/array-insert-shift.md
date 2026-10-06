---
id: seq-array-insert-shift
kind: trace
version: 1
level: 1
tags: [containers, complexity, tracing]
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
point** — here 6, 8 and 10 — so it is O(n) in the worst case. A linked
list relinks two pointers instead, but only once you hold the node to
insert after; finding it is the O(n) walk.

For small elements the array's O(n) is one sequential `memmove`, which
is why `vector::insert` usually beats `list::insert` in practice.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
