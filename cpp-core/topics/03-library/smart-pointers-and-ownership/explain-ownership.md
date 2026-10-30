---
id: smart-pointers-explain-ownership
kind: explain
version: 4
level: 4
tags: [smart-pointers, ownership]
requires:
  - smart-pointers-explain-unique-ptr
  - cpp-essentials/smart-pointers-explain-shared-ptr
  - smart-pointers-explain-weak-ptr
elaborate: If `Graph` had started with `std::unique_ptr` ownership, how would you switch it to shared ownership, and what would the switch cost?
refs:
  - https://en.cppreference.com/w/cpp/memory
---
A `Graph` creates `Node`s; each `Node` points at its neighbours; a
background thread caches nodes it is interested in, while the `Graph` may
remove them; `Graph::find()` hands a node to callers. An interviewer asks
which pointer type you would use for each of those links. Explain it to them.
---
- [ ] The `Graph` owns its `Node`s through `std::shared_ptr`, because the cache must observe nodes it does not own
- [ ] Neighbour links are `std::weak_ptr`: `shared_ptr` neighbours point at each other and keep both counts at one forever
- [ ] The cache holds `weak_ptr`s and calls `lock()` at each use, getting an owner or an empty pointer
- [ ] So removed nodes are freed: a cached `shared_ptr` would keep them alive, a raw pointer would dangle
- [ ] `find()` returns `Node&` when the caller only uses the node; a `shared_ptr` copy only when the caller stores it
