---
id: trap-small-n
kind: basic
version: 1
level: 2
tags: [transfer, misconception, engineering, cost-model]
elaborate: What is the largest n your "clever" structure will actually see this year? What would the boring version cost at that size?
requires:
  - foundations-cache-cost-model
refs:
  - https://en.algorithmica.org/hpc/
  - https://en.cppreference.com/w/cpp/algorithm/find
---

## True or false: since the data will grow, the sophisticated data structure is the safer default.

---

**Usually false**, and the reason is that the sophisticated structure
has costs you pay *now* while its benefits arrive only at a size you
may never reach.

At small n, the boring version wins outright. A linear scan of a
32-element `vector` is one or two cache lines and a perfectly
predicted loop — faster than hashing, faster than a tree descent, and
faster than anything with a pointer in it. A sorted `vector` with
`lower_bound` beats `std::map` into the thousands. `std::sort` beats a
hand-written radix sort until tens of thousands of elements.

And the costs of sophistication are not only performance:

- More code to be wrong in, and bugs in a custom structure are the
  hardest kind to find.
- Invariants a future maintainer must know (is it still sorted? was
  that iterator invalidated? does this need rehashing?).
- Memory overhead that hurts everything *else* in the cache.
- Harder profiling, because the time is spread across the structure
  rather than sitting in one obvious loop.

The professional move is not to refuse sophistication but to **make
the choice reversible and measured**: put the collection behind a
narrow interface (`find`, `insert`, `for_each`), start with the
simplest thing, write the benchmark with representative data, and
change the implementation when the measurement says so. Then the
clever structure arrives with evidence, and swapping it in is a local
change.

The converse trap is just as real, so hold both: code that is
quadratic in a value that grows with traffic will fail, and no amount
of constant-factor tuning saves it. The question is always the same
one — **what is n, really?** — and the answer belongs in a comment
next to the container.
