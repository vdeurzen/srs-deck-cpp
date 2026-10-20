---
id: linear-list-node
kind: basic
version: 1
level: 1
tags: [foundations, linked-lists]
elaborate: "Where else does 'each element says where the next one is' appear, such as a free list or a chain of log segments?"
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.2
  - https://en.cppreference.com/w/cpp/container/forward_list
requires:
  - linear-array-index-contiguity
  - cpp-essentials/ptr-null-pointer
---

A list holds 5, 8, 2, each value in its own node; the nodes are not
side by side in memory. `head` holds the address of the 5's node.

```text
head = 0x7a10    [ 5 | … ] at 0x7a10   [ 8 | … ] at 0x3c40   [ 2 | … ] at 0x9e08
```

## Besides its value, what must each node hold so that a walk from `head` reaches every node in order?

---

**The address of the next node (a `next` pointer); the last node's is null.**

No `base + i · size` can find a node that is not side by side with the
others: each must say where its successor is. Nodes chained this way
form a singly linked list; an empty one has a null `head`.
