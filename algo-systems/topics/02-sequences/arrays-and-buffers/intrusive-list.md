---
id: seq-intrusive-list
kind: basic
version: 1
level: 4
requires:
  - foundations-cache-cost-model
tags: [containers, low-latency, intrusive]
elaborate: An allocator keeps its free blocks on a list. Why can that list not be a `std::list`?
refs:
  - https://www.boost.org/doc/libs/release/doc/html/intrusive/intrusive_vs_nontrusive.html
  - https://www.kernel.org/doc/html/latest/core-api/kernel-api.html#list-management-functions
---

## Linking an existing `Order` into a `std::list<Order>` allocates a node. Linking it into an intrusive list allocates nothing. Why?

```cpp
struct Hook { Hook* prev; Hook* next; };
struct Order { Hook level; std::uint64_t id; std::int64_t px; };
```

---

**The links are a member of `Order`, so the list threads existing objects.**
`std::list<T>` allocates a node that holds a copy of `T`. An intrusive
list only rewrites the `prev`/`next` already inside the element: no
allocator on the hot path.
