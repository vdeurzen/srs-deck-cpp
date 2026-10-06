---
id: compiler-tiling-dp
kind: code
version: 1
level: 4
tags: [compilers, codegen, dynamic-programming, tiling]
requires:
  - compiler-tree-tiling
  - foundations-dp-tiling-cost
input: chips
choices:
  c1: ["cost(t, m.l) + cost(t, m.r)", "cost(t, n.l)", "cost(t, m.l)", "0"]
compile:
  harness: |
    constexpr Node t1[] = {{'+', 1, 4}, {'*', 2, 3}, {'r'}, {'r'}, {'r'}};   // a*b + c
    constexpr Node t2[] = {{'+', 1, 6}, {'*', 2, 3}, {'r'}, {'+', 4, 5},
                           {'r'}, {'r'}, {'r'}};                              // a*(x+y) + c
    constexpr Node t3[] = {{'+', 1, 2}, {'r'}, {'*', 3, 4}, {'r'}, {'r'}};   // c + a*b
    constexpr Node t4[] = {{'+', 1, 4}, {'*', 2, 3}, {'r'}, {'r'},
                           {'*', 5, 6}, {'r'}, {'r'}};                        // a*b + c*d
    static_assert(cost(t1, 0) == 3);   // FMA
    static_assert(cost(t2, 0) == 4);   // FMA over an ADD
    static_assert(cost(t3, 0) == 4);   // no pattern: ADD + MUL
    static_assert(cost(t4, 0) == 6);   // FMA + MUL
    int main() {}
refs:
  - https://dl.acm.org/doi/10.1145/69558.75700
  - https://llvm.org/docs/CodeGenerator.html#instruction-selection-section
---

Tiles: `ADD` costs 1, `MUL` costs 3, and `FMA` costs 3 and covers an
Add whose left operand is a Mul. Complete the cost of covering node `i`
with the FMA tile.

```cpp
#include <algorithm>
struct Node { char op; int l = -1, r = -1; };   // 'r' = value in a register
constexpr int cost(const Node* t, int i) {
  const Node& n = t[i];
  if (n.op == 'r') return 0;
  int best = (n.op == '+' ? 1 : 3) + cost(t, n.l) + cost(t, n.r);
  if (n.op != '+' || t[n.l].op != '*') return best;
  const Node& m = t[n.l];                          // FMA: m.l * m.r + n.r
  return std::min(best, 3 + {{c1::cost(t, m.l) + cost(t, m.r)}} + cost(t, n.r));
}
```

---

A tile's cost is its own price **plus the best cost of every subtree
hanging off its leaves**. FMA swallows the Mul, so its leaves are the
Mul's children, not the Mul: adding `cost(t, n.l)` would pay for the
multiply twice.

Each node takes the minimum over the tiles that match there, so the
recurrence is optimal on trees. Real selectors (BURS, `iburg`) label
each node once, bottom-up, with its best cost per grammar nonterminal
(register, address, immediate…) — the same recurrence without the recomputation — and tables generated from
the machine description keep it linear.
