---
id: execution-split-cost
kind: basic
version: 1
level: 5
tags: [execution, async]
refs:
  - https://wg21.link/p2300r10
  - https://wg21.link/p3682
requires:
  - execution-split-multi-shot
---

## `auto s = load() | split(); when_all(s | then(a), s | then(b));` What does `split` pay so that `s` may be connected twice?

(`split` is in P2300R10 and `stdexec`; P3682 removed it from the C++26
draft.)

---

**A heap-allocated shared state that runs `load()` once and replays its
result.**

Every consumer is completed from the stored result, by `const&`. That
allocation is what the rest of the model avoids, so reserve it for a
genuinely shared result, not for parallel work that `when_all` over
independent senders already expresses.
