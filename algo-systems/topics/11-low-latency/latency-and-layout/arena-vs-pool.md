---
id: ll-arena-vs-pool
kind: basic
version: 1
level: 4
tags: [low-latency, allocators, memory]
requires:
  - ll-freelist-pool
refs:
  - https://en.cppreference.com/w/cpp/memory/monotonic_buffer_resource
  - https://en.cppreference.com/w/cpp/memory/unsynchronized_pool_resource
---

## Fixed-size free-list pool or bump-pointer arena: what property of the objects decides?

---

**Whether their lifetimes end together.** An arena allocates by bumping
a cursor and frees only all at once — ideal for one message's or one
event's scratch data. Objects freed one by one, in any order (orders in a
book), need a pool. In `std::pmr`: `monotonic_buffer_resource` versus
`unsynchronized_pool_resource`.
