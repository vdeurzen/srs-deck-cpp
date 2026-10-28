---
id: srch-lower-bound-insert
kind: basic
version: 1
level: 1
tags: [algorithms, searching]
requires:
  - srch-partitioned-vocab
  - alg-iter-index
elaborate: Say where else in a program the useful answer is "where would x go?" rather than "is x there?".
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
  - https://en.cppreference.com/w/cpp/container/vector/insert
---

`v.insert(it, x)` inserts `x` just before position `it`.

```cpp
std::vector<int> v{2, 5, 9};
auto it = std::lower_bound(v.begin(), v.end(), 6);
v.insert(it, 6);
```

## Which element does `it` point at?

---

**The 9: `lower_bound` returns the first element not less than 6.**

Every element before that position is less than 6, so inserting 6 there
keeps `v` sorted: `{2, 5, 6, 9}`. Its index is `it - v.begin()`, 2. The
call needs only a range partitioned by `e < 6`, which a sorted one is.
