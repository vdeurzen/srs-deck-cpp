---
id: linear-sentinel-node
kind: basic
version: 1
level: 2
tags: [foundations, linked-lists]
requires:
  - linear-doubly-unlink-code
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.2 (sentinels)
---

## This circular doubly linked list has a dummy node `S` that holds no value. `x` is the node holding 4. With no null checks, which pointers do the two unlink writes change?

```text
S <-> 4 <-> 7 <-> 9 <-> (back to S)

x->prev->next = x->next;
x->next->prev = x->prev;
```

---

**`S.next` now points at 7, and 7's `prev` now points at `S`.**

`x->prev` is `S`, not null, so removing the first node is the same two
writes as removing any other. The dummy (a *sentinel*) gives the end
nodes a neighbour, so no `prev` or `next` is ever null.
