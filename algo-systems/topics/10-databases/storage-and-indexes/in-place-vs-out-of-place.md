---
id: db-in-place-vs-out-of-place
kind: basic
version: 1
level: 2
tags: [databases, storage, lsm]
refs:
  - https://www.cs.umb.edu/~poneil/lsmtree.pdf
  - https://openproceedings.org/2016/conf/edbt/paper-12.pdf
elaborate: An append-only event log and an in-place config table both sit in your system. Which one has to garbage-collect old data?
---

## Key `k` is updated in a B-tree engine and in a log-structured (LSM) engine. What happens to `k`'s old value in each?

---

**B-tree: overwritten in its page. LSM: left on disk; a newer version is appended.**

In place keeps one copy but rewrites a page at a random location. Out
of place makes every write a sequential append, at a price: a read must
find the newest of several versions, and stale ones take space until a
background merge drops them.
