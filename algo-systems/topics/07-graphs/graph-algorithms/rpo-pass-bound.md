---
id: graph-rpo-pass-bound
kind: basic
version: 1
level: 5
tags: [graphs, compilers, dataflow]
requires:
  - graph-reverse-postorder
refs:
  - https://doi.org/10.1145/321921.321938
---

## In RPO, a rapid forward dataflow analysis (e.g. reaching definitions) converges in at most d + 2 passes. What is d?

---

**The loop-connectedness: the most back edges on any cycle-free path in the CFG.**

Each back edge on a path costs one more pass, plus one to confirm
nothing changed (Kam and Ullman, 1976). *Rapid* means
`f(⊤) ⊓ x ⊑ f(x)` for every transfer function: gen/kill bit-vector
analyses qualify, constant propagation does not. Shallow loop nests
keep d small.
