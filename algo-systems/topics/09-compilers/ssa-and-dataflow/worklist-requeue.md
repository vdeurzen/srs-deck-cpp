---
id: compiler-worklist-requeue
kind: basic
version: 1
level: 5
tags: [compilers, dataflow]
requires:
  - compiler-worklist-dataflow
refs:
  - https://suif.stanford.edu/~courses/cs243/
  - https://www.cs.rice.edu/~keith/EMBED/dom.pdf
elaborate: Why does a forward analysis converge in fewer passes when its worklist is ordered by reverse postorder?
---

## In a forward dataflow analysis, block `B`'s output just changed. Which blocks go back on the worklist?

---

**`B`'s successors.**

Only they read `B`'s output, so only their inputs can have changed. A
backward analysis re-queues predecessors instead. Sweeping every block
each round finds the same fixpoint, but wastes work on blocks whose
inputs did not move.
