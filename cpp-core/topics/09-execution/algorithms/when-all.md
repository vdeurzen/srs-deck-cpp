---
id: execution-when-all
kind: basic
version: 1
level: 4
tags: [execution, async, c++26]
refs:
  - https://eel.is/c++draft/exec.when.all
  - https://wg21.link/p2300
requires:
  - execution-just-and-then
  - execution-stopped-channel
---

## What does `when_all(a, b)` do when `a` fails while `b` is still running?

---

**It requests stop on `b`, waits for `b` to finish anyway, then
completes with `a`'s error.**

It is a join, not a race: it completes only after every child has, on
whatever channel. So no child is still touching its state when
`when_all` finishes, which is what lets children borrow from the
enclosing scope.
