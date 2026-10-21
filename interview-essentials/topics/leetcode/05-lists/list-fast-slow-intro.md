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

**`fast` lands on `slow`'s node.**

Once both are in the loop, call the gap how many nodes `fast` trails
`slow`. Each step `fast` gains one node, so the gap shrinks by exactly
one and reaches 0 within one lap. "Fast hit null" means no loop; "they
met" means a loop: two pointers, O(1) memory.
