---
id: smart-pointers-cycle-worked
kind: basic
version: 1
level: 2
tags: [smart-pointers, ownership, worked-example]
requires:
  - smart-pointers-shared-ptr-control-block
refs:
  - https://en.cppreference.com/w/cpp/memory/shared_ptr
  - https://en.cppreference.com/w/cpp/memory/weak_ptr
---

`Parent` holds a `std::shared_ptr<Child>`; `Child` holds a
`std::shared_ptr<Parent>` back. Outside the pair, only `p` owns the `Parent`.

| step | owners of `Parent` | owners of `Child` |
| --- | --- | --- |
| pair built, `p` alive | 2: `p`, the `Child` | 1: the `Parent` |
| `p` destroyed | 1: the `Child` | 1: the `Parent` |
| program ends | 1 | 1 |

## Why does `Parent`'s count stop at 1 in the second row?

---

**The `Child` still owns it, and the `Child` lives because the `Parent` owns it.**

Each object's last owner is a member of the other, released only by the
other's destructor, which runs only at count 0. The counts can't see that
nothing outside reaches the pair any more, so both objects leak.
