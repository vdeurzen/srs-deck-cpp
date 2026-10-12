---
id: book-cancel-o1
kind: code
version: 1
level: 4
tags: [hft, order-book, intrusive, handles, implement-it]
input: chips
choices:
  c1:
    - "n[p[s]] = n[s]; p[n[s]] = p[s];"
    - "n[p[s]] = n[s];"
    - "n[p[s]] = p[s]; p[n[s]] = n[s];"
    - "p[n[s]] = p[s];"
compile:
  harness: |
    constexpr Level queued() {                   // FIFO 5 -> 2 -> 7, sentinel 0
      Level l;  int ring[] = {0, 5, 2, 7, 0};
      for (int i = 0; i < 4; ++i) { l.n[ring[i]] = ring[i + 1]; l.p[ring[i + 1]] = ring[i]; }
      return l;
    }
    constexpr int walk(const std::array<int, 8>& link) {   // slots as digits, bounded
      int r = 0;
      for (int s = link[0], k = 0; s != 0 && k < 8; s = link[s], ++k) r = r * 10 + s;
      return r;
    }
    constexpr bool test() {
      Level l = queued();
      bool ok = l.cancel(2, 0) && walk(l.n) == 57 && walk(l.p) == 75;
      ok = ok && !l.cancel(2, 0) && walk(l.n) == 57;          // stale handle refused
      ok = ok && l.cancel(5, 0) && walk(l.n) == 7 && walk(l.p) == 7;   // the front order
      return ok;
    }
    static_assert(test());
    int main() {}
requires:
  - algo-systems/seq-intrusive-unlink
  - algo-systems/seq-handle-generation
refs:
  - https://www.kernel.org/doc/html/latest/core-api/kernel-api.html#list-management-functions
  - https://floooh.github.io/2018/06/17/handles-vs-pointers.html
elaborate: Without the sentinel, which two cases need a branch, and which one would the front order of the queue hit?
---

The interviewer: "make cancel O(1)." The id map already turned the
order id into a handle `{slot, generation}`. Orders live in pool slots;
a price level threads them as a circular FIFO through `n` and `p`.
Slot 0 is the level's sentinel: a dummy node that is never an order,
so the ring is never empty (`n[0]` is the front, `p[0]` the back).
Complete `cancel`.

```cpp
#include <array>
struct Level {                                // slot 0: n[0] = first order, p[0] = last
  std::array<int, 8> n{}, p{}, gen{};         // links and generation per pool slot
  constexpr bool cancel(int s, int g) {       // handle {slot s, generation g}; pre: s != 0
    if (gen[s] != g) return false;            // stale: that order is already gone
    {{c1::n[p[s]] = n[s]; p[n[s]] = p[s];}}
    ++gen[s];                                 // old handles to slot s now fail
    return true;
  }
};
```

---

**Point each neighbour past the order: two stores, no search, no
branch.** The sentinel makes the first and last order ordinary
neighbours. Patching one direction leaves the other walk through the
dead slot; swapping the sources scrambles the ring. A
`std::map<Price, std::list<Order>>` allocates per order, and cancel
needs a stored iterator or an O(n) walk.
