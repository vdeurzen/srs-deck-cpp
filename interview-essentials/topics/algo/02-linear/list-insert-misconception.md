---
id: linear-list-insert-misconception
kind: basic
version: 1
level: 2
tags: [linked-lists, arrays, complexity, misconception]
requires:
  - linear-array-insert-worked
  - std-list-basics
elaborate: In code you have written, did you already hold the node you inserted after, or did you search for it first?
refs:
  - https://en.cppreference.com/w/cpp/container/list/insert
  - https://en.cppreference.com/w/cpp/container/vector/insert
---

## Many expect inserting a value at position 500 of a 1000-element `std::list` to beat a `std::vector`, because list insertion is O(1). What does the list's insert actually cost, as a function of n?

```cpp
auto it = std::next(lst.begin(), 500);
lst.insert(it, 42);                      // O(1)
```

---

**O(n): the 500-step walk to reach the position dominates the O(1) relink.**

The O(1) assumes you already hold the node. Starting from an index,
both containers are O(n): the list walks 500 scattered nodes, the vector
shifts 500 contiguous elements, which is usually faster.
