---
id: compiler-dominance-frontier
kind: basic
version: 1
level: 5
tags: [compilers, ssa, dominance]
requires:
  - compiler-dominance
  - compiler-ssa-form
refs:
  - https://dl.acm.org/doi/10.1145/115372.115320
  - https://www.cs.rice.edu/~keith/EMBED/dom.pdf
---

## Define the dominance frontier, and explain why the *iterated* dominance frontier is exactly where φ-functions go.

---

`DF(n)` is the set of blocks `m` such that `n` dominates *some
predecessor* of `m`, but does not strictly dominate `m` itself. In
words: the blocks just beyond the region `n` controls — where control
flow that went through `n` merges with control flow that did not.

That is precisely where a definition in `n` needs a φ. If `n` defines
`x` and `m` is in `DF(n)`, then `m` is reachable both by a path through
`n` (carrying the new value) and by a path that missed `n` (carrying
some other one), so `m` must merge them. Anywhere `n` strictly
dominates, no merge is needed — every path already went through `n`.

**Iterated**, because a φ is itself a definition. Inserting
`x = φ(...)` in `m` creates a new definition in `m`, which may require
φs in `DF(m)`, and so on. The fixpoint `DF⁺(S)` over the set `S` of
blocks defining a variable is the exact placement for *minimal* SSA —
minimal meaning no φ is inserted that is not needed by this criterion.
(**Pruned** SSA goes further and also drops φs whose result is dead,
using liveness.)

Computing it is cheap given the dominator tree: for every join block
`m` and every predecessor `p` of `m`, walk `p` up the dominator tree
adding `m` to each node's frontier until you reach `idom(m)`. Total work
is proportional to the size of the output, which is usually small.

Two things worth remembering beyond the definition. The frontier is
also what **control dependence** is built from — control dependence is
the dominance frontier of the *reverse* CFG — so the same machinery
serves dead code elimination and if-conversion. And for very irregular
CFGs the frontier can blow up quadratically, which is why some modern
compilers place φs with a different algorithm (Sreedhar–Gao's DJ
graphs, or simply a lazy "did any path bring a different value?"
approach) rather than materialising frontiers at all.
