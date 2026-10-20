---
id: list-fast-slow-worked
kind: basic
version: 1
level: 2
tags: [linked-lists, worked-example]
requires:
  - list-fast-slow-intro
refs:
  - Knuth, The Art of Computer Programming, Vol. 2, 3rd ed., §3.1, exercise 6
  - https://leetcode.com/problems/linked-list-cycle/
---

`1 → 2 → 3 → 4`, and 4's `next` is 2, so 2, 3, 4 form a loop. Both
pointers start at 1; each step `slow` moves one node and `fast` two.
"Gap" is how many nodes `fast` trails `slow` around the loop.

```text
step   slow   fast   gap
0      1      1      — (slow not in the loop yet)
1      2      3      2
2      3      2      1
3      4      4      0: they meet
```

## Why can `fast` never jump past `slow` without landing on it?

---

**Each step shrinks the gap by exactly one, so it hits 0 before going past.**

`fast` moves two nodes and `slow` one, so `fast` gains one node per step.
The gap starts below the loop's length (3 here), so they meet within
one lap: O(n) steps in all.
