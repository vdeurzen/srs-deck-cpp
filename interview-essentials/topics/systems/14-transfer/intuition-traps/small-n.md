---
id: trap-small-n
kind: basic
version: 1
level: 2
tags: [transfer, misconception, engineering, cost-model]
elaborate: What is the largest n your "scalable" structure will actually see this year — and what operations does it really serve?
requires:
  - foundations-cache-cost-model
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
  - https://en.algorithmica.org/hpc/data-structures/binary-search/
---

## A read-mostly table of `int` keys, built once, will grow from 1 000 to 1 M keys. You pick `std::map` over a sorted `std::vector` with `std::lower_bound` "so it scales". What happens at 1 M keys?

```cpp
std::map<int, Row> rows;                        // built once, read per request
// alternative: std::vector<std::pair<int, Row>> sorted by key + std::lower_bound
```

---

**The sorted vector: typically several times faster per lookup.**

Both are O(log n) and tie at 1 000 keys. At 1 M, every `std::map`
level is a separate heap node, likely a miss; the vector is compact
and its last search steps share cache lines. Measured (GCC 16.2
`-O2`, Ryzen 7 PRO 6850U): 1500 versus 266 ns.
