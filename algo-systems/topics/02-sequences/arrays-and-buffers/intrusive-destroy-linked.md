---
id: seq-intrusive-destroy-linked
kind: basic
version: 1
level: 4
requires:
  - seq-intrusive-list
tags: [containers, intrusive, lifetime]
refs:
  - https://www.boost.org/doc/libs/release/doc/html/intrusive/auto_unlink_hooks.html
---

## An `Order` still linked into its price level is destroyed. What goes wrong?

---

**Its neighbours still point at it: the next walk or unlink reads freed memory.**
The list does not own its elements. Unlink in the destructor (Boost's
auto-unlink hooks do this) or assert the hook is unlinked.
