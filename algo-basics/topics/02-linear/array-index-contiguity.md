---
id: linear-array-index-contiguity
kind: basic
version: 1
level: 1
tags: [arrays, linked-lists, complexity]
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

**Contiguity: the elements sit side by side, so `&a[i]` is `base + i·sizeof(T)`.**
One calculation, whatever `i` is: O(1). A list's nodes live anywhere, so
reaching node `i` means following `i` pointers, one after another: O(i).
