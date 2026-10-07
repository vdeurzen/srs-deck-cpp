---
id: seq-intrusive-multi-list
kind: basic
version: 1
level: 4
requires:
  - seq-intrusive-list
tags: [containers, intrusive, databases]
refs:
  - https://www.boost.org/doc/libs/release/doc/html/intrusive/usage.html
  - https://www.kernel.org/doc/html/latest/core-api/kernel-api.html#list-management-functions
---

## A buffer-pool page must sit on the LRU chain and on a hash-bucket chain at once, with one copy of the page header. How?

---

**Give the page one hook member per list.** Each list threads its own
hook, so the same object is linked into both with no copy and no
question of which copy is real. The kernel's `list_head` uses the same
idea.
