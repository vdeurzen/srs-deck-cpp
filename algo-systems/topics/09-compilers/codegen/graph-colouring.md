---
id: compiler-graph-colouring
kind: basic
version: 1
level: 5
tags: [compilers, codegen, registers, graphs]
refs:
  - https://dl.acm.org/doi/10.1145/800230.806984
  - https://dl.acm.org/doi/10.1145/177492.177575
---

## Register allocation as graph colouring: what are the nodes and edges, and what are the five phases of a Chaitin–Briggs allocator?

---

Nodes are **live ranges** (a value, or a set of values merged by
coalescing); an edge joins two ranges that are **live at the same
point**, so they cannot share a register. Assigning K machine registers
is colouring this interference graph with K colours; a node that cannot
be coloured must be **spilled** to memory.

The phases:

1. **Build** the interference graph from liveness. Pre-coloured nodes
   represent physical registers forced by the ABI (arguments, return
   values, `div`'s fixed operands).
2. **Coalesce** copy-related nodes (`a = b` disappears if `a` and `b`
   get the same register) — but only conservatively: Briggs'
   rule merges only if the merged node has fewer than K neighbours of
   significant degree, because aggressive coalescing raises degrees and
   causes spills.
3. **Simplify**: repeatedly remove a node with degree < K and push it
   on a stack. Such a node is always colourable, whatever its
   neighbours get — this is Kempe's argument, and it is why degree,
   not "importance", drives the order.
4. **Spill**: if every remaining node has degree ≥ K, pick one to spill
   by a cost heuristic — typically `(uses + defs weighted by loop
   depth) / degree`, so cheap-to-recompute, rarely used, high-degree
   ranges go first. Briggs' contribution was **optimistic colouring**:
   push it on the stack anyway and try to colour it later, because a
   high-degree node's neighbours often collide and share colours.
5. **Select**: pop the stack, assigning each node a colour its
   neighbours have not taken. Anything that fails gets actual spill
   code inserted, and the whole process repeats on the rewritten
   function.

Two things a modern compiler adds. **Live-range splitting**, because
spilling a whole range is crude — split it around the region where
pressure is high and keep it in a register elsewhere. And **SSA-based
allocation**: the interference graph of a program in SSA form is
*chordal*, so it can be coloured optimally in polynomial time, and the
allocator's real problem reduces to deciding what to spill and how to
resolve φs — the basis of modern allocators in LLVM and elsewhere.
