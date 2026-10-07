---
id: db-in-place-vs-out-of-place
kind: basic
version: 2
level: 2
tags: [databases, storage, lsm]
refs:
  - https://www.cs.umb.edu/~poneil/lsmtree.pdf
  - https://openproceedings.org/2016/conf/edbt/paper-12.pdf
elaborate: An append-only event log and an in-place config table both sit in your system. Which one has to garbage-collect old data?
---

## An LSM engine updates key `k`. Unlike an update-in-place B-tree, what does it do with `k`'s old value?

---

**Leaves it on disk and appends a newer version elsewhere.**

An update-in-place B-tree overwrites `k` in its page: one copy, but a
random page write. Out of place makes every write a sequential append,
at a price: a read must find the newest of several versions, and stale
ones take space until a background merge drops them.
