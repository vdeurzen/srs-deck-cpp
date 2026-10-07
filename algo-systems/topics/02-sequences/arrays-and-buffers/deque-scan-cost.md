---
id: seq-deque-scan-cost
kind: basic
version: 1
level: 3
requires:
  - seq-vector-vs-deque
tags: [containers, memory-hierarchy]
refs:
  - https://en.cppreference.com/w/cpp/container/deque
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc++-v3/include/bits/stl_deque.h
---

## Summing a `std::deque<Quote>` (24-byte `Quote`) is slower than summing the same data in a `std::vector`. Where does the extra time go?

---

**Into block bookkeeping: every 21 elements the scan changes block.**
libstdc++ blocks hold 512 bytes, so 21 `Quote`s. The iterator checks
for a block end on every step and loads the next block pointer from the
map, which also makes the loop harder to vectorise than a flat array.
