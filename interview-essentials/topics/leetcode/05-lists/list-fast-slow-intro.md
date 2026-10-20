---
id: list-fast-slow-intro
kind: basic
version: 1
level: 1
tags: [linked-lists, foundations]
requires:
  - linear-list-node
refs:
  - Knuth, The Art of Computer Programming, Vol. 2, 3rd ed., §3.1, exercise 6
  - https://leetcode.com/problems/linked-list-cycle/
elaborate: Say in one sentence, as to an interviewer, what a visited set would cost here that two pointers do not.
---

Two pointers start at node 1. Each step, `slow` moves one node along
`next` and `fast` moves two.

```text
A:  1 → 2 → 3 → 4 → null

B:  1 → 2 → 3 → 4
        ↑       │
        └───────┘        (4's next is 2)
```

## On list A, `fast` reaches null. On list B it never does. What happens to the two pointers on B instead?

---

**`fast` lands on `slow`'s node: inside the loop it gains one node per step.**

Once both are in the loop, `fast` closes the gap behind `slow` by
exactly one node each step, so the gap reaches 0 within one lap. So
"fast hit null" means no loop, and "they met" means a loop: two
pointers and O(1) memory.
