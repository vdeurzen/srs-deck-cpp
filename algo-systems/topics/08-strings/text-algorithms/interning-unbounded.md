---
id: str-interning-unbounded
kind: basic
version: 1
level: 4
tags: [strings, memory, go]
requires:
  - str-string-interning
refs:
  - https://go.dev/blog/unique
  - https://pkg.go.dev/unique
---

## A long-running multi-tenant server interns every tenant-supplied tag in one global table. What happens over weeks?

---

**Memory grows without bound: a plain intern table never drops an entry.**

Entries stay so that issued ids stay valid, and nothing knows when the
last user is gone. Fixes: reference counts, per-request arenas, or
Go 1.23's `unique.Make`, whose table holds entries weakly so the GC
reclaims those no handle references.
