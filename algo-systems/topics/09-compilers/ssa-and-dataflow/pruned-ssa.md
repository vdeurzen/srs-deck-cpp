---
id: compiler-pruned-ssa
kind: basic
version: 1
level: 5
tags: [compilers, ssa, dataflow]
requires:
  - compiler-iterated-frontier
  - compiler-liveness
refs:
  - https://dl.acm.org/doi/10.1145/115372.115320
  - https://doi.org/10.1002/(SICI)1097-024X(19980710)28:8%3C859::AID-SPE188%3E3.0.CO;2-8
elaborate: Semi-pruned SSA skips φs only for names never live across a block boundary. Why is that cheaper to compute than pruned SSA?
---

## Minimal SSA can still insert a φ that nothing reads. Which φs does *pruned* SSA leave out?

---

**Those for a variable that is not live on entry to the φ's block.**

Minimal placement asks only "do two definitions merge here?". A
temporary reassigned in both arms but dead after the join still gets a
φ, which then needs its own dead-code pass. Pruned SSA runs liveness
first to avoid it.
