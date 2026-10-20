---
id: seq-mask-is-mod
kind: basic
version: 1
level: 2
tags: [bit-tricks, low-latency]
requires:
  - foundations-bitwise-operators
elaborate: Where else would you replace `% n` with a mask, and what does that force you to choose for n?
refs:
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Bitwise_logic_operators
  - https://graphics.stanford.edu/~seander/bithacks.html#ModulusDivisionEasy
---

## For an unsigned `x`, why does `x & 7` always equal `x % 8`?

```
x     = 0b1101   (13)
7     = 0b0111
x & 7 = 0b0101   (5)    13 % 8 = 5
```

---

**7 is three 1 bits, so the AND keeps x's low three bits: the remainder by 8.**

Every bit above those three is worth a multiple of 8, so dropping them
is dividing out the 8s. It works for any power of two n with mask
n − 1, and costs one cycle where `%` may cost a division.
