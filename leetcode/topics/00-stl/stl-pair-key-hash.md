---
id: stl-pair-key-hash
kind: code
version: 1
level: 3
tags: [stl, hash-map, lc-149]
input: chips
choices:
  c1:
    - "decltype(slope_hash)"
    - "slope_hash"
    - "std::hash<Slope>"
    - "std::less<Slope>"
compile:
  harness: |
    #include <type_traits>
    static_assert(std::is_invocable_r_v<std::size_t, const Counts::hasher&, const Slope&>);
    int main() { Counts c;  return ++c[{1, 2}]; }
requires:
  - algo-basics/hashing-equal-keys-equal-hashes
refs:
  - https://leetcode.com/problems/max-points-on-a-line/
  - https://en.cppreference.com/w/cpp/utility/hash
  - https://en.cppreference.com/w/cpp/container/unordered_map
elaborate: "Max Points on a Line keys on the reduced `(dy, dx)`. What must the reduction do so that `(2, 4)` and `(-1, -2)` land on the same key?"
---

Max Points on a Line (LC 149): the most `points` that lie on one
straight line. A solution counts, for each anchor point, how many
others share a slope, kept as a reduced `(dy, dx)` pair. Complete the map type.

```cpp
#include <cstdint>
#include <unordered_map>
#include <utility>
using Slope = std::pair<int, int>;
auto slope_hash = [](const Slope& s) -> std::size_t {
  return std::hash<std::int64_t>{}(std::int64_t{s.first} << 32 ^ std::uint32_t(s.second));
};
using Counts = std::unordered_map<Slope, int, {{c1::decltype(slope_hash)}}>;
```

---

**The lambda's type: the standard library has no usable
`std::hash<pair>`.** Naming `std::hash<Slope>`, or leaving the argument
out, is the classic LC compile error. The argument is a type, so the
object `slope_hash` does not compile. `std::less` is `std::map`'s
ordering. Packing both 32-bit halves into 64 bits never collides,
unlike `a ^ b`.
