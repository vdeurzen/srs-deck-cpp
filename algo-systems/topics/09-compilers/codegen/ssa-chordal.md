---
id: compiler-ssa-chordal
kind: basic
version: 1
level: 5
tags: [compilers, codegen, registers, ssa]
requires:
  - compiler-allocation-vocabulary
  - compiler-ssa-dominance-property
refs:
  - https://doi.org/10.1007/11688839_20
  - https://pp.ipd.kit.edu/firm/
elaborate: LLVM and GCC leave SSA before allocating. What do they lose, and what do they gain in return?
---

## Why is colouring easy for the interference graph of a program still in SSA form?

---

**SSA interference graphs are chordal, so they colour optimally in polynomial time.**

The colours needed equal the most values live at once. Allocators that
keep SSA (libFirm, Hack and Goos' line) move the hard part to choosing
spills and to resolving φs afterwards. LLVM and GCC destroy SSA first.
