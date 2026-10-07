---
id: ll-seqlock-fences
kind: cloze
version: 1
level: 5
tags: [low-latency, concurrency, seqlock, memory-model]
requires:
  - ll-seqlock-reader
  - ll-seqlock-payload-race
refs:
  - https://dl.acm.org/doi/10.1145/2247684.2247688
  - https://eel.is/c++draft/atomics.fences
---

Seqlock ordering in C++ (Boehm 2012), with the payload in relaxed
atomics. Writer: store the odd counter `relaxed`, then
{{c1::a release fence::a standalone memory-ordering operation}}, then the
payload stores, then the even counter with `release`. Reader: load the
counter `acquire`, the payload loads, then
{{c2::an acquire fence::a standalone memory-ordering operation}}, then
reload the counter `relaxed`.

---

If a payload load reads a value stored after the writer's fence, that
fence synchronizes with the reader's fence ([atomics.fences]), so the odd
store happens-before the reload, which therefore sees odd or later and
retries. Without the writer's fence a payload store may become visible
before the odd counter; without the reader's, the payload loads may sink
below the check.
