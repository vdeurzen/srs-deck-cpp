---
id: str-content-defined-chunking
kind: basic
version: 1
level: 4
tags: [strings, hashing, storage]
requires:
  - str-rolling-hash
refs:
  - https://www.usenix.org/conference/atc16/technical-sessions/presentation/xia
  - https://restic.readthedocs.io/en/stable/100_references.html#backups-and-deduplication
elaborate: rsync also uses a rolling hash, but over fixed-size blocks of the old file. What does it search for at every byte offset?
---

## A backup tool cuts a file wherever the low 13 bits of a rolling hash over the last 48 bytes are zero. One byte is inserted at the start of the file. How many chunks change?

---

**One or two, around the edit: every later cut point stays put.**

Each cut depends only on the 48 bytes before it, so past the edit the
same bytes yield the same cuts, and the chunks deduplicate. Fixed-size
blocks would shift every later boundary and resend everything. borg,
restic and casync work this way.
