---
id: db-amplification
kind: cloze
version: 1
level: 4
tags: [databases, storage, amplification]
refs:
  - https://arxiv.org/abs/1812.07527
  - https://github.com/facebook/rocksdb/wiki/Compaction
---

Storage engines are compared on three numbers. **Read amplification**
is data read per query, **write amplification** is bytes written to
the device per byte of user data, and **space amplification** is bytes
stored per byte of {{c1::live data::excluding obsolete versions and
free space in pages}}. The RUM conjecture says you may optimise
{{c2::two::whichever two you pick, the third gets worse}} of them.

A B⁺-tree updates in place, so a one-row update eventually writes a
whole {{c3::page::4-16 KiB for a 100-byte row}} — high write
amplification, and randomly placed — in exchange for a read
amplification of about one traversal. An LSM tree appends, so writes
are sequential and initially cheap, but every byte is rewritten once
per level it passes through, and a read may consult one run per level
— mitigated by a per-file {{c4::Bloom filter::a negative answer skips
the file entirely}}.

The dial between levelling and tiering is the same trade in miniature:
levelling keeps one run per level, so reads and space are good and
writes are expensive; tiering allows several, so writes are cheaper
and reads and space suffer. And the reason deletes can make an LSM
**grow** is that a delete is a {{c5::tombstone::a marker that must
outlive every older version of the key below it}}, which is only
reclaimed once compaction has carried it to the bottom level.
