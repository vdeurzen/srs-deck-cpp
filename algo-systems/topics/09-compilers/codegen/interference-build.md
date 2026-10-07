---
id: compiler-interference-build
kind: code
version: 1
level: 5
tags: [compilers, codegen, registers, bitsets]
input: chips
choices:
  c1: ["live & ~(1u << d)", "live", "uses", "live | uses"]
compile:
  harness: |
    // v0 = ...; v1 = v0 + 1; v2 = v1 * 2; v3 = v1 + v2;  live out: v3
    constexpr std::array<Ins, 4> kChain{{{0, 0}, {1, 0b0001}, {2, 0b0010}, {3, 0b0110}}};
    static_assert(interference(kChain, 0b1000) == Graph{0, 0b0100, 0b0010, 0});
    // v0 = ...; v1 = v0 * 3; v2 = v1 + 1; v3 = v0 + v2;  v0 lives across both
    constexpr std::array<Ins, 4> kLong{{{0, 0}, {1, 0b0001}, {2, 0b0010}, {3, 0b0101}}};
    static_assert(interference(kLong, 0b1000) == Graph{0b0110, 0b0001, 0b0001, 0});
    int main() {}
requires:
  - compiler-liveness-interference
  - compiler-liveness-trace
refs:
  - https://dl.acm.org/doi/10.1145/800230.806984
  - https://suif.stanford.edu/~courses/cs243/
elaborate: Chaitin leaves out the edge between `d` and `s` for a copy `d = s`. What does that let the coalescer do?
---

Build one block's interference graph, walking backwards with the live
set. Complete the values that the definition of `d` interferes with.

```cpp
#include <array>
struct Ins { int def; unsigned uses; };         // bit v of uses: reads v
using Graph = std::array<unsigned, 4>;          // bit v of g[u]: u, v interfere

constexpr Graph interference(const std::array<Ins, 4>& block, unsigned live) {
  Graph g{};
  for (int i = 3; i >= 0; --i) {                // live: after block[i]
    const int d = block[i].def;
    const unsigned others = {{c1::live & ~(1u << d)}};
    g[d] |= others;
    for (int v = 0; v < 4; ++v) if (others >> v & 1) g[v] |= 1u << d;
    live = (live & ~(1u << d)) | block[i].uses;
  }
  return g;
}
```

---

**A definition interferes with everything live just after it, except
itself.** Keeping `d`'s own bit puts a self-loop in the graph, which no
colouring can satisfy. Using the operands instead is the tempting
mistake: in `v1 = v0 + 1` the operand `v0` dies, so `v0` and `v1` may
share a register, while in the second harness case `v0`, read again at
the end, interferes with both `v1` and `v2`.
