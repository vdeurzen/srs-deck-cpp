---
id: trap-linked-list-insertion
kind: basic
version: 1
level: 2
tags: [transfer, misconception, containers, memory-hierarchy]
elaborate: Where in your own code did you pick a list because insertion "should" be cheap? What would the vector version actually have cost?
requires:
  - seq-vector-vs-deque
  - seq-array-insert-shift
refs:
  - https://en.cppreference.com/w/cpp/container/vector
  - https://en.cppreference.com/w/cpp/container/list
---

## True or false: a linked list is the right container for insert-heavy workloads, because insertion is O(1) and a vector's is O(n).

---

**False in almost every real case**, and the reason is that the O(1) is
measured from a point you do not have.

`list::insert` is O(1) **given an iterator to the position**. Getting
that iterator means traversing — O(n) pointer hops, each one a likely
cache miss, each dependent on the last so they cannot overlap. A
`vector::insert` is O(n) too, but the O(n) part is a `memmove`: one
sequential pass at many bytes per cycle, prefetched, vectorised. Moving
10 000 elements costs a few microseconds; *finding* the position in a
list of 10 000 costs more.

Add the allocation: each list node is a separate allocation with a
header, two pointers, and whatever the allocator's padding is — so a
list of `int` uses 4–8× the memory of a vector and scatters it. That
memory cost is also a *time* cost, because everything else in the
program now has less cache.

The empirical result (Stroustrup's talk, and every benchmark since) is
that a vector beats a list for insert-and-remove-in-order workloads
until n is very large, and often at *any* n.

When a list is genuinely right, the reason is never the O(1):

- **You already hold the position** and never search — an intrusive
  list threaded through objects you reach by other means (an LRU
  chain, a free list, a scheduler's run queue).
- **References must stay valid** across insertions and removals
  elsewhere in the container.
- **Splicing**: moving a range between lists in O(1) without touching
  the elements.

Notice that all three describe an *intrusive* list far better than
`std::list`. The question to ask is not "how often do I insert?" but
"do I already have a pointer to where?"
