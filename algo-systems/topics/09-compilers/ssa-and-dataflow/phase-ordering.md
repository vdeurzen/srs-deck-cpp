---
id: compiler-phase-ordering
kind: basic
version: 1
level: 4
tags: [compilers, optimisation, rewriting]
refs:
  - https://arxiv.org/abs/2004.03082
  - https://llvm.org/docs/NewPassManager.html
elaborate: A database's rule-based query rewriter applies one rewrite and loses the form another rule needed. Where else have you met this problem?
---

## A rewriter over integers that cannot overflow turns `a * 2` into `a << 1`. Now `(a * 2) / 2 → a` no longer matches. What is this problem called?

---

**The phase-ordering problem.**

Each rewrite is destructive: it discards the form other rules match on,
so the result depends on the order the rules ran. Finding a good order
is a search nobody solves exactly, which is why `-O2` is a hand-tuned
pass sequence.
