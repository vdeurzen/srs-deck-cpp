---
id: list-reverse-worked
kind: basic
version: 1
level: 2
tags: [linked-lists, worked-example]
requires:
  - linear-list-node
refs:
  - https://leetcode.com/problems/reverse-linked-list/
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 3rd ed., exercise 10.2-7
---

Reversing `1 → 2 → 3` in place. `prev` starts null, `cur` at node 1.
Each pass: save `next = cur->next`; flip `cur->next = prev`; advance
`prev = cur`; advance `cur = next`.

```text
pass    next saved   flip       prev   cur
start   —            —          null   1
1       2            1 → null   1      2
2       3            2 → 1      2      3
3       null         3 → 2      3      null
```

## In pass 2, why must `next` be saved before the flip?

---

**The flip overwrites 2's only link to 3.**

After `2 → 1`, node 3 is reachable only through the saved `next`;
following `cur->next` would walk back to 1. At the end `cur` is null and
`prev` heads the reversed list `3 → 2 → 1`.
