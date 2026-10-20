---
id: linear-cost-table
kind: cloze
version: 2
level: 1
tags: [foundations, linked-lists, complexity]
requires:
  - linear-list-node
elaborate: "Say in one sentence, as to an interviewer, why a list type that offered `[i]` indexing would mislead the code calling it."
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.2
---

A singly linked list keeps only a `head` pointer, and the node `head`
points at holds index 0. Reading the element at index i takes exactly
{{c1::i}} `next` hops from `head`.

---

Not i + 1: index 0 needs no hop at all, and each hop moves one index
on. So the last of n elements, index n − 1, costs n − 1 hops.
