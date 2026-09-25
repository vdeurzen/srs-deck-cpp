---
id: ll-memory-pools
kind: basic
version: 1
level: 4
tags: [low-latency, allocators, memory]
refs:
  - https://en.cppreference.com/w/cpp/memory/memory_resource
  - https://google.github.io/tcmalloc/design.html
---

## Why is `new` banned on a hot path, and what are the three replacements?

---

Not because it is slow on average — a modern allocator's fast path
(tcmalloc, jemalloc, mimalloc) is a per-thread free-list pop, tens of
nanoseconds. It is banned because of the **tail and the coupling**:
the slow paths take a central lock, may call `mmap`, may trigger
`madvise` or a page fault, and may return memory anywhere in the
address space, destroying locality. A p99.9 in microseconds cannot
contain an unbounded operation whose worst case is a syscall.

The replacements, in increasing order of structure:

- **Freelist pool of fixed-size objects.** Pre-allocate N objects in
  one block, thread them onto a singly-linked free list (the link
  lives in the free object's own memory, so no overhead), and allocate
  by popping. Allocation and deallocation are a load and a store, the
  objects are contiguous, and the pool cannot fragment because every
  block is the same size. This is what an order book's `Order`s and a
  server's per-connection state should come from.
- **Arena / bump allocator.** Allocate by advancing a cursor; free
  everything at once by resetting it. Ideal when lifetimes are tied to
  a phase — a parsed message, a compilation unit, one event's scratch
  space. No per-object bookkeeping at all.
- **`std::pmr`** to get either of these without rewriting the types:
  `monotonic_buffer_resource` (an arena, often over a stack buffer) and
  `unsynchronized_pool_resource` (size-class freelists), passed as an
  allocator to standard containers.

Two disciplines make it work in practice. **Pre-touch and pre-fault**
the memory at startup (write a byte per page, or use `MAP_POPULATE`
and `mlock`) so the first hot-path use does not take a page fault. And
**size the pool for the worst case and fail loudly** when it is
exhausted — silently falling back to the global allocator reintroduces
exactly the tail you removed, at the worst possible moment.

The same reasoning appears in every latency-sensitive runtime: Go
services use `sync.Pool` to keep buffers out of the GC's path, and
kernels use slab allocators, which are this design with per-CPU caches
and object constructors.
