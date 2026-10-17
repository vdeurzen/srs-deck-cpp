---
id: foundations-bits-lowest-set-bit
kind: basic
version: 1
level: 2
tags: [bit-tricks, twos-complement]
refs:
  - https://graphics.stanford.edu/~seander/bithacks.html
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic
---

## For a 32- or 64-bit unsigned `x`, why does `x & -x` keep only the lowest set bit?

---

```
x      = 0110 1000
~x     = 1001 0111
-x     = 1001 1000      (~x + 1)
x & -x = 0000 1000
```

**`-x` is `~x + 1`, and the `+1` carries up to the lowest set bit.**
So `-x` matches `x` at that bit (and the zeros below it) and is its
complement above it; the AND keeps exactly that bit. Use `unsigned`
or wider: a `uint8_t` promotes to `int` before `-` applies.
