---
id: foundations-soa-invariant
kind: basic
version: 1
level: 3
requires:
  - foundations-aos-vs-soa
tags: [layout, invariants]
elaborate: Would a `std::views::zip` over the columns give you back an `Order&`? What would it cost compared with the struct?
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/aos-soa/
  - https://en.cppreference.com/w/cpp/ranges/zip_view
---

## You replace `std::vector<Order>` by one vector per field. Which invariant did the struct enforce for free that your code must now keep by hand?

```cpp
struct Orders {
  std::vector<std::uint64_t> id;
  std::vector<double> px;
  std::vector<std::uint32_t> qty;
};
```

---

**Every column has the same length, and index `i` names one record in all of them.**
An insert or erase must touch every vector; miss one and every later
record is silently stitched from two orders. There is no `Order&` to
pass, so functions take an index and the whole `Orders`.
