---
id: compiler-egraphs
kind: basic
version: 1
level: 5
tags: [compilers, optimisation, rewriting, union-find]
refs:
  - https://arxiv.org/abs/2004.03082
  - https://egraphs-good.github.io/
---

## What is the phase-ordering problem in a rewriting optimiser, and how do e-graphs dissolve it?

---

A rewrite optimiser applies `a * 2 → a << 1`, then cannot apply
`(a * 2) / 2 → a` because the multiply is gone. Every rewrite is
**destructive**: choosing one form discards the others, so the result
depends on the order the rules ran in, and finding a good order is a
search problem nobody solves properly. Hence the folklore of compiler
pass pipelines, and the fact that `-O2` is a hand-tuned sequence.

An **e-graph** keeps all the forms. It is a set of **e-classes**, each
an equivalence class of **e-nodes** (an operator plus a list of *child
e-classes*, not child nodes). Because children are classes, one e-graph
compactly represents exponentially many equivalent expressions.
Maintaining it needs exactly two things:

- **Union-find** over e-class ids, to merge classes when a rewrite says
  two expressions are equal.
- **Congruence closure**: if `x` and `y` become equal, then `f(x)` and
  `f(y)` must also become equal — maintained with a hashcons from
  "operator + canonical children" to e-class, rebuilt after merges.

**Equality saturation** then runs all rules repeatedly, adding
equalities without ever deleting anything, until the graph stops
growing (or a budget expires). Only at the end does **extraction**
pick the best representative per class by a cost function — a bottom-up
dynamic program for simple costs, an ILP or greedy search for
context-sensitive ones.

So the order of rule application no longer matters, which is the whole
point: rules can be written independently, including ones that look
like pessimisations in isolation.

What it costs: memory and time (saturation on a large function is not
free — the `egg` line of work is largely about making the rebuild
incremental), and the fact that many useful transformations are not
equalities at all (control flow, memory effects, anything with side
conditions). Current practice uses e-graphs where the domain is
algebraic and bounded — Cranelift's mid-end, floating-point expression
rewriting (Herbie), tensor graph optimisation (TASO), and rule-based
query rewriting in a database optimiser, which faces the identical
phase-ordering problem.
