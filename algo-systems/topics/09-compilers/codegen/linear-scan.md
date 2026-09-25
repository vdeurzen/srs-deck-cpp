---
id: compiler-linear-scan
kind: basic
version: 1
level: 5
tags: [compilers, codegen, registers, jit]
refs:
  - https://dl.acm.org/doi/10.1145/330249.330250
  - https://en.wikipedia.org/wiki/Register_allocation#Linear_scan
---

## Why do JITs use linear scan instead of graph colouring, and what does the interval representation give up?

---

Because **compile time is run time** in a JIT. Building an interference
graph is O(n²) in the worst case and the colouring loop iterates;
linear scan is one pass over intervals sorted by start position,
keeping an `active` list of currently live intervals, and runs in
O(n log n) with tiny constants — often 10× faster to compile, for code
typically within a few percent of a colouring allocator.

The algorithm: order the instructions linearly, represent each value as
the **interval** `[first def, last use]`, walk the intervals in order
of start, expire from `active` any interval that has ended, and assign
a free register. If none is free, spill the interval in `active` (or
the current one) with the **furthest-away end** — Belady's rule applied
to registers.

What the representation gives up: a single interval `[start, end]` says
a value is live everywhere in between, which is false whenever the
range has holes — a value defined before a branch, used only on one
side, is treated as live through the other. That inflates pressure and
causes spills a colouring allocator would avoid. Hence **second-chance
binpacking** and the standard modern refinement: intervals with
**lifetime holes** plus **splitting at hole boundaries and at calls**,
which is Wimmer and Mössenböck's SSA-based linear scan, used in HotSpot
C1, V8's TurboFan and many others.

The other thing it gives up is independence from block order: linear
scan's result depends on the linearisation, so the block layout pass
that precedes it (and whether loops are contiguous) materially affects
allocation quality.

The spectrum worth carrying: a baseline/template JIT does no allocation
at all (everything in a fixed slot or on the stack), a mid-tier JIT
does linear scan, and an ahead-of-time compiler at `-O2` does
graph colouring or SSA-based allocation with splitting. Each is the
right answer for its compile-time budget — the same tiering logic that
decides how much inlining and how many optimisation passes to run.
