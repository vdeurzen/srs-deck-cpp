---
id: hash-fibonacci-mix
kind: code
version: 1
level: 4
tags: [hashing, bit-tricks]
input: chips
choices:
  c1:
    - "(64 - log2_buckets)"
    - "log2_buckets"
    - "(64 - log2_buckets - 1)"
    - "(log2_buckets - 64)"
compile:
  harness: |
    // The high bits carry every input bit, so keys that share low bits
    // still land in different buckets.
    static_assert(bucket_of(1, 4) == 9);
    static_assert(bucket_of(16, 4) == 14);
    static_assert(bucket_of(32, 4) == 12);
    static_assert(bucket_of(48, 4) == 10);
    static_assert(bucket_of(1, 10) == 632);
    int main() {}
refs:
  - https://probablydance.com/2018/06/16/fibonacci-hashing-the-optimization-that-the-world-forgot-or-a-better-alternative-to-consecutive-integer-hash-functions/
  - https://en.wikipedia.org/wiki/Hash_function#Fibonacci_hashing
---

Fibonacci hashing multiplies by 2⁶⁴/φ and keeps the **top** bits of the
product. Complete the shift for a table of `2^log2_buckets` buckets.

```cpp
#include <cstddef>
#include <cstdint>

inline constexpr std::uint64_t kGolden = 0x9E3779B97F4A7C15ULL;  // 2^64 / φ

constexpr std::size_t bucket_of(std::uint64_t key, int log2_buckets) {
  return static_cast<std::size_t>((key * kGolden) >> {{c1::(64 - log2_buckets)}});
}
```

---

Multiplication propagates entropy **upwards**: bit 0 of the input
affects every higher bit of the product, but nothing below itself. So
the high bits of `key * odd_constant` mix the whole key, while the low
bits are barely disturbed — which is exactly backwards from what
`h & (n − 1)` reads. Shifting right by `64 − b` keeps the top `b` bits
and yields a value already in `[0, 2^b)`: no modulo, no mask, one
multiply and one shift.

The constant is the 64-bit approximation of the golden ratio's
reciprocal. Any large odd constant mixes; φ is the choice with the best
equidistribution for *consecutive* keys, which is the common case for
ids — the harness pins the other one, keys that differ only in bits the
mask would have thrown away.

Two caveats. This is a **bucket index**, not a hash: it is fast mixing,
not avalanche in both directions, and it is trivially invertible, so it
is no defence against adversarial keys — use a keyed hash there. And
because it consumes the top bits, a table that *also* wants a tag byte
from the hash (a Swiss table's H2) must take that tag from bits the index
does not use.
