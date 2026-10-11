---
id: linear-list-insert-held
kind: basic
version: 1
level: 1
tags: [foundations, linked-lists, complexity]
requires:
  - linear-list-node
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.2
  - https://en.cppreference.com/w/cpp/container/forward_list/insert_after
---

## You hold a pointer `p` to some node of a singly linked list of n nodes. A new node `q` goes right after `p`. How many pointers already in the list change?

```text
before:  [p: 10] ──► [30] ──► …        new: [q: 20]
```

---

**One: `p->next`, which now points at `q`.** The new `q->next` takes
`p`'s old successor.

No other node moves or changes, so the cost is O(1) whatever n is.
Finding `p` in the first place is a separate cost.
