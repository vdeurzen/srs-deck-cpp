---
id: transfer-defer-vs-raii
kind: basic
version: 1
level: 2
tags: [transfer, misconception, raii]
requires:
  - raii-owner-in-destructor
elaborate: Go's defer runs at function exit, LIFO, no matter which return statement fires. Where exactly does a C++ destructor run instead, and why does that make RAII strictly more general than defer?
refs:
  - https://en.cppreference.com/w/cpp/language/raii
---

## True or false: since C++ has no `defer`, the only reliable way to guarantee cleanup on every return path is to repeat the cleanup call before each `return` and in a `catch` block.

---

**False**, and believing it is what leads Go programmers to write
C++ that reinvents `defer` badly by hand. C++ does not need a `defer`
keyword because RAII already guarantees the cleanup runs: bind the
resource to a local object whose destructor does the cleanup, and the
destructor runs automatically when that object's **scope** ends — on a
`return`, a `break`, falling off the end of a block, or an exception
unwinding through it — with no repeated call at every exit point.
This is strictly more general than `defer`: `defer` is scoped to the
whole function, but an RAII object's destructor fires at the end of
*its own* enclosing scope, which can be a single `{ ... }` block nested
anywhere, not just the function body.
