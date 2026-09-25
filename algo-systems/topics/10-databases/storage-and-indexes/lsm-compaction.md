---
id: db-lsm-compaction
kind: basic
version: 1
level: 5
tags: [databases, storage, lsm]
refs:
  - https://github.com/facebook/rocksdb/wiki/Compaction
  - https://arxiv.org/abs/1812.07527
---

## Trace a write through an LSM tree, then contrast levelled and tiered compaction.

---

The path: append to the **WAL** (sequential, fsynced per commit or per
group) → insert into the **memtable** (a skip list, sorted, concurrent)
→ when it is full, freeze it and flush to an immutable **SSTable** at
level 0 → compaction merges SSTables downward into larger, sorted,
non-overlapping runs. A read checks the memtable, then the immutable
memtables, then each level, using a Bloom filter and an index block per
file to avoid touching files that cannot contain the key.

**Levelled** (RocksDB's default below L0): each level holds one sorted
run, partitioned into files with disjoint key ranges, and is ~10× the
size of the one above. A compaction picks a file and merges it into the
overlapping files of the next level. Read amplification is low (at most
one file per level to check), space amplification is low (~1.1×, since
each key appears roughly once per level), and write amplification is
high — roughly the fanout per level, summed over levels.

**Tiered** (Cassandra's default, RocksDB's "universal"): each level
holds several runs, and compaction merges *whole* runs of the same size
into one run at the next level. Far less rewriting — lower write
amplification — but a read may touch several runs per level, and
obsolete versions survive longer, so read and space amplification rise.

The dials in between: **partial/lazy levelling** (tiered at the small
levels, levelled at the largest), **size ratio**, and **Bloom bits per
key allocated per level** — Monkey's result is that giving more filter
bits to the *smaller* levels minimises total false positives for a
fixed memory budget, because the large bottom level is consulted only
once.

Two operational facts that dominate production experience: compaction
is a background process competing for I/O and CPU with foreground
traffic, so it needs rate limiting and it is the usual culprit behind
latency spikes; and deletes are **tombstones** that must be retained
until every older version below them has been compacted away, which is
why a delete-heavy workload can grow the store rather than shrink it.
