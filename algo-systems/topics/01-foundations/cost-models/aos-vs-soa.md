---
id: foundations-aos-vs-soa
kind: basic
version: 1
level: 3
requires:
  - foundations-cache-cost-model
tags: [memory-hierarchy, layout, databases, low-latency]
elaborate: Which loop in your code reads one or two fields of every element of a large array of structs?
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/aos-soa/
  - https://www.cidrdb.org/cidr2005/papers/P19.pdf
---

## A pass sums `px` over a million orders. Why is it faster over one vector per field (SoA) than over `std::vector<Order>` (AoS)?

```cpp
struct Order { std::uint64_t id; double px; std::uint32_t qty; char side; };  // 24 B
```

---

**SoA streams only the bytes the pass uses: 8 of every 24.**
AoS drags whole records through the cache, so a line holds 2⅔ useful
prices instead of 8. A dense `double` array also vectorises without a
gather and is one predictable prefetch stream. That is the columnar
database argument.
