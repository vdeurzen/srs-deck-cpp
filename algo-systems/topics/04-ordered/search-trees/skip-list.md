---
id: ordered-skip-list
kind: basic
version: 1
level: 4
tags: [trees, randomised, databases, concurrency]
refs:
  - https://dl.acm.org/doi/10.1145/78973.78977
  - https://github.com/facebook/rocksdb/wiki/MemTable
---

## How does a skip list get O(log n) without rebalancing, and why is it the default memtable in LSM engines?

---

Each node is inserted into level 0 and promoted to each next level with
probability p (usually ½ or ¼), so level `k` holds about `p^k·n` nodes
and the expected height is log_{1/p} n. A search starts at the top
level of the head node and moves right while the next key is smaller
than the target, dropping a level when it is not — expected O(log n)
comparisons, with the constant tunable by p (smaller p means fewer
levels but more comparisons per level).

The bound is **probabilistic and input-independent**: it comes from the
coin flips, not the key order, so sorted insertions — the case that
destroys a plain BST — are no problem, and there is no adversarial input
short of guessing the random bits.

Why LSM memtables (RocksDB, LevelDB, HBase) use it:

- **Insert touches only forward pointers.** No rotations, no parent
  pointers, no node splits — so a lock-free or fine-grained concurrent
  implementation is genuinely tractable. RocksDB's default memtable
  supports concurrent writers precisely because the structure is a skip
  list.
- **Sorted iteration is free**, which is what flushing a memtable to a
  sorted SSTable needs.
- **Append-mostly, then read sequentially once** is the memtable's whole
  life cycle, so the structure's weak point — pointer chasing, poor
  locality — is paid in memory where it is cheapest, and never on disk.

That weak point is real: a skip list is a pointer structure with ~2
pointers per node on average, so a B-tree of the same data has far
better locality and less overhead. As an on-disk or cache-resident
index it loses; as a concurrent in-memory ordered buffer it is hard to
beat for simplicity.
