---
id: ordered-bplus-tree
kind: basic
version: 1
level: 4
requires:
  - ordered-rbtree-vs-btree
tags: [trees, databases, storage]
refs:
  - https://en.wikipedia.org/wiki/B%2B_tree
  - https://15445.courses.cs.cmu.edu/
---

## What does a B⁺-tree change relative to a B-tree, and why does every storage engine use it?

---

**All values live in the leaves**; internal nodes hold only separator
keys and child pointers. A B-tree can store a value beside any key, at
any level; a B⁺-tree cannot.

Four things follow, and each is a reason storage engines chose it:

1. **Higher fanout.** Internal nodes carry no payload, so more
   separators fit per page — a shallower tree for the same data, and the
   internal levels are small enough to stay resident in the buffer pool.
2. **Leaves are linked.** Each leaf points to its successor, so a range
   scan descends *once* and then walks sideways through leaves
   sequentially. In a B-tree a range scan is an in-order traversal that
   climbs and descends repeatedly, touching internal nodes throughout.
   `WHERE ts BETWEEN a AND b` is the query shape that pays for this.
3. **Uniform depth and uniform cost.** Every lookup goes to a leaf, so
   the cost is the same for every key — a real advantage when you are
   estimating plan costs or a latency budget.
4. **Separators are free to be stale.** Since a separator is only a
   routing hint, not a stored key, it can be a shortened prefix
   ("everything below starts with 'sm'"), which raises fanout again and
   makes deletes cheaper — you can delete the key without repairing
   every separator that mentions it.

The engineering that surrounds it is as important as the shape: pages
are half-full at minimum (so a random-order load wastes ~30 % of space,
and bulk loads are done bottom-up in sorted order to pack them full),
splits propagate upward and must be crash-safe, and concurrency uses
latch coupling or optimistic versioning rather than locking the root.
The B-link variant adds a right-sibling pointer per node so a reader
that arrives during a split can follow it instead of being blocked,
which is what makes high-concurrency B⁺-trees practical.
