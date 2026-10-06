---
id: compiler-explain-backend
kind: explain
version: 1
level: 5
tags: [compilers, codegen, interview]
refs:
  - https://llvm.org/docs/CodeGenerator.html
  - https://en.wikipedia.org/wiki/Compiler#Back_end
---
Walk an interviewer from optimised SSA IR down to machine code. Name
each stage, the data structure it works on, and the algorithm behind it.
---
- [ ] Starting point: SSA IR, with dominator tree and loop nesting already computed and the CFG in reverse postorder
- [ ] Legalisation: replace operations and types the target lacks (i128 arithmetic, unsupported vector widths) with sequences it has
- [ ] Instruction selection as tree/DAG tiling — maximal munch greedily, dynamic programming (BURS) optimally on trees, NP-complete on DAGs; tables generated from the machine description
- [ ] The result is machine instructions on **virtual** registers, so the IR-level optimisations remain valid up to this point
- [ ] SSA destruction: split critical edges, lower each φ group as a parallel copy, break cycles with a temporary
- [ ] Pre-pass instruction scheduling over the dependence DAG: list scheduling with critical-path priority, made register-pressure-aware
- [ ] Register allocation: interference graph from liveness, then Chaitin–Briggs colouring (simplify/coalesce/spill/select) or linear scan over live intervals in a JIT — or, in SSA-based allocators (libFirm, SSA linear scan), keep the φs through the allocator, where the chordal graph makes colouring optimal, and resolve them afterwards; LLVM and GCC do not, they eliminate φs first
- [ ] Spill code, live-range splitting, and coalescing to remove the copies the previous phases introduced
- [ ] Prologue/epilogue insertion and frame layout: callee-saved registers, stack alignment, and the ABI's calling convention
- [ ] Post-pass scheduling and peephole optimisation
- [ ] Block layout for the instruction cache and branch predictor: hot path fallthrough, cold blocks moved out of line, guided by profile data or static heuristics (loop depth, branch probability)
- [ ] Branch relaxation once layout fixes the addresses: widen any branch whose target is out of short-displacement range
- [ ] Emission: assembly or object code, relocations, unwind and debug info, and whatever the linker will need
- [ ] Throughout: the phase-ordering tension — scheduling lengthens live ranges and causes spills; allocation adds anti-dependences that constrain scheduling — which is why the pipeline schedules twice
