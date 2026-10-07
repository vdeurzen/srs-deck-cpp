---
id: compiler-instruction-selection
kind: basic
version: 2
level: 5
tags: [compilers, codegen, dynamic-programming]
requires:
  - compiler-tiling-dp
refs:
  - https://dl.acm.org/doi/10.1145/69558.75700
  - https://llvm.org/docs/CodeGenerator.html#instruction-selection-section
elaborate: Most of instruction selection's payoff comes from addressing modes and fused operations. Where in the back end does that engineering actually live?
---

## Maximal munch takes the largest matching tile at each node, top-down. Why can its total cost exceed the dynamic-programming tiling's?

---

**The locally largest tile can leave a remainder that only expensive tiles cover.**

Munch never revisits a choice, so two medium tiles that would have been
cheaper are never compared. Dynamic programming computes, bottom-up, the
cheapest cover of every subtree, so it is optimal on trees and still
linear.
