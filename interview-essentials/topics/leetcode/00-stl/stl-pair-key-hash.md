---
id: stl-pair-key-hash
kind: code
version: 1
level: 3
tags: [stl, hash-map, lc-149]
input: chips
choices:
  c1:
    - "SlopeHash"
    - "std::hash<Slope>"
    - "std::less<Slope>"
    - "SlopeHash()"
compile:
  harness: |
    #include <type_traits>
    static_assert(std::is_invocable_r_v<std::size_t, const Counts::hasher&, const Slope&>);
    int main() { Counts c;  return ++c[{1, 2}]; }
requires:
  - hashing-equal-keys-equal-hashes
refs:
  - https://leetcode.com/problems/max-points-on-a-line/
  - https://en.cppreference.com/w/cpp/utility/hash
  - https://en.cppreference.com/w/cpp/container/unordered_map
elaborate: "LC 149 keys on the reduced `(dy, dx)`. What must the reduction do so that `(2, 4)` and `(-1, -2)` land on the same key?"
---

LC 149 counts, for each anchor point, how many others share a slope,
kept as a reduced `(dy, dx)` pair. Complete the map type.

```cpp
#include <cstdint>
#include <unordered_map>
#include <utility>
using Slope = std::pair<int, int>;
struct SlopeHash {
  std::size_t operator()(const Slope& s) const {
    return std::hash<std::int64_t>{}(std::int64_t{s.first} << 32 ^ std::uint32_t(s.second));
  }
};
using Counts = std::unordered_map<Slope, int, {{c1::SlopeHash}}>;
```

---

**The hasher type: the standard library has no usable
`std::hash<pair>`.** Leaving the argument out, or naming
`std::hash<Slope>`, is the classic LC compile error. The argument is a
type: `SlopeHash()` names a function type. `std::less` is what
`std::map` wants, a two-argument ordering. Packing both 32-bit halves
into one 64-bit value never collides, unlike `a ^ b`.
