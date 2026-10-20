---
id: std-list-basics
kind: basic
version: 1
level: 1
tags: [foundations, linked-lists, containers, iterators]
requires:
  - linear-list-node
  - cpp-essentials/iter-iterator-basics
refs:
  - https://en.cppreference.com/w/cpp/container/list
  - https://en.cppreference.com/w/cpp/container/list/insert
  - https://en.cppreference.com/w/cpp/iterator/next
elaborate: What would you have to redo after the same insert into a `std::vector`, and why?
---

## `std::next(it)` returns a copy of `it` moved one step. After these lines, what does `*it` read?

```cpp
std::list<int> l{1, 3};
auto it = std::next(l.begin());
l.insert(it, 2);                  // l is now 1 2 3
```

---

**3: list nodes never move, so `it` still refers to the same node.**

`std::list` is a doubly linked list: each element is its own separately allocated node
with links both ways. `insert` allocates one node and relinks its
neighbours; nothing else moves.
