---
id: smart-pointers-shared-ptr-cycle-leaks
kind: basic
version: 1
level: 3
tags: [smart-pointers, ownership]
requires:
  - smart-pointers-shared-ptr-control-block
elaborate: Where else could ownership form a loop (a graph, an observer list, a callback that captures its owner), and why does Go's garbage collector not leak there?
refs:
  - https://en.cppreference.com/w/cpp/memory/weak_ptr
  - https://en.cppreference.com/w/cpp/memory/shared_ptr
---

## `Parent` holds a `shared_ptr<Child>`; `Child` holds a `shared_ptr<Parent>` back. The last `shared_ptr<Parent>` outside the pair is destroyed. What happens to the two objects?

---

**Nothing: both leak.** `Parent`'s owner count drops from two to one —
the `Child` still owns it — and `Child`'s stays at one because the
`Parent` owns the `Child`. Neither count can reach zero before the
other's destructor runs. Reference counting cannot see a cycle: nothing
outside the pair can reach it, and nothing inside will let go.
