---
id: compiler-egraph-extraction
kind: basic
version: 1
level: 5
tags: [compilers, optimisation, rewriting, dynamic-programming]
requires:
  - compiler-egraphs
refs:
  - https://arxiv.org/abs/2004.03082
  - https://github.com/bytecodealliance/wasmtime/tree/main/cranelift/codegen/src/egraph
elaborate: Bottom-up extraction counts a shared subterm once per user. When does that make it pick the wrong program?
---

## Equality saturation ends with many equivalent e-nodes per class. How is the output program chosen?

---

**Extraction: pick the cheapest e-node per class under a cost function.**

For a cost that sums over children, a bottom-up dynamic program does it,
like optimal tree tiling. Costs that depend on sharing need ILP or
greedy search. Cranelift's mid-end uses an acyclic e-graph and extracts
this way.
