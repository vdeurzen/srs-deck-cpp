---
id: smart-pointers-shared-ptr-cycle-leaks
kind: basic
version: 2
level: 3
tags: [smart-pointers, ownership]
requires:
  - smart-pointers-cycle-worked
  - ptr-arrow-member
elaborate: Where else could ownership form a loop in your code (a graph, an observer list), and why would Go's garbage collector reclaim it where reference counting can't?
refs:
  - https://en.cppreference.com/w/cpp/memory/weak_ptr
  - https://en.cppreference.com/w/cpp/memory/shared_ptr
---

```cpp
struct Node { std::shared_ptr<Node> next, prev; };
void link() {
    std::shared_ptr<Node> a = std::make_shared<Node>();
    std::shared_ptr<Node> b = std::make_shared<Node>();
    a->next = b;
    b->prev = a;
}
```

## When `link` returns, what happens to the two `Node`s?

---

**Neither is destroyed: each owns the other, so both counts stay at 1.**

Destroying `a` and `b` drops each count from 2 to 1. The owner left is a
member of the other `Node`, released only in that `Node`'s destructor.
Any loop of `shared_ptr`s leaks this way.
