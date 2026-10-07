---
id: sort-network-four
kind: code
version: 1
level: 4
tags: [sorting, branchless, invariants]
input: chips
choices:
  c1: ["cx(a, 1, 2);", "cx(a, 0, 3);", "cx(a, 2, 1);", "cx(a, 0, 1);"]
compile:
  harness: |
    constexpr bool sorts_every_01_input() {
      for (int m = 0; m < 16; ++m) {
        const auto s = sort4({m & 1, m >> 1 & 1, m >> 2 & 1, m >> 3 & 1});
        if (s[0] > s[1] || s[1] > s[2] || s[2] > s[3]) return false;
      }
      return true;
    }
    static_assert(sorts_every_01_input());
    static_assert(sort4({4, 3, 2, 1}) == std::array{1, 2, 3, 4});
    static_assert(sort4({2, 4, 1, 3}) == std::array{1, 2, 3, 4});
    int main() {}
requires:
  - sort-networks
refs:
  - https://dl.acm.org/doi/10.1145/1468075.1468121
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
---

A 4-input sorting network. Complete the final layer.

```cpp
#include <algorithm>
#include <array>
constexpr void cx(std::array<int, 4>& a, int i, int j) {  // a[i] <= a[j] after
  const int lo = std::min(a[i], a[j]), hi = std::max(a[i], a[j]);
  a[i] = lo; a[j] = hi;
}
constexpr std::array<int, 4> sort4(std::array<int, 4> a) {
  cx(a, 0, 1); cx(a, 2, 3);   // layer 1
  cx(a, 0, 2); cx(a, 1, 3);   // layer 2
  {{c1::cx(a, 1, 2);}}        // layer 3
  return a;
}
```

---

After layer 2 the minimum is at 0 and the maximum at 3, so only the
middle pair can still be out of order. `cx(a, 2, 1)` orders it
backwards; the other two touch pairs already in order. The harness uses
the **0-1 principle**: a network that sorts every 0/1 input sorts every
input, so 16 cases prove it for all of them.
