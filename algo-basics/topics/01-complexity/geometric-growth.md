---
id: complexity-geometric-growth
kind: code
version: 1
level: 2
tags: [complexity, amortised]
requires:
  - complexity-doubling-copies
input: chips
choices:
  c1: ["cap * 2", "cap + 1000", "size + 1"]
compile:
  harness: |
    static_assert(copies(1'000) < 2 * 1'000);
    static_assert(copies(100'000) < 2 * 100'000);
    static_assert(copies(1) == 0);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/container/vector/push_back
  - https://epubs.siam.org/doi/10.1137/0606031
---

`copies(n)` counts the elements moved by `n` pushes into a growable
array. Complete the growth rule so that, for any `n`, the pushes move
fewer than `2n` elements in total.

```cpp
constexpr long copies(long n) {
  long cap = 1, size = 0, moved = 0;
  for (long k = 0; k < n; ++k) {
    if (size == cap) { moved += size; cap = {{c1::cap * 2}}; }
    ++size;
  }
  return moved;
}
```

---

Growing by a **factor** keeps the total a geometric series, below 2n.
Growing by a **constant** k reallocates every k pushes, each copying
everything so far: about n²/(2k) moves, O(n) per push. `cap + 1000`
looks cheap at n = 1 000 and loses by n = 100 000: a bigger constant only
delays the quadratic. `size + 1`, "just what is needed", copies on every
push.
