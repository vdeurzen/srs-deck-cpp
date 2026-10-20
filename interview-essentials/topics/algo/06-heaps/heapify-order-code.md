---
id: heap-heapify-order-code
kind: code
version: 1
level: 2
tags: [heaps, arrays, invariants]
requires:
  - heap-sift-down-code
input: chips
choices:
  c1:
    - "int i = n / 2 - 1; i >= 0; --i"
    - "int i = n / 2 - 1; i > 0; --i"
    - "int i = 0; i < n / 2; ++i"
    - "int i = 0; i < n; ++i"
compile:
  harness: |
    constexpr void sift_down(std::vector<int>& h, int i) {
      const int n = h.size();
      while (2 * i + 1 < n) {
        int c = 2 * i + 1;
        if (c + 1 < n && h[c + 1] > h[c]) ++c;
        if (h[i] >= h[c]) return;
        std::swap(h[i], h[c]);
        i = c;
      }
    }
    constexpr std::vector<int> built(std::vector<int> a) { heapify(a); return a; }
    static_assert(built({1, 2, 3, 4, 5, 6, 7}) == std::vector<int>{7, 5, 6, 4, 2, 1, 3});
    static_assert(built({3, 1, 6, 5, 2, 4, 7}) == std::vector<int>{7, 5, 6, 1, 2, 4, 3});
    int main() {}
refs:
  - https://doi.org/10.1145/355588.365103
  - https://en.cppreference.com/w/cpp/algorithm/make_heap
elaborate: What would go wrong if you reused this loop on a heap stored with its root at slot 1, and what would you change?
---

Floyd's heapify turns an arbitrary array into a max-heap by sifting
nodes down. `sift_down(h, i)` swaps `h[i]` down until it is no smaller
than its children, and it is correct only when both subtrees of `i` are
already heaps. Complete the loop.

```cpp
#include <utility>
#include <vector>

constexpr void sift_down(std::vector<int>& h, int i);

constexpr void heapify(std::vector<int>& h) {
  const int n = h.size();
  for ({{c1::int i = n / 2 - 1; i >= 0; --i}}) sift_down(h, i);
}
```

---

Go **bottom-up**, from the last internal node back to the root. Sift-down
assumes both subtrees below i are already heaps, and going backwards makes
that true; slots from n/2 on are leaves, already heaps of one, so they are
skipped.

Top-down (`i = 0` upward) sifts the root while its subtrees are still
unsorted: from 1 2 3 4 5 6 7 it leaves 3 at the root above 7.
`i > 0` stops before the root and leaves 1 on top.
