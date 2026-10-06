---
id: compiler-instruction-selection
kind: basic
version: 1
level: 5
tags: [compilers, codegen, dynamic-programming]
requires:
  - compiler-tiling-dp
refs:
  - https://en.wikipedia.org/wiki/Instruction_selection
  - https://llvm.org/docs/CodeGenerator.html
---

## Instruction selection as a tiling problem: what is being tiled, what are the tiles, and why is maximal munch not optimal?

---

The IR for an expression is a **tree or DAG** of operations; each
machine instruction is a **tile** — a small pattern with a cost —
covering one or more IR nodes. Selecting instructions is covering the
whole tree with tiles so that every node is covered exactly once and
tile edges line up with values that will live in registers. `lea` on
x86 covers a multiply-add of three nodes; an addressing mode covers a
shift and two adds; a fused multiply-add covers two arithmetic nodes.
Minimising total cost is the goal.

- **Maximal munch** walks top-down and greedily takes the largest tile
  that matches at each node. Linear, simple, and produces good code —
  but *locally* largest is not *globally* cheapest: taking a big tile
  here can leave an awkward remainder that needs two expensive tiles
  below, where two medium tiles would have been cheaper.
- **Dynamic programming over the tree** is optimal: compute, bottom-up,
  the minimum cost of producing each node's value in each register
  class, then read the choices back down. That is what BURS/BURG-style
  generators (and `iburg`) do, with the tables generated offline from
  the machine description, so selection itself stays linear.
- **On a DAG** — which is what you get with common subexpressions —
  optimal selection is NP-complete, because a shared node's best tiling
  depends on all of its users. Practical compilers either split the DAG
  into trees at shared nodes or do a heuristic search.

In LLVM this is SelectionDAG (per-basic-block DAG, pattern matching
generated from TableGen `.td` files, then scheduling into a linear
order) with the newer GlobalISel replacing it incrementally: a
function-wide, non-DAG pipeline of legalise → select, which is faster to
compile and easier to reason about across blocks.

Two practical truths: most of the *value* here comes from covering
addressing modes and fused operations correctly, not from optimal
tiling; and the machine description is where the real engineering
lives, since the algorithms are all table-driven from it.
