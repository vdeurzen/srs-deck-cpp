---
id: chunks-bloom-double-hashing
kind: chunk
version: 1
level: 4
tags: [idioms, sketches, hashing, databases]
expose_ms: 6000
compile: null
refs:
  - https://www.eecs.harvard.edu/~michaelm/postscripts/rsa2008.pdf
  - https://github.com/facebook/rocksdb/wiki/RocksDB-Bloom-Filter
---

```cpp
std::uint64_t h1 = hash(key), h2 = h1 >> 32 | 1;
for (int i = 0; i < k; ++i) {
  bits.set(h1 % bits.size());
  h1 += h2;
}
```

---

Setting a Bloom filter's `k` bits from **one** hash. Kirsch and
Mitzenmacher's result is that `g_i(x) = h1(x) + i·h2(x)` behaves, for
Bloom-filter purposes, as well as `k` independent hash functions — so a
filter costs one hash computation instead of `k`, which is most of its
insert and query cost.

The loop is the formula in incremental form: `h1` after `i` additions
of `h2` *is* `h1 + i·h2`, so the index needs no multiply — and `h2`
must not also be multiplied by `i`, which would double the stride.

The `| 1` matters: `h2` must be odd (coprime with a power-of-two table)
or the probe sequence covers only a fraction of the bits.

The production refinement to know about is **blocking**: derive a
single cache-line-sized block from `h1` and set all `k` bits inside it,
trading a slightly worse false-positive rate for one cache miss per
query instead of `k`.

Graded by whitespace-normalised equality (SPEC §4.7): `hash`, `bits`
and `k` come from the filter that owns them.
