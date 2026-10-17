---
id: linear-list-node
kind: basic
version: 1
level: 1
tags: [foundations, linked-lists]
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.2
  - https://en.cppreference.com/w/cpp/container/forward_list
requires:
  - linear-array-index-contiguity
---

## A singly linked list holds 5, 8, 2, in nodes scattered across memory. Besides its value, what does each node store?

```text
head ──► [ 5 | … ]   [ 8 | … ]   [ 2 | … ]
```

---

**The address of the next node (a `next` pointer); the last node's is null.**

The nodes are not side by side, so no `base + i · size` can find them:
each must say where its successor is. The list itself is just `head`, a
pointer to the first node; an empty list has a null `head`.
