---
id: trace-heap-operations
kind: trace
version: 2
level: 3
tags: [tracing, heaps, arrays]
probes:
  1: { "h[0]": "9", "h.size()": "4" }
  2: { "h[0]": "11", "h.size()": "5" }
  3: { "h[0]": "9", "h.back()": "11", "h.size()": "5" }
  4: { "h[0]": "9", "h.size()": "4" }
requires:
  - heap-array-layout
refs:
  - https://en.cppreference.com/w/cpp/algorithm/make_heap
  - https://en.cppreference.com/w/cpp/algorithm/pop_heap
---

```cpp
#include <algorithm>
#include <vector>

int main() {
  std::vector<int> h{5, 1, 9, 3};
  std::make_heap(h.begin(), h.end());   // @1
  h.push_back(11);
  std::push_heap(h.begin(), h.end());   // @2
  std::pop_heap(h.begin(), h.end());    // @3
  h.pop_back();                         // @4
}
```

---

The heap lives in the vector; the algorithms only keep the invariant
"every parent ≥ its children", so only the root is pinned down.
`make_heap` puts 9 there — the rest is *a* heap, not a sorted order.
`push_heap` assumes the new element is at the back and sifts it up:
11 rises to the root.

`pop_heap` is the step people mispredict. It removes **nothing**: the
size is still 5 at probe 3. It swaps the root to the back and sifts the
new root down, so the maximum sits at `h.back()` and the first
`size() − 1` elements are again a heap. `pop_back()` is the separate
removal at probe 4. Run `pop_heap` on a shrinking range and the maxima
pile up at the back: that is `std::sort_heap`.

Only these cells are mandated; the order of the other elements is
libstdc++'s choice, so they are not probed. Verified by compiling and
running this program under GCC 16.2 and printing the vector at each
probe.
