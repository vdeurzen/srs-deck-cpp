---
id: foundations-aos-vs-soa
kind: basic
version: 1
level: 3
tags: [memory-hierarchy, layout, databases, low-latency]
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/aos-soa/
  - https://www.cidrdb.org/cidr2005/papers/P19.pdf
---

## When does a struct-of-arrays layout beat an array-of-structs, and what does it cost you?

---

```cpp
struct Order { std::uint64_t id; double px; std::uint32_t qty; char side; };
std::vector<Order> aos;                       // 24 bytes/record, all fields together

struct Orders {                               // one vector per field
  std::vector<std::uint64_t> id;
  std::vector<double> px;
  std::vector<std::uint32_t> qty;
  std::vector<char> side;
};
```

**SoA wins when a pass touches few fields of many records.** Summing
`px` over a million orders from the AoS layout drags all 24 bytes of each
record through the cache to use 8 of them; from SoA the loop streams a
dense `double` array, gets ~3× more useful bytes per cache line, is
trivially vectorisable (contiguous, no gather), and gives the prefetcher
a single predictable stream per column. That is exactly the argument for
**columnar databases**: a scan of two columns out of fifty reads two
columns' worth of pages, and each column compresses far better because
neighbouring values have the same type and often near-identical values.

**AoS wins when you touch one whole record at a time.** Looking up one
order by id and reading all of its fields costs one miss in AoS and one
miss *per column* in SoA — which is why OLTP systems, which read and
update whole rows, stay row-oriented, and why hybrids (PAX, Parquet row
groups, "row store for writes, column store for scans") exist at all.

The costs of SoA are real: no `Order&` to pass around, so code moves from
objects to indices and parallel arrays that must be kept the same length;
inserts and deletes touch N vectors; and every abstraction you add back
on top (a proxy reference, a `zip_view`) is work the AoS version did not
need.
