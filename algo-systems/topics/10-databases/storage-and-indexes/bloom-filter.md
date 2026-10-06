---
id: db-bloom-filter
kind: code
version: 1
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
refs:
  - https://dl.acm.org/doi/10.1145/362686.362692
  - https://github.com/facebook/rocksdb/wiki/RocksDB-Bloom-Filter
  - https://dl.acm.org/doi/10.1145/2805789.2805800
---

A Bloom filter with `m` bits for `n` keys minimises false positives at
`k = (m/n)·ln 2` hash functions. Complete the formula.

```cpp
// Number of hash functions to use, given the bits allocated per key.
constexpr int optimal_k(double bits_per_key) {
  return static_cast<int>({{c1::bits_per_key * 0.6931471805599453}} + 0.5);
}
```

---

The intuition behind `ln 2`: more hash functions set more bits per
insertion, so the table fills faster; fewer make each membership test
weaker. The optimum is exactly where the bit array ends up **half
full**, and it gives a false positive rate of `(1/2)^k`, i.e. about
`0.6185^(m/n)`. Useful numbers to carry: **10 bits per key ≈ 1 %**,
each extra 10 bits per key divides the rate by about 100, and the rate
depends only on bits *per key* — not on how many keys there are.

The guarantee that makes the structure usable is one-sided: **no false
negatives**. "Not present" is certain; "present" is a maybe. That is
what lets an LSM engine skip an SSTable entirely on a negative answer,
or a CDN decline to cache an object on its first request (Akamai's
"one-hit wonder" filter) — the expensive operation only happens on a
positive, and a false positive costs
performance, never correctness.

What it cannot do: delete (clearing bits would break other keys — use
a counting Bloom filter or a cuckoo filter), enumerate its contents, or
tell you how many times something was inserted. And the classic
implementation costs `k` **random** memory accesses per query, which is
`k` cache misses; production filters therefore use **blocked** layouts
(all k bits inside one cache line, chosen by a first hash) trading a
slightly worse rate for one miss — which is what RocksDB's
cache-line-local Bloom (`FastLocalBloom`) does. Its Ribbon filter is a
different trade again: a static filter built by solving a banded
linear system, spending more CPU for ~30 % less space at the same
rate.

Practical rule: size it from the *expected* n. A Bloom filter that
receives twice the keys it was sized for does not fail loudly, it just
degrades silently and superlinearly — at 10 bits per key its rate
goes from ~0.8 % to ~14 %, and at four times the keys to ~64 %, with
the fixed `k` (optimal for the old n) making it worse still.
