---
id: sort-radix-trace
kind: trace
version: 1
level: 2
tags: [tracing, sorting, radix-sort, stability]
probes:
  1: { v: "31 32 12 13 23" }
  2: { v: "12 13 23 31 32" }
requires:
  - sort-counting-code
refs:
  - https://en.wikipedia.org/wiki/Radix_sort
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
---

LSD radix sort: one stable pass per decimal digit, least significant
first. Write `v` as space-separated values.

```cpp
auto by_digit = [](const std::vector<int>& v, int div) {
  std::vector<int> out;                 // buckets 0..9, each in input order
  for (int d = 0; d < 10; ++d)
    for (int x : v)
      if (x / div % 10 == d) out.push_back(x);
  return out;
};
std::vector<int> v{32, 13, 31, 23, 12};
v = by_digit(v, 1);     // @1
v = by_digit(v, 10);    // @2
```

---

The ones pass leaves 12 before 13 and 31 before 32. The tens pass puts
12 and 13 in one bucket and, **being stable, keeps the ones order**, so
the array ends sorted; an unstable tens pass could emit 13 before 12.
Cost: d passes of O(n + b) for d digits in base b. (Run with GCC 16.2.)
