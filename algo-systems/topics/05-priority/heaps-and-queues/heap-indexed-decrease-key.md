---
id: heap-indexed-decrease-key
kind: code
version: 1
level: 4
requires:
  - heap-decrease-key-handle
  - heap-array-layout
tags: [heaps, invariants, graphs]
input: chips
choices:
  c1:
    - "pos[h[i]] = i; pos[h[j]] = j;"
    - "pos[i] = h[i]; pos[j] = h[j];"
    - "pos[h[i]] = i;"
    - "pos[i] = i; pos[j] = j;"
compile:
  harness: |
    constexpr int pop(IndexedHeap& q) {
      const int top = q.h[0];
      q.swap_slots(0, --q.n);
      for (std::size_t i = 0, c; (c = 2 * i + 1) < q.n; i = c) {
        if (c + 1 < q.n && q.key[q.h[c + 1]] < q.key[q.h[c]]) ++c;
        if (q.key[q.h[i]] <= q.key[q.h[c]]) break;
        q.swap_slots(i, c);
      }
      return top;
    }
    constexpr IndexedHeap make() {        // vertices 0..4, keys 50, 40, …, 10
      IndexedHeap q;
      for (int v = 0; v < 5; ++v) {
        q.key[v] = 50 - 10 * v;
        q.h[q.n] = v; q.pos[v] = q.n;
        q.sift_up(q.n++);
      }
      return q;
    }
    constexpr std::array<int, 5> order() {
      IndexedHeap q = make();
      q.decrease_key(0, 15);              // 0 climbs part way…
      q.decrease_key(0, 1);               // …then from wherever pos says it is
      std::array<int, 5> out{};
      for (int& v : out) v = pop(q);
      return out;
    }
    static_assert(make().pos == std::array<std::size_t, 5>{3, 2, 4, 1, 0});
    static_assert(order() == std::array<int, 5>{0, 4, 3, 2, 1});
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/algorithm/push_heap
  - https://pkg.go.dev/container/heap#Fix
---

A min-heap of vertex ids with `decrease_key` in O(log n): `pos[v]` is the
slot where vertex `v` sits in `h`. Complete the swap so that stays true.

```cpp
#include <array>
#include <cstddef>
#include <utility>

struct IndexedHeap {
  std::array<int, 5> key{}, h{};
  std::array<std::size_t, 5> pos{};
  std::size_t n = 0;
  constexpr void swap_slots(std::size_t i, std::size_t j) {
    std::swap(h[i], h[j]);
    {{c1::pos[h[i]] = i; pos[h[j]] = j;}}
  }
  constexpr void sift_up(std::size_t i) {
    for (; i > 0 && key[h[(i - 1) / 2]] > key[h[i]]; i = (i - 1) / 2)
      swap_slots(i, (i - 1) / 2);
  }
  constexpr void decrease_key(int v, int k) { key[v] = k; sift_up(pos[v]); }
};
```

---

`pos` is the inverse of `h`: `h[pos[v]] == v` for every live `v`. Every
move goes through `swap_slots`, so that is the one place to restore it —
both entries, because both vertices moved, and indexed by **vertex**, not
slot. Writing only one leaves the other vertex's `pos` pointing at a slot
it no longer holds; `pos[i] = h[i]` stores the forward map again. Either
way a later `decrease_key` sifts the wrong slot, and the pop order breaks.

This is the "handle" `std::priority_queue` hides and Go's `heap.Fix`
expects you to keep in `Swap`. It costs a second array and two stores per
swap; in exchange `decrease_key`, arbitrary removal and update are all
O(log n) — what Dijkstra, Prim and an event scheduler with reschedules
need when lazy deletion's garbage is too much.
