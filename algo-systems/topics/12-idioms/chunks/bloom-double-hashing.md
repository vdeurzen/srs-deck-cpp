---
id: chunks-bloom-double-hashing
kind: chunk
version: 1
level: 4
tags: [idioms, sketches, hashing, databases]
expose_ms: 6000
compile:
  harness: |
    #include <bitset>
    constexpr unsigned long long bits_for(unsigned long long h, int k) {
      std::bitset<64> b;
      bloom_add(b, h, k);
      return b.to_ullong();
    }
    static_assert(bits_for(0x0000000500000003, 4) == 0x42108);   // 3, 8, 13, 18
    static_assert(bits_for(0x0000000400000003, 4) == 0x42108);   // h2 forced odd
    static_assert(bits_for(0x9E3779B97F4A7C15, 7) == 0x204080000204081);
    int main() {}
requires:
  - db-bloom-filter
refs:
  - https://doi.org/10.1002/rsa.20208
  - https://github.com/facebook/rocksdb/wiki/RocksDB-Bloom-Filter
---

```cpp
constexpr void bloom_add(auto& bits, unsigned long long key_hash, int k) {
  unsigned long long h1 = key_hash, h2 = h1 >> 32 | 1;
  for (int i = 0; i < k; ++i) {
    bits.set(h1 % bits.size());
    h1 += h2;
  }
}
```

---

Setting a Bloom filter's `k` bits from **one** hash. Kirsch and
Mitzenmacher show `h1 + i·h2` works as well as `k` independent hashes
for a Bloom filter, so an insert costs one hash computation, not `k`.

The loop is that formula in incremental form: after `i` additions, `h1`
*is* `h1 + i·h2`, so no multiply. `| 1` makes `h2` odd, coprime with a
power-of-two size, or the probes cover only part of the bits.
Production filters also confine all `k` bits to one cache line.
Compile-checked: the harness asserts the exact bits set.
