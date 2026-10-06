---
id: compiler-instruction-scheduling
kind: basic
version: 1
level: 5
tags: [compilers, codegen, scheduling, dags]
refs:
  - https://en.wikipedia.org/wiki/Instruction_scheduling
  - https://www.agner.org/optimize/
---

## What does a list scheduler optimise, what priority does it use, and why does scheduling fight with register allocation?

---

It reorders instructions within a region to keep the machine's
pipelines busy: hiding load latency, avoiding structural hazards
(only so many load ports, one divider), and filling delay slots on
architectures that have them. The input is the **dependence DAG** —
nodes are instructions, edges are true dependences (read-after-write),
plus anti- and output dependences on registers and memory.
True-dependence edges are labelled with the producer's latency; anti-
and output-dependence edges carry weight 0 or 1, since they only order
a write after an earlier read or write.

**List scheduling** is the standard algorithm: maintain a ready list of
instructions whose predecessors have completed by the current cycle,
pick one by a priority, place it, advance. The classic priority is the
**critical path length** — the longest latency-weighted path from the
instruction to any exit — so the instruction whose delay would most
constrain the finish is issued first. Ties break on operand
readiness, register pressure, or source order for determinism. Optimal
scheduling of a DAG is NP-complete, so the greedy version is what
everyone ships.

The fight with register allocation is fundamental and is the reason
back ends are structured the way they are. **Scheduling to hide
latency lengthens live ranges** — it moves loads earlier, so more
values are in flight, so register pressure rises and the allocator
spills. Spilling introduces new loads and stores with their own
latencies, which the scheduler then wants to hide. There is no clean
ordering:

- **Schedule then allocate**: best for latency, risks spills.
- **Allocate then schedule**: no spills beyond the necessary, but the
  allocator's reuse of registers introduces anti-dependences that
  constrain the scheduler.
- **Both, twice** (pre-pass schedule, allocate, post-pass schedule) is
  what most production compilers actually do, with the pre-pass
  scheduler made **register-pressure-aware** so it backs off when
  pressure approaches the register count.

On a modern out-of-order x86 core much of this is done in hardware, so
the compiler's scheduling matters less than it did — but it still
matters for in-order cores (many embedded targets, GPU pipelines), for
software pipelining of loops, and because the hardware's reorder window
is finite: a long dependency chain the compiler could have broken is
one the hardware cannot.
