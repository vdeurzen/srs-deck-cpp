---
id: trace-heap-operations
kind: trace
version: 1
level: 3
tags: [tracing, heaps, arrays]
probes:
  1: { "h[0]": "9", "h[1]": "3", "h.size()": "4" }
  2: { "h[0]": "11", "h[1]": "9", "h.size()": "5" }
  3: { "h[0]": "9", "h[1]": "3", "h.size()": "5" }
  4: { "h[0]": "9", "h[1]": "3", "h.size()": "4" }
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

The heap lives in the vector; the algorithms only maintain the
invariant "every parent ≥ its children".

`make_heap` sifts down from the last internal node, giving
`{9, 3, 5, 1}` — note it is **not sorted**, and need not be: a heap is
a much weaker ordering than a sort. `push_heap` assumes the new
element is already at the back and sifts it *up*: 11 beats its parent
3, then beats 9, and lands at the root.

`pop_heap` is the step people mispredict. It does **not** remove
anything — the container's size is unchanged at probe 3. It swaps the
root with the last element and sifts the new root down, so the maximum
now sits at `h.back()` and the first `size() − 1` elements are again a
valid heap. Removing it is the separate `pop_back()` at probe 4, which
is why the idiom is always those two calls in that order.

That split is what makes heapsort fall out for free: call `pop_heap`
n times without ever popping the back, and the array ends up sorted
ascending in place.

Verified by compiling and running this program under GCC 13.3
(`g++ -std=c++23 -Wall -Wextra`) and printing the vector at each
probe.
