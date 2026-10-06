---
id: seq-array-vs-list-index
kind: basic
version: 1
level: 1
tags: [containers, complexity, memory-hierarchy]
refs:
  - https://en.cppreference.com/w/cpp/container/vector
  - https://en.cppreference.com/w/cpp/container/list
---

## What property of an array lets it jump straight to `a[i]`, when a linked list cannot?

---

```cpp
int* p = base + i;              // array: one multiply-add, any i
Node* q = head;
while (i--) q = q->next;        // list: i dependent loads
```

**Contiguity: the elements sit side by side, so the address of `a[i]`
is `base + i·sizeof(T)`.** One calculation, whatever `i` is. A list's
nodes live anywhere, so the only way to node `i` is to follow `i`
pointers, one after another.
