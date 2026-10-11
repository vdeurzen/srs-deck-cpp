---
id: linear-stack-adt
kind: basic
version: 1
level: 1
tags: [foundations, stacks, adt]
requires:
  - linear-adt-vs-implementation
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.1 (stacks and queues)
  - https://en.cppreference.com/w/cpp/container/stack
---

## A stack receives `push(4)`, `push(9)`, `push(1)`, then `pop()`. Which value does `pop` remove?

---

**1: a stack removes the most recently pushed element still in it (last in, first out: LIFO).**

The ADT is `push(x)` to add, `top()` to read and `pop()` to remove that
newest element; nothing else is reachable, like a pile of plates. That
narrow interface is what lets every implementation make all three
O(1).
