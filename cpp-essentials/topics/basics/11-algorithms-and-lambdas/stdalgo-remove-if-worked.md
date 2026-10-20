---
id: stdalgo-remove-if-worked
kind: basic
version: 1
level: 1
tags: [algorithms, worked-example, foundations]
requires:
  - lambda-syntax-intro
  - iter-end-one-past
refs:
  - https://en.cppreference.com/w/cpp/algorithm/remove
---

```cpp
std::vector<int> v{1, 4, 2, 5};
auto e = std::remove_if(v.begin(), v.end(),
                        [](int x) { return x > 3; });
```

`std::remove_if` reads each element once, front to back:

| read slot | value | `x > 3` | step | `v` after |
| --- | --- | --- | --- | --- |
| 0 | 1 | false | keep in slot 0 | 1 4 2 5 |
| 1 | 4 | true | skip | 1 4 2 5 |
| 2 | 2 | false | copy into slot 1 | 1 2 2 5 |
| 3 | 5 | true | skip | 1 2 2 5 |

It returns `e`, the position of slot 2; `v.size()` is still 4.

## At read slot 2, the kept 2 is copied into slot 1, not left in slot 2. Why slot 1?

---

**Slot 1 is the next free slot: the write position advances only on a keep.**

Kept elements are packed to the front in order, so slots 0 and 1 now hold
1 and 2, and `e` marks where they end. `remove_if` sees only
positions, so it cannot shrink `v`; slots 2 and 3 hold leftovers.
