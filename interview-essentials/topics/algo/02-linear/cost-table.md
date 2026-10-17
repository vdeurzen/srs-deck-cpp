---
id: linear-cost-table
kind: cloze
version: 2
level: 1
tags: [foundations, linked-lists, complexity]
requires:
  - linear-list-node
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.2
---

A singly linked list keeps only a `head` pointer. Reading the element at
index i (counting from 0) costs {{c1::O(i)::a growth class}}, where a
`std::vector` pays O(1) whatever i is.

---

The nodes are scattered, so there is no `base + i · size` shortcut:
each node only knows its successor. Reaching index i is a walk of exactly
i `next` hops from `head`; an array computes the address in one step.
O(n) is a true bound too, but only for the last element.
