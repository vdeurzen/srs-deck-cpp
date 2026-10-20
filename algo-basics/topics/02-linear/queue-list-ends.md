---
id: linear-queue-list-ends
kind: basic
version: 1
level: 2
tags: [foundations, queues, linked-lists]
requires:
  - interview-essentials/linear-queue-adt
  - interview-essentials/linear-list-node
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.2
---

## A queue is a singly linked list with `head` and `tail` pointers. Why must dequeue take the head node, rather than the tail node?

```text
head ──► [A] ──► [B] ──► [C] ◄── tail
```

---

**Removing the tail needs its predecessor, which only an O(n) walk from `head` can find.**

Removing the head is `head = head->next`; adding after the tail is
`tail->next = n; tail = n`. Both are O(1). With the ends swapped, every
dequeue would walk the whole list.
