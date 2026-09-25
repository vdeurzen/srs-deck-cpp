---
id: seq-intrusive-list
kind: basic
version: 1
level: 4
tags: [containers, low-latency, intrusive]
refs:
  - https://www.boost.org/doc/libs/release/doc/html/intrusive/intrusive_vs_nontrusive.html
  - https://www.kernel.org/doc/html/latest/core-api/kernel-api.html#list-management-functions
---

## What is an intrusive linked list, and which three properties make it the list of choice in kernels, allocators and order books?

---

The node lives **inside** the element rather than pointing at it: the
object declares a `Hook { Hook* prev; Hook* next; }` member, and the list
threads through those hooks. `std::list<T>` is the opposite — it
allocates a node holding a `T`, and the `T` has no idea it is in a list.

Three consequences:

1. **No allocation, ever.** Inserting an already-existing object into a
   list allocates nothing, so a hot path can link and unlink without
   touching the allocator. In the kernel and in an allocator's own free
   lists that is not an optimisation but a requirement — you cannot
   allocate memory inside the allocator.
2. **O(1) unlink from the element itself.** Given a `T*` you already have
   the hook, so removal is four pointer stores with no search and no
   iterator. An order book cancels by order id: hash to the `Order*`,
   unlink it from its price level, done — no walking the level's queue.
3. **One object, one identity.** The element is not copied into a node,
   so it can be in several lists at once (one hook per list: LRU chain
   *and* hash chain *and* free list), and there is never a question of
   which copy is real.

The costs are real too. The element's type must know about the hook, so
the container is no longer independent of the element; ownership is
manual, since the list does not own what it links and destroying a linked
object corrupts its neighbours unless it unlinks in its destructor
(Boost.Intrusive's auto-unlink hooks do exactly this); and value
semantics are gone — copying an element copies its hooks, which is
nonsense.

In C++ the ready-made version is Boost.Intrusive; in C it is the Linux
`list_head` plus `container_of`, which recovers the element pointer from
the hook pointer by subtracting the member's offset.
