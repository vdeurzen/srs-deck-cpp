---
id: trap-small-n
kind: basic
version: 1
level: 2
tags: [transfer, misconception, engineering, cost-model]
elaborate: What is the largest n your "scalable" structure will actually see this year, and which operations does it really serve?
requires:
  - foundations-prefetch-scan-vs-chase
  - search-lower-bound-meaning
  - cpp-essentials/containers-map-vs-unordered-map
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
  - https://en.algorithmica.org/hpc/data-structures/binary-search/
---

## Many pick `std::map` over a sorted `std::vector` searched with `std::lower_bound` "so it scales". A read-mostly table of `int` keys with a 16-byte `Row` each, built once, grows from 1 000 to 1 M keys. At 1 M keys, roughly how do their lookup times compare?

```cpp
std::map<int, Row> rows;                        // built once, read per request
// alternative: std::vector<std::pair<int, Row>> sorted by key + std::lower_bound
```

---

**The sorted vector: typically about 4× faster per lookup.**

Both are O(log n); at 1 000 keys both fit in cache and tie (~35 ns).
At 1 M, each `std::map` level is a separate node, a likely miss; the
vector's last steps share cache lines. Measured (GCC 16.2 `-O2`, Ryzen
7 PRO 6850U): ~850 versus ~210 ns.
