---
id: graph-reverse-postorder
kind: basic
version: 1
level: 5
tags: [graphs, compilers, dataflow]
refs:
  - https://www.cs.rice.edu/~keith/EMBED/dom.pdf
  - https://en.wikipedia.org/wiki/Data-flow_analysis#Iterative_algorithm
---

## Why does an iterative dataflow analysis visit blocks in reverse postorder, and how much does the order actually matter?

---

A forward analysis computes each block's input from its predecessors'
outputs. In **reverse postorder** every block appears *after* all of its
predecessors, except across back edges — so one sweep propagates
information all the way down any acyclic path. Information only has to
go round the loop again for the parts that flow along back edges.

The bound makes it concrete: with RPO, an iterative forward analysis
converges in at most `d + 2` passes over the CFG, where `d` is the
**loop-connectedness** — the maximum number of back edges on any
cycle-free path. For real code `d` is almost always 2 or 3, so an
analysis that could in principle need many iterations converges in a
handful. Visit the blocks in the wrong order (say, by block number) and
you can need a pass per level of nesting; visit them randomly and you
can approach the theoretical worst case.

Symmetrically, a **backward** analysis (liveness, anticipability) uses
**postorder** — successors before predecessors — for the same reason.
Note that reverse postorder is *not* the same as BFS order, and is only
the same as topological order when the graph is acyclic; on a CFG with
loops, RPO is the closest thing available.

Two refinements that build on this:

- **Worklist instead of sweeps**: rather than re-visiting every block,
  keep a priority queue keyed by RPO number and re-enqueue only the
  successors of blocks whose output changed. Same fixpoint, far less
  work, and the RPO ordering is what makes the queue converge quickly.
- **Sparse analyses**: SSA form lets you propagate along def–use edges
  instead of through every block, skipping the CFG entirely for values
  nothing in that block touches.

The wider lesson is one of the most transferable in compiler
engineering: for an iterative fixpoint, **the visiting order does not
change the answer, only how fast you reach it** — the result is the
least fixpoint either way, provided the transfer functions are
monotone.
