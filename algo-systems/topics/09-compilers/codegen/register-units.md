---
id: compiler-register-units
kind: basic
version: 1
level: 4
tags: [compilers, codegen, registers, x86]
requires:
  - compiler-allocation-vocabulary
refs:
  - https://llvm.org/doxygen/classllvm_1_1MCRegisterInfo.html
  - https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html
elaborate: Writing `EAX` zeroes the upper half of `RAX`, but writing `AX` does not. Which of the two creates a hidden dependency on RAX's old value?
---

## x86-64 has `AL`, `AH`, `AX`, `EAX` and `RAX`. How does LLVM's allocator decide that two of them cannot hold different live values at once?

---

**They interfere when they share a register unit.**

Each physical register is modelled as a set of units, roughly its
smallest independently writable pieces. `AL` and `RAX` share one, so
they overlap; `AL` and `AH` share none, so both can be live together.
Interference is checked per unit, not per register name.
