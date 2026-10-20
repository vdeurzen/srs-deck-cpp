---
id: linear-cost-table
kind: cloze
version: 2
level: 1
tags: [foundations, linked-lists, complexity]
requires:
  - linear-list-node
  - cpp-essentials/containers-default-to-vector
elaborate: "Say in one sentence, as to an interviewer, why `std::list` offers no `operator[]` at all."
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.2
---

A singly linked list keeps only a `head` pointer. Reading the element at
index i (counting from 0) takes exactly {{c1::i::a count, in terms of i}}
`next` hops from `head`, where a `std::vector` computes the address in
one step whatever i is.

---

The nodes are scattered, so there is no `base + i · size` shortcut:
each node only knows its successor. Index 0 is `head` itself, and each
hop moves one index on, so index i costs O(i): O(n) for the last element.
