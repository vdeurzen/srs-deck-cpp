---
id: hash-consistent-hashing
kind: code
version: 1
level: 4
tags: [hashing, distributed, databases]
requires:
  - hash-consistent-hashing-payoff
input: chips
choices:
  c1:
    - "it == ring.end() ? ring.front().node : it->node"
    - "it == ring.end() ? ring.back().node : it->node"
    - "it->node"
    - "it == ring.begin() ? ring.back().node : (it - 1)->node"
compile:
  harness: |
    constexpr std::array<Token, 6> kAll{{{10, 0}, {25, 1}, {40, 2}, {60, 0}, {75, 1}, {90, 2}}};
    constexpr std::array<Token, 4> kNo1{{{10, 0}, {40, 2}, {60, 0}, {90, 2}}};   // node 1 left
    static_assert(owner_of(5, kAll) == 0 && owner_of(26, kAll) == 2);
    static_assert(owner_of(95, kAll) == 0);                  // past the last token
    constexpr bool others_stay() {
      for (std::uint32_t p = 0; p < 100; ++p)
        if (owner_of(p, kAll) != 1 && owner_of(p, kNo1) != owner_of(p, kAll)) return false;
      return true;
    }
    static_assert(others_stay());   // only node 1's keys move
    int main() {}
refs:
  - https://dl.acm.org/doi/10.1145/258533.258660
  - https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf
---

Keys and nodes' tokens sit on a ring of positions 0–99; a key belongs to
the node of the first token at or after its position. Complete the
owner lookup.

```cpp
#include <algorithm>
#include <array>
#include <cstdint>

struct Token { std::uint32_t pos; int node; };   // sorted by pos

constexpr int owner_of(std::uint32_t pos, const auto& ring) {
  auto it = std::lower_bound(ring.begin(), ring.end(), pos,
      [](Token t, std::uint32_t p) { return t.pos < p; });
  return {{c1::it == ring.end() ? ring.front().node : it->node}};
}
```

---

**Past the last token, the ring wraps to the first.** Position 95 belongs
to the token at 10. Clamping to the last token hands those keys to the
wrong node, and a bare `it->node` dereferences `end()`, which is not a
constant expression. The last assertion pins the payoff: when node 1
leaves, no other node's keys move.
