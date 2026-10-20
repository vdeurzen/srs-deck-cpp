---
id: bit-precedence-trap
kind: basic
version: 1
level: 2
tags: [bit-tricks, misconception, lc-78]
requires:
  - foundations-bitwise-operators
refs:
  - https://en.cppreference.com/w/cpp/language/operator_precedence
  - https://leetcode.com/problems/subsets/
elaborate: Which other bit tests in your code compare with `==` or `!=` after a `&`, and would they survive the same reading?
---

A subset-mask loop adds node `v` to mask `m` only if it is not there
yet, and many read its test as `(m & 1 << v) == 0`:

```cpp
if (m & 1 << v == 0) m |= 1 << v;
```

## What does the condition actually compute?

---

**`m & ((1 << v) == 0)`, which is `m & 0`: always false.**

`<<` binds tighter than `==`, and `==` binds tighter than `&`. The
compiler only warns (`-Wparentheses`, in `-Wall`). Write
`(m & 1 << v) == 0` or `!(m >> v & 1)`.
