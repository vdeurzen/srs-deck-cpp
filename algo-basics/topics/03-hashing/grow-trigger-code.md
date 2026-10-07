---
id: hashing-grow-trigger-code
kind: code
version: 1
level: 2
tags: [hashing, load-factor]
requires:
  - hashing-load-factor
input: chips
choices:
  c1: ["size + 1 > buckets", "size > buckets", "size + 1 >= buckets", "size + 1 > 2 * buckets"]
compile:
  harness: |
    static_assert(buckets_after(8) == 8);     // load factor exactly 1.0
    static_assert(buckets_after(9) == 16);
    static_assert(buckets_after(16) == 16);
    static_assert(buckets_after(17) == 32);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_map/max_load_factor
---

A table starts with 8 buckets and a maximum load factor of 1.0. Before
each insert it doubles if the new key would push the load factor over
the maximum. Complete the test.

```cpp
constexpr int buckets_after(int n) {        // bucket count after n inserts
  int buckets = 8;
  for (int size = 0; size < n; ++size)      // size = keys already stored
    if ({{c1::size + 1 > buckets}}) buckets *= 2;
  return buckets;
}
```

---

**Check the load factor the table *would* have: (size + 1) / buckets > 1.0.**
Testing before the insert means the limit is never exceeded, not even
for one insert. `size > buckets` lets the 9th key in at load 1.125;
`>=` doubles one key too early.
