---
id: bits-mask-as-set
kind: basic
version: 1
level: 1
tags: [foundations, bit-tricks, bitmask, subsets]
requires:
  - foundations-bitwise-operators
refs:
  - https://cp-algorithms.com/algebra/bit-manipulation.html
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Bitwise_shift_operators
elaborate: Where in your own code would a 64-bit mask replace a `std::set<int>` of small ids, and what would it cost you?
---

## A set drawn from items 0, 1, 2, 3 is stored as one `unsigned m`: bit i is 1 when item i is in the set (bit 0 is the rightmost). With `m = 0b1010`, which items are in it?

---

**Items 1 and 3: bits 1 and 3 are the set ones.**

Reading right to left, bits 0–3 are 0, 1, 0, 1. Test item i with
`(m >> i) & 1`; add it with `m |= 1 << i`. n items have 2ⁿ masks,
0 to 2ⁿ − 1, one per subset.
