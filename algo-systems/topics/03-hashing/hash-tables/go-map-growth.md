---
id: hash-go-map-growth
kind: basic
version: 1
level: 4
requires:
  - hash-swiss-table-metadata
tags: [go, hashing, low-latency]
refs:
  - https://go.dev/blog/swisstable
---

## A Go 1.24+ map holds 10 million entries. Why does the insert that triggers growth copy at most about a thousand entries, not 10 million?

---

**The map is split into tables of at most 1024 slots; only the full one grows.**

Upper hash bits pick the table through a directory (extendible hashing),
so a growing table splits on its own and the others are untouched. A C++
flat table rehashes everything at once unless you `reserve` up front.
