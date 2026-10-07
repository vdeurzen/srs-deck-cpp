---
id: hash-quality-low-bits
kind: basic
version: 1
level: 3
requires:
  - hash-chaining-vs-open-addressing
tags: [hashing, avalanche]
refs:
  - https://en.cppreference.com/w/cpp/utility/hash
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/functional_hash.h
elaborate: Which of your keys are aligned pointers, block-allocated ids or timestamps with a fixed stride?
---

## libstdc++'s `std::hash` for integers is the identity. Keys are ids that are all multiples of 16. Why is that harmless in `std::unordered_map` but disastrous in a power-of-two flat table?

```cpp
slot = h % 1031;        // unordered_map: prime bucket count
slot = h & (1024 - 1);  // flat table: mask
```

---

**The prime modulo uses every bit; the mask keeps only the low bits, all zero here.**

With identity hashing and a mask, every key lands in one slot of
sixteen, so probe runs grow sixteen-fold. Aligned pointers and
strided ids break it the same way. The fix is a hash whose low bits
depend on all input bits.
