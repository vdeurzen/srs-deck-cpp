---
id: hash-avalanche
kind: basic
version: 1
level: 3
requires:
  - hash-quality-low-bits
tags: [hashing, avalanche]
refs:
  - https://en.wikipedia.org/wiki/Avalanche_effect
  - https://github.com/aappleby/smhasher/blob/master/src/MurmurHash3.cpp
---

## A table indexes with *some* bits of the hash: low bits for a mask, high bits for Fibonacci hashing. What property makes any such subset a good index?

---

**Avalanche: flipping any input bit flips each output bit with probability ½.**

Then every output bit depends on the whole key, so any slice of the hash
carries the key's entropy. A finaliser like MurmurHash3's `fmix64`
(xor-shift, multiply, xor-shift, multiply, xor-shift) adds it to the
identity hash for a few cycles.
