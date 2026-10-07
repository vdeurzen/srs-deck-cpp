---
id: compiler-jump-table
kind: basic
version: 1
level: 2
tags: [compilers, codegen, branches]
refs:
  - https://llvm.org/docs/LangRef.html#switch-instruction
  - https://github.com/llvm/llvm-project/blob/main/llvm/lib/CodeGen/SwitchLoweringUtils.cpp
elaborate: An interpreter's dispatch loop is a `switch` over opcodes. What does every iteration pay for it?
---

## `switch (op)` has a case for every value 0 through 7. How does a jump table pick the case?

---

**One bounds check, then an indirect jump through `table[op]`.**

```
table:  [ case0, case1, … case7 ]     8 code addresses
        if (op > 7) goto default;
        goto *table[op];
```

The table holds one code address per value from the lowest case to the
highest, indexed by `op − lowest`. Cases 0, 5 and 900 would need 901
slots, 898 of them pointing at `default`.
