---
id: ll-seqlock-reader
kind: code
version: 1
level: 4
tags: [low-latency, concurrency, seqlock]
input: chips
choices:
  c1:
    - "(before & 1) != 0 || before != after"
    - "(before & 1) != 0"
    - "before != after"
    - "after > before"
compile:
  harness: |
    static_assert(!must_retry(2, 2));            // quiet: keep the copy
    static_assert(must_retry(3, 4));             // read began mid-update
    static_assert(must_retry(2, 4));             // a whole update landed inside
    static_assert(must_retry(3, 3));             // writer active throughout
    static_assert(must_retry(0xFFFFFFFEu, 0));   // counter wrapped during the read
    int main() {}
requires:
  - ll-seqlock
refs:
  - https://www.kernel.org/doc/html/latest/locking/seqlock.html
  - https://dl.acm.org/doi/10.1145/2247684.2247688
elaborate: Your counter is 64 bits wide. Does the wrap case still matter, and does the comparison change?
---

A seqlock reader loaded the sequence counter (`before`), copied the
payload, then loaded the counter again (`after`). Complete the test that
says the copy must be thrown away.

```cpp
#include <cstdint>

constexpr bool must_retry(std::uint32_t before, std::uint32_t after) {
  return {{c1::(before & 1) != 0 || before != after}};
}
```

---

**Retry if a write was in progress at the start, or any write finished
during the copy.** An odd `before` means the writer was mid-update, even
if it is still mid-update at the end (`3, 3`); a changed counter means a
write overlapped the copy, even if both values are even (`2, 4`).

Ordering the counters (`after > before`) is the tempting shortcut and
fails twice: it misses `3, 3`, and it misses a wrapped 32-bit counter.
Only equality is safe. The comparison is only meaningful with the
fences around the payload reads (`ll-seqlock-fences`).
