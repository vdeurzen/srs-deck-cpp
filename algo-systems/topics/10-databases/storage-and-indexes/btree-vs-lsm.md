---
id: db-btree-vs-lsm
kind: basic
version: 1
level: 4
tags: [databases, storage, amplification]
refs:
  - https://www.cs.umb.edu/~poneil/lsmtree.pdf
  - https://arxiv.org/abs/1812.07527
---

## Compare a B⁺-tree and an LSM tree on the three amplifications. Which workload picks which?

---

Every storage engine trades **read amplification** (extra data read per
query), **write amplification** (bytes written to the device per byte
of user data) and **space amplification** (bytes stored per byte of
live data). You can optimise two; the third gets worse. That is the RUM
conjecture, and it is the whole comparison.

**B⁺-tree**: updates are in place. A single-row update dirties one page
and eventually writes that whole page — 4–16 KiB for a 100-byte row, so
write amplification is high, and the writes are **random**. Reads are
excellent: one traversal, mostly cached, no merging. Space
amplification is moderate (pages are ~70 % full after random inserts).

**LSM tree**: writes go to an in-memory memtable and a sequential WAL,
and are later flushed as immutable sorted files, then merged by
compaction. Writes are **sequential** and initially cheap, but every
byte is rewritten once per level it passes through, so write
amplification is 10–30× in a levelled configuration (better with
tiering, at the cost of reads). Reads may consult the memtable plus one
file per level, so read amplification is high — which is exactly what
per-file **Bloom filters** are for, cutting most of those lookups to a
single in-memory test.

Picking:

- **Read-heavy, point lookups and range scans, moderate write rate** →
  B⁺-tree. This is OLTP, and it is why Postgres, InnoDB and every
  classic engine use one.
- **Write-heavy, ingest-shaped, compressible, on flash** → LSM.
  Sequential writes suit SSD erase blocks and avoid write
  amplification at the *device* level; immutable files compress well
  and are trivially cacheable. RocksDB, Cassandra, ClickHouse's
  MergeTree, and most time-series stores.

Two modern qualifications. Tiering versus levelling is a dial along the
same curve rather than a different design. And the gap narrowed from
both sides: B-trees gained log-structured variants (Bw-tree,
copy-on-write B-trees), and LSMs gained better filters and partitioned
compaction.
