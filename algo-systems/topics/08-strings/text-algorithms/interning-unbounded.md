---
id: str-interning-unbounded
kind: basic
version: 1
level: 4
tags: [strings]
requires:
  - str-string-interning
refs:
  - https://go.dev/blog/unique
---

## A long-running multi-tenant server interns every tenant-supplied tag in one global table. What happens over weeks?

---

**Memory grows without bound: a plain intern table never drops an entry.**

Entries stay so that issued ids stay valid, and nothing knows when the
last user is gone. Fixes: reference counts, per-request arenas, or a
table that holds entries weakly and drops those no handle references.
