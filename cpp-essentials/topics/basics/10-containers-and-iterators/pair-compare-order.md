---
id: pair-compare-order
kind: basic
version: 1
level: 1
tags: [utility, pair, comparison, foundations]
requires:
  - pair-basics
elaborate: Say how this rule decides the order when you sort a vector of (score, name) pairs, and what you would swap to sort by name first.
refs:
  - https://en.cppreference.com/w/cpp/utility/pair/operator_cmp
---

```cpp
std::pair<int, int> a{2, 9};
std::pair<int, int> b{3, 1};
bool lt = a < b;
```

## What is `lt`?

---

**`true`: pairs compare `first`; `second` only breaks a tie.**

`<` on two pairs is lexicographic, like words in a dictionary: 2 < 3
decides it, so 9 > 1 never matters. Only equal `first`s fall through to
`second`: `{2, 4} < {2, 9}`. Anything that orders pairs, such as a
sort, uses this rule.
