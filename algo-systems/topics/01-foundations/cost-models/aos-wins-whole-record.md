---
id: foundations-aos-wins-whole-record
kind: basic
version: 1
level: 3
requires:
  - foundations-aos-vs-soa
tags: [memory-hierarchy, layout, databases]
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/aos-soa/
  - https://www.cidrdb.org/cidr2005/papers/P19.pdf
---

## An OLTP engine looks up one order by id and reads all four of its fields. Why does it keep rows together (AoS) rather than one column per field (SoA)?

```cpp
struct Order { std::uint64_t id; double px; std::uint32_t qty, side; };  // 24 B
std::vector<Order> rows;                                   // AoS
struct Orders { std::vector<std::uint64_t> id; std::vector<double> px;
                std::vector<std::uint32_t> qty, side; };   // SoA
```

---

**AoS costs about one cache miss per record; SoA costs one per field.**
The 24 bytes of one `Order` sit together, in one line or straddling two;
split into columns they sit in four lines far apart. Row stores serve whole-record reads and updates, which is
why hybrids (PAX, Parquet row groups) exist.
