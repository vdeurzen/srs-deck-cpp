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
atomics. Reader: load the counter, load the payload, a fence, reload the
counter. Writer: store the odd counter, then
{{c1::a release fence::a standalone memory-ordering operation}}, then the
payload stores, then the even counter.

---

In full: writer odd store `relaxed`, release fence, payload, even store
`release`; reader load `acquire`, payload, acquire fence, reload
`relaxed`. If a payload load reads a value stored after the writer's fence, that
fence synchronizes with the reader's fence ([atomics.fences]), so the odd
store happens-before the reload, which therefore sees odd or later and
retries. Without the writer's fence a payload store may become visible
before the odd counter; without the reader's, the payload loads may sink
below the check.
