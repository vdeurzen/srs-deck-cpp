---
id: ll-progress-ladder
kind: cloze
version: 1
level: 3
tags: [low-latency, lock-free, concurrency]
requires:
  - cpp-core/atomics-chunk-cas-loop
refs:
  - https://dl.acm.org/doi/10.1145/114005.102808
  - https://doi.org/10.1109/ICDCS.2003.1203503
---

The progress ladder, weakest first. **Blocking**: a thread suspended
inside the critical section stops everyone. **Obstruction-free**: a
thread finishes if it runs {{c1::alone::a condition on the other threads}}
for long enough. **Lock-free**: {{c2::some::a quantifier}} thread always
makes progress, though one may retry its CAS forever. **Wait-free**:
{{c3::every::a quantifier}} thread finishes in a bounded number of its own
steps.

---

A CAS loop is the typical lock-free shape: a failed CAS means another
thread's CAS succeeded, so the system advanced even if you did not.
Herlihy (1991) defined wait-freedom; Herlihy, Luchangco and Moir (2003)
added obstruction-freedom.
