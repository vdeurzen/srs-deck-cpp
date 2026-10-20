---
id: linear-array-or-list
kind: basic
version: 1
level: 2
tags: [foundations, arrays, linked-lists, recognition]
requires:
  - linear-cost-table
elaborate: "Which collection in your own code is read by position far more often than it is changed in the middle, and what backs it?"
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.1–10.2
---

## A leaderboard of 10,000 scores is asked for the k-th ranked player thousands of times a second, and is rebuilt once a day. Array or singly linked list?

---

**Array: the k-th player is one read by index, not a walk of k nodes.**

The array's weakness, shifting elements on insert, is paid once a day.
A list wins only when you insert or remove next to nodes you already
hold, far more often than you read by position.
