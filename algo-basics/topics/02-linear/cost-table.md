---
id: linear-cost-table
kind: cloze
version: 1
level: 1
tags: [foundations, linked-lists, complexity]
requires:
  - linear-list-node
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.2
---

A singly linked list keeps only a `head` pointer. Reading the element at
index i (counting from 0) follows exactly {{c1::i::in terms of i}} `next`
pointers after `head`.

---

The nodes are scattered, so there is no `base + i · size` shortcut:
each node only knows its successor. Reaching index i is a walk, O(i),
where an array computes the address in one step whatever i is.
