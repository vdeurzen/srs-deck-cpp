---
id: compiler-precolouring
kind: basic
version: 1
level: 5
tags: [compilers, codegen, registers, x86]
requires:
  - compiler-allocation-vocabulary
refs:
  - https://dl.acm.org/doi/10.1145/800230.806984
  - https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html
elaborate: The allocator copies the dividend into a fresh range just before `div`. Why keep pre-coloured ranges that short?
---

## x86's `div` needs its dividend in `EDX:EAX`, and the ABI passes the first argument in `RDI`. How does a colouring allocator represent both?

---

**As pre-coloured nodes: live ranges whose register is fixed before colouring.**

They take part in interference like any node but cannot be recoloured.
The ABI fixes arguments and return values; the ISA fixes operands like
`div`'s. A copy to or from a virtual register keeps each fixed range
short.
