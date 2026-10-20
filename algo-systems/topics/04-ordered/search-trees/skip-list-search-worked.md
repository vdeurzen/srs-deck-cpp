---
id: ordered-skip-list-search-worked
kind: basic
version: 1
level: 4
tags: [trees, randomised, worked-example]
requires:
  - ordered-skip-list
refs:
  - https://dl.acm.org/doi/10.1145/78973.78977
---

A skip-list search for 15. On each level, from the top down, it moves
right while the next node's key is smaller than 15, then drops a level.

```
level 1:  head -------> 9 ---------> 21
level 0:  head --> 4 -> 9 --> 15 --> 21

level  at    next key   action
1      head  9 < 15     move to 9
1      9     21 ≥ 15    drop a level
0      9     15 ≥ 15    stop: answer is next
```

## Row 3: why does the search stop at 9 instead of moving onto 15?

---

**It moves only onto keys smaller than the target, so it stops just before it.**

The node before the key is the useful one: its `next[0]` is the key if
present, and it is exactly where an insert of 15 would splice in on
that level.
