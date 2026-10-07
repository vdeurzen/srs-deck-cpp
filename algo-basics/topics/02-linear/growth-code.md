---
id: linear-growth-code
kind: code
version: 1
level: 2
tags: [dynamic-arrays, amortised]
requires:
  - linear-growth-trace
input: chips
choices:
  c1: ["cap * 2", "cap + 1", "cap + 16", "cap + 1000"]
compile:
  harness: |
    static_assert(copies_for(1000) < 2 * 1000);     // amortised O(1) per push
    static_assert(copies_for(100000) < 2 * 100000);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/container/vector/push_back
---

Count the element copies a dynamic array makes during `n` pushes.
Complete the new capacity so the total stays below `2n` for any `n`.

```cpp
constexpr long copies_for(long n) {
  long cap = 1, size = 0, copies = 0;
  for (long k = 0; k < n; ++k) {
    if (size == cap) { copies += size; cap = {{c1::cap * 2}}; }
    ++size;
  }
  return copies;
}
```

---

**Multiply, don't add.** Any additive step `+ c` gives about n²/(2c)
copies: O(n) per push on average, the O(n²) hiding in "grow by a few
slots".

`cap + 1000` copies once for 1000 pushes and looks perfect; at 100000
pushes it has copied about 5 million elements. A big constant only
delays the quadratic.
