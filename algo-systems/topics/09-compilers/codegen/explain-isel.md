---
id: compiler-explain-isel
kind: explain
version: 2
level: 5
tags: [compilers, codegen, interview]
requires:
  - compiler-legalisation
  - compiler-isel-dag
  - compiler-precolouring
refs:
  - https://llvm.org/docs/CodeGenerator.html#instruction-selection-section
  - https://dl.acm.org/doi/10.1145/69558.75700
elaborate: On a DAG a shared node's best tile depends on all its users. Say how LLVM's SelectionDAG copes with that.
---
An interviewer asks how a back end turns optimised IR into machine
instructions, up to the point where registers are still virtual. Answer
aloud.
---
- [ ] Legalisation first expands, splits or promotes what the target lacks, such as an `i128` multiply
- [ ] Selection covers the IR with tiles, one machine instruction each, meeting only at values in registers
- [ ] Folding `base + i*8` into a load's addressing mode is one tile, saving an instruction and a register
- [ ] Maximal munch greedily takes the largest tile and can strand an expensive remainder; DP on a tree finds the cheapest
- [ ] Operands the ABI or ISA fixes, such as arguments or `div`'s `EDX:EAX`, become pre-coloured; the rest stay virtual
