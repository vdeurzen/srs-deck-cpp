---
id: linear-array-index-contiguity
kind: basic
version: 2
level: 1
tags: [arrays, linked-lists, complexity]
requires:
  - linear-address-formula
  - cpp-essentials/ptr-arrow-member
  - complexity-big-o-scaling
elaborate: "Where in your own code does something that looks like indexing secretly walk i steps?"
refs:
  - https://en.cppreference.com/w/cpp/container/vector
  - https://en.cppreference.com/w/cpp/container/list
---

A singly linked list keeps each element in its own node, which holds
the next node's address. An array `a` and such a list starting at
`head` hold the same values; both snippets read index `i`:

```cpp
int x = a[i];                              // array
Node* q = head;                            // list
for (int k = 0; k < i; ++k) q = q->next;
```

## Why is `a[i]` one step whatever `i` is, while the list needs `i` hops?

---

**Contiguity: array elements sit side by side, so `a[i]` is at `base + i · size`.**

One calculation, whatever `i` is: O(1). A list's nodes can live
anywhere, so the only way to node `i` is to follow `i` pointers, one
after another: O(i).
