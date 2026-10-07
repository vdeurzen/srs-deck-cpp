---
id: compiler-explain-isel
kind: explain
version: 1
level: 5
tags: [compilers, codegen, interview]
requires:
  - compiler-legalisation
  - compiler-isel-dag
  - compiler-precolouring
refs:
  - https://llvm.org/docs/CodeGenerator.html#instruction-selection-section
  - https://dl.acm.org/doi/10.1145/69558.75700
---
Explain how a back end turns optimised IR into machine instructions, up
to the point where registers are still virtual.
---
- [ ] Legalisation first: types and operations the target lacks (`i128` arithmetic, odd vector widths) are expanded, split or promoted, so every pattern the selector meets has a machine instruction
- [ ] Selection is tiling: a tile is one machine instruction covering one or more IR nodes, so folding `base + i*8` into a load's addressing mode saves both an instruction and a register
- [ ] Maximal munch takes the largest tile greedily and can strand an expensive remainder; bottom-up dynamic programming over a tree finds the cheapest cover
- [ ] On a DAG a shared node's best tile depends on all its users, which makes optimal tiling NP-complete, so LLVM's SelectionDAG matches greedily within each basic block
- [ ] Operands the ABI or ISA fixes (arguments, return value, `div`'s `EDX:EAX`) become copies to and from physical registers; everything else stays virtual for the allocator
