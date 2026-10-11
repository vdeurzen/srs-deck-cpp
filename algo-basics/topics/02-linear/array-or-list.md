---
id: linear-array-or-list
kind: basic
version: 1
level: 2
tags: [foundations, arrays, linked-lists, recognition]
requires:
  - linear-cost-table
  - linear-array-front-insert
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.1–10.2
---

## A leaderboard of 10,000 scores is asked for the k-th ranked player thousands of times a second, and is rebuilt once a day. Array or singly linked list?

---

**Array: the k-th player is a read by index, one address calculation instead of a walk of k nodes.**

The array's weakness, shifting elements on insert, is paid once a day.
A list wins only when you insert or remove next to nodes you already
hold, far more often than you read by position.
