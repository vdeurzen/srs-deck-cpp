---
id: compiler-ssa-renaming
kind: trace
version: 2
level: 4
tags: [compilers, ssa, dominance, tracing]
probes:
  1: { "st.back()": "1" }
  2: { "phi[0]": "1", "phi[1]": "2" }
requires:
  - compiler-dominance-frontier
  - compiler-dominator-tree
  - cpp-essentials/vector-back-pop-back
refs:
  - https://dl.acm.org/doi/10.1145/115372.115320
  - https://doi.org/10.1007/978-3-642-37051-9_6
elaborate: What would B2 read if the walk forgot to pop when leaving B1?
---

Renaming `x` in the diamond B0 → {B1, B2} → B3, walking the dominator
tree B0, B1, B2. `st` is the stack of `x`'s versions: a definition
pushes, a use reads the top. B3 starts with `x3 = φ(x from B2, x from
B1)`, so B2 is predecessor 0.

```cpp
std::vector<int> st{0};   // x0: x before any definition
int phi[2];               // B3's phi operands, by predecessor
st.push_back(1);          // B0: x1 = ...
st.push_back(2);          // B1: x2 = x1 + 1
phi[1] = st.back();       // B1 fills its slot in B3's phi
st.pop_back();            // @1 leave B1: pop what it pushed
phi[0] = st.back();       // @2 B2 fills its slot
```

---

Leaving B1 pops `x2`, so the top is B0's `x1` again: B2 is not
dominated by B1, and B1's definition must not reach it. B2 then fills
slot 0 with `x1`. Slots go by predecessor index, so `phi[0]` is B2's
value although B1 was walked first.

Values from an instrumented run, GCC 16.2.
