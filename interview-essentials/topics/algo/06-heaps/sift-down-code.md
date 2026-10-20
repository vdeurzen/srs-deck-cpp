---
id: heap-sift-down-code
kind: code
version: 1
level: 2
tags: [heaps, arrays, invariants]
input: chips
choices:
  c1: ["h[c + 1] > h[c]", "h[c + 1] < h[c]", "h[c + 1] > h[i]", "c + 1 > c"]
compile:
  harness: |
    constexpr std::vector<int> drain(std::vector<int> h) {
      std::vector<int> out;
      while (!h.empty()) {
        out.push_back(h[0]);
        h[0] = h.back();
        h.pop_back();
        sift_down(h, 0, h.size());
      }
      return out;
    }
    static_assert(drain({10, 7, 9, 3, 5, 6, 8}) == std::vector<int>{10, 9, 8, 7, 6, 5, 3});
    static_assert(drain({9, 4, 8, 1, 3, 7, 2}) == std::vector<int>{9, 8, 7, 4, 3, 2, 1});
    int main() {}
refs:
  - https://doi.org/10.1145/355588.365103
  - https://en.cppreference.com/w/cpp/algorithm/pop_heap
requires:
  - heap-sift-down-worked
  - heap-push-trace
  - cpp-essentials/ptr-reference-must-bind
  - cpp-essentials/expr-increment-value
elaborate: Say in one sentence, as to an interviewer, which invariant sift-down restores and why one walk from the root is enough to restore it.
---

A pop moves the max-heap's last element into the root and sifts it down
within the heap's first `n` slots: swaps it with a child until it is no
smaller than its children. Complete the test that picks the child.

```cpp
#include <utility>
#include <vector>
constexpr void sift_down(std::vector<int>& h, int i, int n) {
  for (int c = 2 * i + 1; c < n; c = 2 * i + 1) {
    if (c + 1 < n && {{c1::h[c + 1] > h[c]}}) ++c;
    if (h[i] >= h[c]) return;
    std::swap(h[i], h[c]);
    i = c;
  }
}
```

---

Swap with the **larger** child. Whichever child moves up becomes the
parent of the other, so it must be the larger one; promoting the smaller
leaves it above a bigger sibling. Each step goes one level down, so a pop
makes at most one swap per level.

Comparing the right child with the parent (`h[c + 1] > h[i]`) picks it
even when the left one is larger.
