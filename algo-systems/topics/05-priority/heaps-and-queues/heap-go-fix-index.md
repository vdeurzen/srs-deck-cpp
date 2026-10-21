---
id: heap-go-fix-index
kind: code
version: 2
level: 3
requires:
  - heap-indexed-decrease-key
tags: [heaps, invariants, graphs]
input: chips
choices:
  c1:
    - "pos[v] = n"
    - "pos[n] = v"
    - "pos[v] = n + 1"
    - "pos[v] = 0"
compile:
  harness: |
    constexpr void sift_up(IndexedHeap& q, std::size_t i) {
      for (; i > 0 && q.key[q.h[(i - 1) / 2]] > q.key[q.h[i]]; i = (i - 1) / 2)
        q.swap_slots(i, (i - 1) / 2);
    }
    constexpr IndexedHeap build() {       // vertices 1, 2, 3, 4, 0 with keys 10..50
      IndexedHeap q;
      const int vs[5] = {1, 2, 3, 4, 0};
      for (int i = 0; i < 5; ++i) { q.append(vs[i], 10 * (i + 1)); sift_up(q, q.n - 1); }
      return q;
    }
    constexpr int top_after_decrease() {
      IndexedHeap q = build();
      q.key[0] = 1;                       // vertex 0, last appended, now smallest
      sift_up(q, q.pos[0]);
      return q.h[0];
    }
    static_assert(build().pos == std::array<std::size_t, 5>{4, 0, 1, 2, 3});
    static_assert(top_after_decrease() == 0);
    int main() {}
elaborate: Say which operations on an indexed heap must write `pos`, and what a `decrease_key` does if any one of them forgets.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/push_heap
  - https://en.wikipedia.org/wiki/Binary_heap#Insert
---

An indexed min-heap of vertex ids: `pos[v]` is vertex `v`'s slot in `h`.
`append` places a new vertex in the first free slot; the caller then
sifts it up. Complete `append` so `pos` holds from the start.

```cpp
#include <array>
#include <utility>
struct IndexedHeap {
  std::array<int, 5> key{}, h{};
  std::array<std::size_t, 5> pos{}; std::size_t n = 0;
  constexpr void swap_slots(std::size_t i, std::size_t j) {
    std::swap(h[i], h[j]); pos[h[i]] = i; pos[h[j]] = j;
  }
  constexpr void append(int v, int k) { key[v] = k; h[n] = v; {{c1::pos[v] = n}}; ++n; }
};
```

---

**The new vertex `v` sits at slot `n`, so `pos[v] = n`.** `swap_slots`
keeps `pos` right only for entries that move; a vertex that never moves
keeps whatever `append` wrote. `pos[n] = v` stores the forward map,
`n + 1` is one past its slot, and `0` points it at the root: each makes a
later `decrease_key` sift the wrong slot.
