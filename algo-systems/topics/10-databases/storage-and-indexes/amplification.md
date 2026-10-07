---
id: db-amplification
kind: cloze
version: 1
level: 4
tags: [databases, storage, amplification]
refs:
  - https://openproceedings.org/2016/conf/edbt/paper-12.pdf
  - https://arxiv.org/abs/1812.07527
  - https://github.com/facebook/rocksdb/wiki/Compaction
---

Storage engines are compared on three numbers. **Read amplification**
is data read per query, **write amplification** is bytes written to
the device per byte of user data, and **space amplification** is bytes
stored per byte of {{c1::live data::what remains once obsolete versions
and free space are excluded}}. The RUM conjecture says you may optimise
at most {{c2::two::a count}} of the three.

A B⁺-tree updates in place, so a one-row update of 100 bytes eventually
writes a whole {{c3::page::the unit the buffer pool flushes}}: high
write amplification, randomly placed, bought for a read amplification
of about one traversal.
