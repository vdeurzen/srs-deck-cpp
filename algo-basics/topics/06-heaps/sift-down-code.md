---
id: heap-sift-down-code
kind: code
version: 1
level: 2
tags: [heaps, arrays, invariants]
requires:
  - heap-index-trace
input: chips
choices:
  c1: ["h[c + 1] > h[c]", "h[c + 1] < h[c]", "h[c + 1] > h[i]", "c + 1 > c"]
compile:
  harness: |
    #include <vector>
    constexpr std::vector<int> drain(std::vector<int> h) {
      std::vector<int> out;
      while (!h.empty()) {
        out.push_back(h[0]);
        h[0] = h.back();
        h.pop_back();
        sift_down(h, 0);
      }
      return out;
    }
    static_assert(drain({10, 7, 9, 3, 5, 6, 8}) == std::vector<int>{10, 9, 8, 7, 6, 5, 3});
    static_assert(drain({9, 4, 8, 1, 3, 7, 2}) == std::vector<int>{9, 8, 7, 4, 3, 2, 1});
    int main() {}
refs:
  - https://doi.org/10.1145/355588.365103
  - https://en.cppreference.com/w/cpp/algorithm/pop_heap
---

A pop moves the max-heap's last element into the root and sifts it down.
Complete the test that decides which child it is compared and swapped
with.

```cpp
#include <cstddef>
#include <utility>

constexpr void sift_down(auto& h, std::size_t i) {
  const std::size_t n = h.size();
  for (std::size_t c; (c = 2 * i + 1) < n; i = c) {
    if (c + 1 < n && {{c1::h[c + 1] > h[c]}}) ++c;
    if (h[i] >= h[c]) return;
    std::swap(h[i], h[c]);
  }
}
```

---

Swap with the **larger** child. Whichever child moves up becomes the
parent of the other, so it must be the larger one; promoting the smaller
leaves it above a bigger sibling. Each step goes one level down, so a pop
costs O(log n).

Comparing the right child with the parent (`h[c + 1] > h[i]`) picks it
even when the left one is larger.
