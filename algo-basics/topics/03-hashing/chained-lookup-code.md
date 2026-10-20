---
id: hashing-chained-lookup-code
kind: code
version: 1
level: 2
tags: [foundations, chaining]
requires:
  - interview-essentials/hashing-pigeonhole
input: chips
choices:
  c1: ["chain[bucket(k)]", "chain[k]", "chain[0]", "chain[bucket(k) + 1]"]
compile:
  harness: |
    constexpr void Table::insert(int k) { if (!contains(k)) chain[bucket(k)].push_back(k); }
    constexpr bool run() {
      Table t;
      for (int k : {3, 10, 15, 24}) t.insert(k);
      return t.contains(10) && t.contains(24) && t.contains(15)
          && !t.contains(17) && !t.contains(5);
    }
    static_assert(run());
    int main() {}
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §11.2
---

A hash table with 7 buckets, each holding a list (chain) of its keys.
Complete the lookup.

```cpp
#include <vector>

struct Table {
  static constexpr int m = 7;
  std::vector<int> chain[m];
  constexpr int bucket(int k) const { return k % m; }
  constexpr void insert(int k);   // appends k to its bucket's chain, unless present
  constexpr bool contains(int k) const {
    for (int x : {{c1::chain[bucket(k)]}}) if (x == k) return true;
    return false;
  }
};
```

---

**Recompute the key's bucket and scan only that chain**: insert put
the key there, so it is either in that chain or absent. 3, 10 and 24 share
bucket 3, and `==` tells them apart.

`chain[k]` uses the key as the index, which runs off the 7 buckets for
any k ≥ 7.
