---
id: uniq-worked
kind: basic
version: 1
level: 2
tags: [algorithms, rearranging, worked-example]
requires:
  - uniq-dedupe-intro
refs:
  - https://en.cppreference.com/w/cpp/algorithm/unique
  - https://eel.is/c++draft/alg.unique
---

```cpp
std::vector<int> v{1, 1, 2, 1};
auto e = std::unique(v.begin(), v.end());
```

Slot 0 is always kept. Then `std::unique` reads each later element once,
front to back (`_` = unspecified, one per slot):

| read slot | value | compare with the last kept | step | `v` after |
| --- | --- | --- | --- | --- |
| 1 | 1 | 1: equal | skip an equal | `1 \| _ _ _` |
| 2 | 2 | 1: differs | copy a new value into the next slot | `1 2 \| _ _` |
| 3 | 1 | 2: differs | copy a new value into the next slot | `1 2 1 \| _` |

Return the new end: `e` is the position of slot 3; `v.size()` is still 4.

## At read slot 3, the 1 is kept although a 1 was already kept. Why?

---

**It is compared only with the last kept element, 2, which differs.**

`unique` looks one element back, never at every kept value, so it drops
only *adjacent* duplicates. A value that comes back after a different
one starts a new run and is kept again.
