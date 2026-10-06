---
id: compiler-natural-loops
kind: basic
version: 1
level: 4
tags: [compilers, cfg, loops, optimisation]
requires:
  - compiler-dominance
refs:
  - https://en.wikipedia.org/wiki/Control-flow_graph#Reducibility
  - https://dl.acm.org/doi/10.1145/262004.262005
  - https://llvm.org/docs/LoopTerminology.html
---

## How does a compiler find loops in a CFG when the source language's loops have long since been compiled away?

---

By **back edges**. An edge `n → h` is a back edge when `h` dominates
`n` — control returns to a block that must already have executed. The
**natural loop** of that back edge is `h` (the *header*) plus every
block that can reach `n` without going through `h`; computing it is a
backwards reachability walk from `n` in the CFG, stopping at `h`.

Properties that fall out and are relied on everywhere:

- **Single entry.** The header is the only way in, which is what makes
  loop transformations sound: anything true on entry to the header is
  true for the whole loop.
- **Nesting.** Two natural loops are either disjoint or one contains
  the other, unless they share a header (in which case they are merged)
  — so loops form a forest, the **loop nesting tree**, and each block
  has a loop depth. That depth is the single most important number in
  the compiler's cost model: a block at depth 2 is assumed to execute
  ~100× more often than one at depth 0, which drives inlining, spill
  placement and block layout.
- **Preheader.** Optimisations want a block that dominates the header
  and is executed once per loop entry, to hoist into. If one does not
  exist, the compiler *creates* it — the first thing LLVM's loop passes
  do.

What this machinery enables: loop-invariant code motion (an operation
whose operands are all defined outside the loop, in a block dominating
every exit, can be hoisted to the preheader), induction variable
analysis and strength reduction, unrolling, vectorisation, and licm's
cousin, loop unswitching.

The exception worth knowing: an **irreducible** CFG has a loop with two
entries — produced by `goto` into a loop body, by some state machines,
and by aggressive tail duplication — and it has no natural loop, no
single header, and no clean nesting. Compilers either handle it with
more general machinery (SCCs of the CFG give the loops, Havlak/Tarjan's
loop forest) or make it reducible first by **node splitting**, which
can grow the code exponentially in the worst case. This is also why
`goto` restrictions exist in languages designed to be optimised
aggressively.
