---
id: smart-pointers-explain-ownership
kind: explain
version: 2
level: 4
tags: [smart-pointers, ownership]
requires:
  - smart-pointers-explain-unique-ptr
  - smart-pointers-explain-shared-ptr
  - smart-pointers-explain-weak-ptr
refs:
  - https://en.cppreference.com/w/cpp/memory
---
A `Graph` creates `Node`s; each `Node` points at its neighbours; a
background thread caches nodes it is interested in; `Graph::find()`
hands a node to callers. Choose the pointer type for each of the four
edges and say what breaks with the other choice.
---
- [ ] `Graph` → `Node`: `std::unique_ptr` if the `Graph`'s lifetime bounds every node's, since nothing else then needs a count; `shared_ptr` only if the cache or callers may legitimately outlive the `Graph`
- [ ] `Node` → neighbour: with `unique_ptr` ownership a raw `Node*` (non-owning, lifetime nested in the `Graph`); with `shared_ptr` ownership it must be `weak_ptr`, or two neighbours keep each other's strong count at one forever
- [ ] Cache thread → `Node`: `weak_ptr`, locked at each use — a `shared_ptr` in the cache would keep removed nodes alive, and a raw pointer could dangle between the owner's delete and the cache's next read
- [ ] `find()` → caller: `Node&` (or `Node*` for "may be absent") when the caller only uses it; a `shared_ptr` by value only when the caller stores it, and then copied from the `Graph`'s own `shared_ptr`, never built from `node.get()`
- [ ] Switching later from `unique_ptr` to `shared_ptr` ownership is `std::shared_ptr<Node>(std::move(up))`: a new control block adopts the pointer and its deleter, with the second allocation `make_shared` would have avoided

