---
id: complexity-cost-recursion-tree
kind: cloze
version: 1
level: 2
tags: [foundations, complexity, recurrences]
requires:
  - complexity-cost-trace-merge-recurrence
refs:
  - https://en.wikipedia.org/wiki/Recursion_tree
  - https://dl.acm.org/doi/10.1145/1008861.1008865
---

A recursion tree turns a recurrence into a sum over levels: calls at
the level × work per call. For `T(n) = 3T(n/2) + n`, the root is level
0; level k holds {{c1::3ᵏ::a power}} calls, each on an input of size
{{c2::n/2ᵏ::a fraction of n}}.

---

Each call has 3 children, so calls triple per level; each halves its
input, so sizes halve per level. Level k therefore does 3ᵏ · n/2ᵏ =
n·(3/2)ᵏ work: the levels get dearer going down by a constant factor,
and such a series is dominated by its last term, the leaves. With two
children instead of three every level would do exactly n, and the sum
would be levels × n.
