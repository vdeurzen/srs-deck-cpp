---
id: db-bloom-filter
kind: code
version: 2
level: 4
tags: [databases, sketches, probabilistic]
input: chips
choices:
  c1:
    - "bits_per_key * 0.6931471805599453"
    - "bits_per_key / 0.6931471805599453"
    - "bits_per_key * 0.5"
    - "bits_per_key"
compile:
  harness: |
    static_assert(optimal_k(8) == 6);     // ~2.1 % false positives
    static_assert(optimal_k(10) == 7);    // ~0.8 %, the common default
    static_assert(optimal_k(16) == 11);   // ~0.05 %
    static_assert(optimal_k(20) == 14);
    int main() {}
requires:
  - db-bloom-basics
refs:
  - https://dl.acm.org/doi/10.1145/362686.362692
  - https://github.com/facebook/rocksdb/wiki/RocksDB-Bloom-Filter
  - https://dl.acm.org/doi/10.1145/2805789.2805800
---

A Bloom filter spends `m` bits on `n` keys. Complete the number of hash
functions that minimises its false-positive rate.

```cpp
// Number of hash functions to use, given the bits allocated per key.
constexpr int optimal_k(double bits_per_key) {
  return static_cast<int>({{c1::bits_per_key * 0.6931471805599453}} + 0.5);
}
```

---

**`k = (m/n)·ln 2`: the optimum leaves the bit array half full.** More
hash functions set more bits per key, so the array fills faster; fewer
make each test weaker. At the balance point a probe finds a set bit with probability ½,
so the false-positive rate is `(1/2)^k`, about `0.6185^(m/n)`: **10 bits
per key ≈ 1 %**, and each extra 10 bits divide it by about 100. The rate
depends on bits *per key*, not on the number of keys.
