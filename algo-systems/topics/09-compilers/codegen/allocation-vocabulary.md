---
id: compiler-allocation-vocabulary
kind: cloze
version: 1
level: 5
tags: [compilers, codegen, registers]
requires:
  - compiler-liveness
refs:
  - https://dl.acm.org/doi/10.1145/177492.177575
  - https://llvm.org/docs/CodeGenerator.html
---

The interference graph joins two live ranges that are
{{c1::live at the same point::so they cannot share a register}}, and
allocating K machine registers is K-colouring it. A node of degree
{{c2::less than K::Kempe's argument — its neighbours cannot use up all
the colours}} can always be coloured whatever its neighbours get, so
the **simplify** phase removes such nodes onto a stack until none is
left.

When every remaining node has degree ≥ K, one must be chosen to
{{c3::spill::store to the stack and reload around each use}}, by a
cost heuristic weighted by loop depth and divided by degree. Briggs'
refinement is to push it optimistically anyway, because a high-degree
node's neighbours often share colours. **Coalescing** merges
{{c4::copy-related::the source and destination of a move}} nodes so
the copy disappears, and must be conservative or it raises degrees and
causes spills.

Two structural facts underpin allocator design. Pre-coloured nodes
represent registers the ABI or ISA fixes for a specific value —
argument and return registers, x86 `div`'s EDX:EAX. Calls are modelled
differently: a call clobbers every
{{c5::caller-saved::the registers a callee may overwrite without
restoring}} register, so anything live across one must sit in a
callee-saved register or be spilled. And the interference graph of a program **in SSA form** is
chordal, so it can be coloured optimally in polynomial time, which
moves the allocator's real difficulty from colouring to deciding what
to spill and how to resolve φs.
