---
id: compiler-dominance
kind: basic
version: 1
level: 4
tags: [compilers, cfg, dominance]
refs:
  - https://www.cs.rice.edu/~keith/EMBED/dom.pdf
  - https://dl.acm.org/doi/10.1145/357062.357071
---

## Define dominance and the immediate dominator, and say why the dominator *tree* is the structure a compiler keeps.

---

Block `d` **dominates** `n` if every path from entry to `n` goes
through `d`. It is reflexive (every block dominates itself), transitive,
and — the fact everything else rests on — the dominators of a node are
**totally ordered**, so there is a unique *immediate* dominator
`idom(n)`: the closest strict dominator. That makes the idom relation a
**tree** rooted at entry, with V−1 edges, which is why a compiler can
store dominance as one parent pointer per block instead of a set per
block.

What the tree answers cheaply:

- **"Does d dominate n?"** — ancestor test. Precompute an Euler tour or
  in/out DFS numbers and it is two integer comparisons.
- **Where a definition is visible**: an SSA definition dominates all of
  its uses, which is the well-formedness rule of SSA and the reason
  code motion must respect dominance (hoisting a computation is legal
  only into a block that dominates all its uses and is dominated by its
  operands' definitions).
- **Loop structure**: a back edge is an edge `n → h` where `h`
  dominates `n`; the **natural loop** of that back edge is `h` plus
  every block that can reach `n` without passing through `h`.
- **φ placement**, via the dominance frontier.

How it is computed: **Lengauer–Tarjan** is the classic near-linear
algorithm (O(E·α(E,V))) and is what textbooks present. In practice the
**Cooper–Harvey–Kennedy** iterative algorithm wins for real CFGs: keep
an `idom` array indexed by **postorder** number, walk the blocks in
*reverse* postorder, recompute each block's idom as the pairwise
"intersect" of its already-processed predecessors' idoms, and iterate
to a fixpoint — a couple of
passes, a few dozen lines, and better constants than Lengauer–Tarjan on
the graph sizes compilers actually see.

The dual is the **post-dominator** tree (computed on the reversed CFG),
which answers "will this block always be reached from here" — the basis
of control dependence, and therefore of aggressive dead code
elimination and if-conversion.
