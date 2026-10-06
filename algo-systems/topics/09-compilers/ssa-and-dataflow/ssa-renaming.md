---
id: compiler-ssa-renaming
kind: trace
version: 1
level: 4
tags: [compilers, ssa, dominance, tracing]
probes:
  1: { "b1": "1", "st.back()": "1" }
  2: { "b2": "1", "phi[0]": "1", "phi[1]": "2" }
  3: { "b3": "3", "st.size()": "3" }
requires:
  - compiler-dominance-frontier
refs:
  - https://dl.acm.org/doi/10.1145/115372.115320
  - https://doi.org/10.1007/978-3-642-37051-9_6
elaborate: What would B2 read if the walk forgot to pop when leaving B1?
---

```cpp
// Diamond B0 -> {B1, B2} -> B3, walked in dominator-tree order.
std::vector<int> st{0};                  // x0: x before any definition
int next = 1, phi[2];                    // B3: x = phi([B2], [B1]); B2 is pred 0
auto def = [&] { st.push_back(next++); };
def();                                   // B0: x = 1
int b1 = st.back(); def();               // B1: x = x + 1
phi[1] = st.back();                      // fill B3's slot for pred B1
st.pop_back();                           // @1 leave B1's dominator subtree
int b2 = st.back();                      // B2: print(x)
phi[0] = st.back();                      // @2 fill B3's slot for pred B2
def();                                   // B3: the phi defines x
int b3 = st.back();                      // @3 B3: print(x)
```

---

**SSA renaming** (Cytron et al.) walks the dominator tree with a stack of
versions: a use takes the top, a definition pushes, a block fills each
successor's φ slot **at its own predecessor index**, and leaving a block
pops what it pushed.

Probe 2 is the point. B1's `x2` was popped on leaving B1, so B2 reads
B0's `x1`. Without the pop it would read a value from a block it never
ran. Slots are filled by predecessor index, so `phi[0]` is B2's value
even though B1 was walked first.

Braun et al.'s on-the-fly construction (Cranelift's
`cranelift-frontend`) skips this walk and the frontier altogether.
Values from an instrumented run, GCC 16.2.
