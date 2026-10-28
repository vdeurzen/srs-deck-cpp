---
id: view-iota-take-vocab
kind: basic
version: 1
level: 1
tags: [ranges, views]
requires:
  - view-intro
elaborate: Say what the loop would do if you deleted the second stage, and why the compiler would not stop you.
refs:
  - https://en.cppreference.com/w/cpp/ranges/iota_view
  - https://en.cppreference.com/w/cpp/ranges/take_view
---

```cpp
int n = 0;
for (int x : std::views::iota(1) | std::views::take(3))
    n = n * 10 + x;
```

## What is `n` after the loop?

---

**123: `iota(1)` counts 1, 2, 3, … without end; `take(3)` stops after three.**

Both are views, so neither stores numbers: `iota` makes each count when
asked, and `take(3)` reports the end once three have passed. Without
`take`, the loop would never finish.
