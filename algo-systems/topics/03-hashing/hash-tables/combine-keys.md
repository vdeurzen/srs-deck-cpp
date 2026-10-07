---
id: hash-combine-keys
kind: code
version: 1
level: 3
tags: [hashing, avalanche]
requires:
  - hash-avalanche
input: chips
choices:
  c1:
    - "(h << 6) + (h >> 2)"
    - "(k << 6) + (k >> 2)"
    - "k"
    - "0"
compile:
  harness: |
    constexpr std::uint64_t pair_hash(std::uint64_t a, std::uint64_t b) {
      return combine(combine(0, a), b);
    }
    static_assert(pair_hash(1, 2) != pair_hash(2, 1));   // (x, y) ≠ (y, x)
    static_assert(pair_hash(7, 7) != pair_hash(9, 9));   // equal fields don't cancel
    static_assert(pair_hash(7, 7) != 0);
    int main() {}
refs:
  - https://github.com/boostorg/container_hash/blob/boost-1.80.0/include/boost/container_hash/hash.hpp
  - https://github.com/boostorg/container_hash/blob/boost-1.81.0/include/boost/container_hash/hash.hpp
---

A `Fill{account, order}` key is hashed by folding the two field hashes
into a running seed `h`. Plain `h ^ k` makes `(1, 2)` and `(2, 1)`
collide. Complete the extra term so the result depends on field order.

```cpp
#include <cstdint>

constexpr std::uint64_t combine(std::uint64_t h, std::uint64_t k) {
  return h ^ (k + 0x9e3779b97f4a7c15ULL + {{c1::(h << 6) + (h >> 2)}});
}
```

---

**Mix the seed, not the field.** Any term built from `k` alone keeps the
two fields' roles interchangeable: with a zero starting seed, the result
is `f(a) ^ f(b)`, symmetric, and `(x, x)` gives 0. Feeding `h` back in
makes the second field's contribution depend on the first.

This is Boost's classic `hash_combine` widened to 64 bits; since 1.81
Boost runs the sum through a full mixer, because this one avalanches
poorly. The shape to remember is the seed feedback, not the constants.
