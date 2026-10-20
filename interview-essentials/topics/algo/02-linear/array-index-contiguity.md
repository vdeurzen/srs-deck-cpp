---
id: linear-array-index-contiguity
kind: basic
version: 1
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

## A linked list keeps its elements in nodes scattered across memory, linked by pointers. What property of an array lets it jump straight to `a[i]`, when such a list cannot?

---

```cpp
int x = a[i];                              // array: one address sum
Node* q = head;
for (int k = 0; k < i; ++k) q = q->next;   // list: i hops in a row
```

**Contiguity: the elements sit side by side, so `a[i]` starts at `base + i · size`.**
One calculation, whatever `i` is: O(1). A list's nodes live anywhere, so
reaching node `i` means following `i` pointers, one after another: O(i).
